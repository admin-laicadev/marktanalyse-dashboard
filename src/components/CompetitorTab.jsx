import { Link, useSearchParams } from 'react-router-dom';
import { competitors } from '../data/competitors';

const categories = [
  'Alle',
  'Vergleichsportale',
  'Matching-Plattformen',
  'KI-Beratungsagenturen',
  'Bildung & Geförderte Angebote',
  'SaaS-Marktplatz',
  'EU-Alternativen-Kuratierung',
];

function getBadgeColor(relevance) {
  switch (relevance) {
    case 'hoch': return 'bg-green-100 text-green-800';
    case 'mittel': return 'bg-yellow-100 text-yellow-800';
    case 'niedrig': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function CompetitorTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') ?? 'Alle';

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
              onClick={() => setSearchParams(cat === 'Alle' ? {} : { category: cat })}
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
          <Link
            key={competitor.id}
            to={`/competitors/${competitor.id}`}
            className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow text-left block"
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
          </Link>
        ))}
      </div>
    </div>
  );
}
