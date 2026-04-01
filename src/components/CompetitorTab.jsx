import { useState } from 'react';
import { Modal } from './Modal';
import { competitors } from '../data/competitors';

const categories = [
  'Alle',
  'Vergleichsportale',
  'Matching-Plattformen',
  'KI-Beratungsagenturen',
  'Bildung & Geförderte Angebote',
];

function getBadgeColor(relevance) {
  switch (relevance) {
    case 'hoch':
      return 'bg-green-100 text-green-800';
    case 'mittel':
      return 'bg-yellow-100 text-yellow-800';
    case 'niedrig':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

export function CompetitorTab() {
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const [selectedCompetitor, setSelectedCompetitor] = useState(null);

  const filtered = selectedCategory === 'Alle'
    ? competitors
    : competitors.filter((c) => c.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
        <h3 className="font-bold text-teal-900 mb-2">Laica USP vs. Competitors</h3>
        <p className="text-teal-800 text-sm">
          Unlike OMR Reviews (self-service reviews), IT-Matchmaker (expensive consulting), or Appvizer (algorithm-driven),
          <strong> Laica combines neutral advisory + procurement negotiation power + KI matching</strong> specifically for KMU.
          No provisiongetriebene Bias, no complex RFP processes, no self-service confusion.
        </p>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-3">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-teal-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((competitor) => (
          <button
            key={competitor.id}
            onClick={() => setSelectedCompetitor(competitor)}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow text-left"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-gray-900">{competitor.name}</h4>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getBadgeColor(competitor.relevance)}`}>
                {competitor.relevance}
              </span>
            </div>
            <div className="text-xs text-gray-600 mb-2">{competitor.category}</div>
            <p className="text-sm text-gray-700 mb-3">{competitor.businessModel}</p>
            <div className="text-xs text-gray-600">
              <div><strong>Pricing:</strong> {competitor.pricing}</div>
              <div><strong>Reach:</strong> {competitor.coverage || 'Nicht angegeben'}</div>
            </div>
            <div className="mt-3 text-teal-600 font-medium text-sm">View Details →</div>
          </button>
        ))}
      </div>

      <Modal
        isOpen={!!selectedCompetitor}
        onClose={() => setSelectedCompetitor(null)}
        title={selectedCompetitor?.name || ''}
      >
        {selectedCompetitor && (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Business Model</h3>
              <p className="text-gray-700">{selectedCompetitor.businessModel}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Pricing</h4>
                <p className="text-gray-700">{selectedCompetitor.pricing}</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Focus</h4>
                <p className="text-gray-700">{selectedCompetitor.focus}</p>
              </div>
            </div>

            {selectedCompetitor.coverage && (
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Coverage</h4>
                <p className="text-gray-700">{selectedCompetitor.coverage}</p>
              </div>
            )}

            <div>
              <h4 className="font-bold text-gray-900 mb-2">Relevance for Laica</h4>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedCompetitor.relevanceNote}</p>
            </div>

            {selectedCompetitor.strengths && (
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Strengths</h4>
                <ul className="space-y-1">
                  {selectedCompetitor.strengths.map((s, i) => (
                    <li key={i} className="flex gap-2 text-gray-700">
                      <span className="text-green-600 font-bold">+</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedCompetitor.weaknesses && (
              <div>
                <h4 className="font-bold text-gray-900 mb-2">Weaknesses</h4>
                <ul className="space-y-1">
                  {selectedCompetitor.weaknesses.map((w, i) => (
                    <li key={i} className="flex gap-2 text-gray-700">
                      <span className="text-red-600 font-bold">-</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h4 className="font-bold text-gray-900 mb-2">Details</h4>
              <p className="text-gray-700">{selectedCompetitor.details}</p>
            </div>

            {selectedCompetitor.url && (
              <a
                href={selectedCompetitor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors"
              >
                Visit Website →
              </a>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}