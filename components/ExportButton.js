import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { getFramework, getCategoryLabel } from '../lib/frameworks';

/**
 * ExportButton Component
 *
 * Exports strategic analysis results in multiple formats (PDF, CSV, JSON)
 * CSV and JSON exports are premium-only features
 *
 * Props:
 *   - analysisData: object - The analysis data to export
 *   - framework: string - The framework type (swot, pestle, etc.)
 *   - idea: string - The business idea being analyzed
 *   - focusArea: string - The focus area for the analysis
 *   - disabled: boolean - Whether button is disabled
 */
export default function ExportButton({ analysisData, framework = 'swot', idea, focusArea, disabled = false }) {
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState('');
  const [isPremium, setIsPremium] = useState(false);

  // Load premium status from localStorage on mount
  useEffect(() => {
    const savedPremium = localStorage.getItem('isPremium');
    setIsPremium(savedPremium === 'true');
  }, []);

  const exportToCSV = () => {
    if (!analysisData) {
      setError('No analysis data to export');
      return;
    }

    if (!isPremium) {
      setError('CSV export is a premium feature. Upgrade to unlock it.');
      return;
    }

    try {
      const frameworkConfig = getFramework(framework);
      const timestamp = new Date().toISOString().slice(0, 10);
      const frameworkName = framework.replace('-', '_').toUpperCase();

      // Build CSV content
      let csvContent = 'data:text/csv;charset=utf-8,';
      csvContent += `Business Idea,${idea}\n`;
      csvContent += `Focus Area,${focusArea}\n`;
      csvContent += `Framework,${frameworkConfig.name}\n`;
      csvContent += `Generated,${new Date().toLocaleString()}\n\n`;

      // Add categories and items
      frameworkConfig.categories.forEach((category) => {
        const categoryLabel = getCategoryLabel(frameworkConfig, category);
        const items = analysisData[category] || [];
        csvContent += `${categoryLabel}\n`;
        items.forEach((item) => {
          csvContent += `,"${item.replace(/"/g, '""')}"\n`;
        });
        csvContent += '\n';
      });

      // Add score
      const scoreField = frameworkConfig.scoreField;
      const scoreValue = analysisData[scoreField] || 0;
      csvContent += `${frameworkConfig.scoreLabel},${scoreValue}/100\n`;

      // Download CSV
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `${frameworkName}-Analysis-${timestamp}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setError('');
    } catch (err) {
      console.error('CSV export error:', err);
      setError('Failed to export CSV. Please try again.');
    }
  };

  const exportToJSON = () => {
    if (!analysisData) {
      setError('No analysis data to export');
      return;
    }

    if (!isPremium) {
      setError('JSON export is a premium feature. Upgrade to unlock it.');
      return;
    }

    try {
      const frameworkConfig = getFramework(framework);
      const timestamp = new Date().toISOString().slice(0, 10);
      const frameworkName = framework.replace('-', '_').toUpperCase();

      // Build JSON content
      const jsonData = {
        metadata: {
          businessIdea: idea,
          focusArea: focusArea,
          framework: frameworkConfig.name,
          frameworkId: framework,
          generated: new Date().toISOString(),
          platform: 'SwotGen',
        },
        analysis: analysisData,
      };

      // Download JSON
      const jsonString = JSON.stringify(jsonData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${frameworkName}-Analysis-${timestamp}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setError('');
    } catch (err) {
      console.error('JSON export error:', err);
      setError('Failed to export JSON. Please try again.');
    }
  };

  const exportToPDF = async () => {
    if (!analysisData) {
      setError('No analysis data to export');
      return;
    }

    setIsExporting(true);
    setError('');

    const frameworkConfig = getFramework(framework);

    try {
      // Create a temporary container for the PDF content
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.width = '800px';
      container.style.padding = '40px';
      container.style.backgroundColor = 'white';
      container.style.fontFamily = 'Arial, sans-serif';

      // Generate categories HTML
      const categoriesHtml = frameworkConfig.categories
        .map((category) => {
          const categoryLabel = getCategoryLabel(frameworkConfig, category);
          const items = analysisData[category] || [];
          const icon = frameworkConfig.icons[category] || '';
          return `
            <div style="padding: 15px; border: 2px solid #d1d5db; border-radius: 8px; margin-bottom: 10px;">
              <h3 style="color: #1f2937; margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">${icon} ${escapeHtml(categoryLabel)}</h3>
              <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 13px;">
                ${items.map(item => `<li style="margin-bottom: 5px;">${escapeHtml(item)}</li>`).join('')}
              </ul>
            </div>
          `;
        })
        .join('');

      // Get score field name and value
      const scoreField = frameworkConfig.scoreField;
      const scoreValue = analysisData[scoreField] || 0;

      // Build the HTML content for the PDF
      container.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #1f2937; margin: 0 0 10px 0; font-size: 28px;">${frameworkConfig.icons[frameworkConfig.categories[0]] || ''} ${escapeHtml(frameworkConfig.name)}</h1>
          <p style="color: #6b7280; margin: 0; font-size: 14px;">SwotGen - Strategic Analysis Platform</p>
        </div>

        <div style="margin-bottom: 25px; padding: 15px; background-color: #f3f4f6; border-radius: 8px;">
          <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 12px; font-weight: bold;">BUSINESS IDEA</p>
          <p style="color: #1f2937; margin: 0 0 10px 0; font-size: 16px; font-weight: bold;">${escapeHtml(idea)}</p>
          <p style="color: #6b7280; margin: 0 0 5px 0; font-size: 12px; font-weight: bold;">FOCUS AREA</p>
          <p style="color: #1f2937; margin: 0; font-size: 14px;">${escapeHtml(focusArea)}</p>
        </div>

        <div style="margin-bottom: 20px;">
          ${categoriesHtml}
        </div>

        <!-- Score -->
        <div style="padding: 15px; background-color: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 8px; text-align: center;">
          <p style="color: #0369a1; margin: 0 0 5px 0; font-size: 12px; font-weight: bold;">${escapeHtml(frameworkConfig.scoreLabel)}</p>
          <p style="color: #0369a1; margin: 0; font-size: 32px; font-weight: bold;">${scoreValue}/100</p>
        </div>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
          <p style="color: #9ca3af; margin: 0; font-size: 11px;">
            Generated by SwotGen • ${new Date().toLocaleDateString()}
          </p>
        </div>
      `;

      document.body.appendChild(container);

      // Convert HTML to canvas
      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      // Remove temporary container
      document.body.removeChild(container);

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 10);
      const frameworkName = framework.replace('-', '_').toUpperCase();
      const filename = `${frameworkName}-Analysis-${timestamp}.pdf`;

      // Download PDF
      pdf.save(filename);

      setIsExporting(false);
    } catch (err) {
      console.error('Export error:', err);
      setError('Failed to export PDF. Please try again.');
      setIsExporting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {/* PDF Export - Available to all users */}
        <button
          onClick={exportToPDF}
          disabled={disabled || isExporting || !analysisData}
          className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
            disabled || isExporting || !analysisData
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
          }`}
          title="Export analysis as PDF"
        >
          {isExporting ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Exporting...
            </>
          ) : (
            <>
              📥 PDF
            </>
          )}
        </button>

        {/* CSV Export - Premium only */}
        <button
          onClick={exportToCSV}
          disabled={disabled || !analysisData || !isPremium}
          className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
            disabled || !analysisData || !isPremium
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-cyan-600 hover:bg-cyan-700 text-white cursor-pointer'
          }`}
          title={isPremium ? 'Export analysis as CSV' : 'Premium feature - Upgrade to unlock'}
        >
          📊 CSV {!isPremium && '🔒'}
        </button>

        {/* JSON Export - Premium only */}
        <button
          onClick={exportToJSON}
          disabled={disabled || !analysisData || !isPremium}
          className={`px-4 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
            disabled || !analysisData || !isPremium
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-700 text-white cursor-pointer'
          }`}
          title={isPremium ? 'Export analysis as JSON' : 'Premium feature - Upgrade to unlock'}
        >
          {} JSON {!isPremium && '🔒'}
        </button>
      </div>
      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}

/**
 * Escape HTML special characters to prevent XSS
 */
function escapeHtml(text) {
  if (!text) return '';
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

