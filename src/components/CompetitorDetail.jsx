import { useParams, Link } from 'react-router-dom';
import { competitors } from '../data/competitors';

function getBadgeColor(relevance) {
  switch (relevance) {
    case 'hoch': return 'bg-green-100 text-green-800';
    case 'mittel': return 'bg-yellow-100 text-yellow-800';
    case 'niedrig': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function CompetitorDetail() {
  const { id } = useParams();
  const item = competitors.find((c) => c.id === Number(id));

  if (!item) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Competitor not found.</p>
        <Link to="/competitors" className="text-teal-600 hover:underline mt-2 inline-block">← Back to Competitors</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/competitors" className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium">
        ← Back to Competitors
      </Link>

      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
        <span className={`text-sm px-3 py-1 rounded-full font-medium ${getBadgeColor(item.relevance)}`}>
          {item.relevance}
        </span>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-2">Business Model</h3>
        <p className="text-gray-700">{item.businessModel}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold text-gray-900 mb-1">Pricing</h4>
          <p className="text-gray-700">{item.pricing}</p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-1">Focus</h4>
          <p className="text-gray-700">{item.focus}</p>
        </div>
      </div>

      {item.coverage && (
        <div>
          <h4 className="font-bold text-gray-900 mb-1">Coverage</h4>
          <p className="text-gray-700">{item.coverage}</p>
        </div>
      )}

      <div>
        <h4 className="font-bold text-gray-900 mb-2">Relevance for Laica</h4>
        <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{item.relevanceNote}</p>
      </div>

      {item.strengths && (
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Strengths</h4>
          <ul className="space-y-1">
            {item.strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-gray-700">
                <span className="text-green-600 font-bold">+</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.weaknesses && (
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Weaknesses</h4>
          <ul className="space-y-1">
            {item.weaknesses.map((w, i) => (
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
        <p className="text-gray-700">{item.details}</p>
      </div>

      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors"
        >
          Visit Website →
        </a>
      )}
    </div>
  );
}
