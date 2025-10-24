import { getFramework, getCategoryLabel } from '../lib/frameworks';

export default function FrameworkDisplay({ framework, data, isPremium }) {
  if (!data || !framework) {
    return <div className="text-center text-gray-500">No data available</div>;
  }

  const frameworkConfig = getFramework(framework);
  const scoreValue = data[frameworkConfig.scoreField] || 0;
  const scorePercentage = Math.min(100, Math.max(0, scoreValue));

  // Determine score quality
  const getScoreQuality = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Improvement';
  };

  // Determine score color
  const getScoreColor = (score) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-blue-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Render score bar
  const renderScoreBar = () => (
    <div className="mb-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{frameworkConfig.scoreLabel}</h3>
        <span className="text-2xl font-bold text-gray-900">{scoreValue}</span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${getScoreColor(scoreValue)} transition-all duration-500`}
          style={{ width: `${scorePercentage}%` }}
        />
      </div>
      <p className="text-sm text-gray-600 mt-2">{getScoreQuality(scoreValue)}</p>
    </div>
  );

  // Render 2x2 grid layout
  const render2x2Grid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {frameworkConfig.categories.map((category) => (
        <div
          key={category}
          className={`p-6 rounded-lg border-2 ${frameworkConfig.colors[category].bg} ${frameworkConfig.colors[category].border}`}
        >
          <div className={`${frameworkConfig.colors[category].header} rounded px-3 py-2 mb-4 inline-block`}>
            <h3 className={`text-lg font-bold ${frameworkConfig.colors[category].text}`}>
              {frameworkConfig.icons[category]} {getCategoryLabel(frameworkConfig, category)}
            </h3>
          </div>
          <ul className="space-y-2">
            {(data[category] || []).map((item, idx) => (
              <li key={idx} className={`text-sm ${frameworkConfig.colors[category].text} flex items-start`}>
                <span className="mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  // Render 2x3 grid layout
  const render2x3Grid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {frameworkConfig.categories.map((category) => (
        <div
          key={category}
          className={`p-6 rounded-lg border-2 ${frameworkConfig.colors[category].bg} ${frameworkConfig.colors[category].border}`}
        >
          <div className={`${frameworkConfig.colors[category].header} rounded px-3 py-2 mb-4 inline-block`}>
            <h3 className={`text-lg font-bold ${frameworkConfig.colors[category].text}`}>
              {frameworkConfig.icons[category]} {getCategoryLabel(frameworkConfig, category)}
            </h3>
          </div>
          <ul className="space-y-2">
            {(data[category] || []).map((item, idx) => (
              <li key={idx} className={`text-sm ${frameworkConfig.colors[category].text} flex items-start`}>
                <span className="mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  // Render 3x3 grid layout
  const render3x3Grid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {frameworkConfig.categories.map((category) => (
        <div
          key={category}
          className={`p-6 rounded-lg border-2 ${frameworkConfig.colors[category].bg} ${frameworkConfig.colors[category].border}`}
        >
          <div className={`${frameworkConfig.colors[category].header} rounded px-3 py-2 mb-4 inline-block`}>
            <h3 className={`text-lg font-bold ${frameworkConfig.colors[category].text}`}>
              {frameworkConfig.icons[category]} {getCategoryLabel(frameworkConfig, category)}
            </h3>
          </div>
          <ul className="space-y-2">
            {(data[category] || []).map((item, idx) => (
              <li key={idx} className={`text-sm ${frameworkConfig.colors[category].text} flex items-start`}>
                <span className="mr-2">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  // Render based on layout type
  const renderContent = () => {
    switch (frameworkConfig.layout) {
      case '2x2':
        return render2x2Grid();
      case '2x3':
        return render2x3Grid();
      case '3x3':
        return render3x3Grid();
      default:
        return render2x3Grid();
    }
  };

  return (
    <div className="w-full">
      {renderScoreBar()}
      {renderContent()}
      {!isPremium && (
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
          <p className="text-sm text-blue-700 font-medium mb-2">
            💎 Upgrade to Premium (£9.99)
          </p>
          <p className="text-xs text-blue-600">
            Unlock all 7 frameworks, CSV & JSON export, and unlimited analyses
          </p>
        </div>
      )}
    </div>
  );
}

