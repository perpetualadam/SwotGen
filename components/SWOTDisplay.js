export default function SWOTDisplay({ data }) {
  if (!data) return null;

  const { Strengths, Weaknesses, Opportunities, Threats, NicheScore } = data;

  // Determine niche score color based on value
  const getScoreColor = (score) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-blue-600';
    if (score >= 25) return 'text-yellow-600';
    return 'text-red-600';
  };

  // Determine score background color
  const getScoreBgColor = (score) => {
    if (score >= 75) return 'bg-green-50 border-green-200';
    if (score >= 50) return 'bg-blue-50 border-blue-200';
    if (score >= 25) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="w-full max-w-4xl mx-auto animate-fade-in">
      {/* Niche Score Card */}
      <div className={`mb-8 p-6 rounded-lg border-2 ${getScoreBgColor(NicheScore)}`}>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Niche Viability Score</h2>
        <div className="flex items-center gap-4">
          <div className={`text-5xl font-bold ${getScoreColor(NicheScore)}`}>
            {NicheScore}
          </div>
          <div className="flex-1">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-500 ${
                  NicheScore >= 75
                    ? 'bg-green-600'
                    : NicheScore >= 50
                    ? 'bg-blue-600'
                    : NicheScore >= 25
                    ? 'bg-yellow-600'
                    : 'bg-red-600'
                }`}
                style={{ width: `${NicheScore}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {NicheScore >= 75
                ? 'Excellent market potential'
                : NicheScore >= 50
                ? 'Good market potential'
                : NicheScore >= 25
                ? 'Moderate market potential'
                : 'Limited market potential'}
            </p>
          </div>
        </div>
      </div>

      {/* SWOT Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <div className="animate-slide-in p-6 bg-green-50 border-2 border-green-200 rounded-lg">
          <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
            <span className="text-2xl">💪</span> Strengths
          </h3>
          <ul className="space-y-2">
            {Strengths && Strengths.length > 0 ? (
              Strengths.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-gray-700">
                  <span className="text-green-600 font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">No strengths identified</li>
            )}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="animate-slide-in p-6 bg-red-50 border-2 border-red-200 rounded-lg">
          <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
            <span className="text-2xl">⚠️</span> Weaknesses
          </h3>
          <ul className="space-y-2">
            {Weaknesses && Weaknesses.length > 0 ? (
              Weaknesses.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-gray-700">
                  <span className="text-red-600 font-bold">✗</span>
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">No weaknesses identified</li>
            )}
          </ul>
        </div>

        {/* Opportunities */}
        <div className="animate-slide-in p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <span className="text-2xl">🚀</span> Opportunities
          </h3>
          <ul className="space-y-2">
            {Opportunities && Opportunities.length > 0 ? (
              Opportunities.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-gray-700">
                  <span className="text-blue-600 font-bold">→</span>
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">No opportunities identified</li>
            )}
          </ul>
        </div>

        {/* Threats */}
        <div className="animate-slide-in p-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
          <h3 className="text-xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span> Threats
          </h3>
          <ul className="space-y-2">
            {Threats && Threats.length > 0 ? (
              Threats.map((item, idx) => (
                <li key={idx} className="flex gap-3 text-gray-700">
                  <span className="text-yellow-600 font-bold">!</span>
                  <span>{item}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500 italic">No threats identified</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

