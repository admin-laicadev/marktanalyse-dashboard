export function ExecutiveSummary() {
  const stats = [
    { label: 'Competitors Analyzed', value: '19', color: 'bg-teal-50' },
    { label: 'Pain Points Identified', value: '10', color: 'bg-orange-50' },
    { label: 'Market Studies', value: '12', color: 'bg-blue-50' },
    { label: 'News Articles', value: '52', color: 'bg-green-50' },
    { label: 'Strategic Partners', value: '20', color: 'bg-purple-50' },
    { label: 'Funding Programs', value: '20', color: 'bg-red-50' },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Laica Market Analysis</h1>
        <p className="text-gray-600 text-lg">
          Comprehensive analysis of market landscape, competitors, pain points, and strategic opportunities
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className={`${stat.color} rounded-lg p-6 border border-gray-200`}>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg p-8 mt-8">
        <h2 className="text-2xl font-bold mb-4">Laica's Positioning</h2>
        <p className="text-lg leading-relaxed">
          Laica differentiates itself from 19 competitors (OMR Reviews, Appvizer, trusted.de, IT-Matchmaker, etc.)
          through a unique model combining <strong>neutral software advisory + procurement negotiation + KI-powered matching</strong>.
          While competitors offer self-service portals, Laica provides <strong>personalized consulting for KMU</strong>
          focused on solving the 10 key pain points: DSGVO compliance, tool overload, lack of strategic guidance,
          and total cost of ownership. The market is booming with €465B global SaaS opportunity, but 62% of KMU
          report confusion about KI-tool selection. Laica captures this gap through advisory + negotiation power.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <h3 className="font-bold text-gray-900 mb-3">Key Market Insights</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex gap-2">
            <span className="text-teal-600 font-bold">•</span>
            <span>36% of German companies use KI today, 59% plan to within 2 years</span>
          </li>
          <li className="flex gap-2">
            <span className="text-teal-600 font-bold">•</span>
            <span>SaaS buying cycle extended to 10.1 months - need for professional guidance increasing</span>
          </li>
          <li className="flex gap-2">
            <span className="text-teal-600 font-bold">•</span>
            <span>European cloud solutions gaining traction due to GDPR and digital sovereignty concerns</span>
          </li>
          <li className="flex gap-2">
            <span className="text-teal-600 font-bold">•</span>
            <span>20+ funding programs available for digital transformation initiatives</span>
          </li>
          <li className="flex gap-2">
            <span className="text-teal-600 font-bold">•</span>
            <span>Strategic partnerships with 20+ industry influencers and media outlets available</span>
          </li>
        </ul>
      </div>
    </div>
  );
}