import { Link } from 'react-router-dom';
import { painPoints } from '../data/painPoints';

export function PainPointsTab() {
  const sorted = [...painPoints].sort((a, b) => b.weight - a.weight);

  return (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
        <h3 className="font-bold text-orange-900 mb-2">KMU Pain Points in Software Selection</h3>
        <p className="text-orange-800 text-sm">
          Laica solves these 10 critical pain points through guided selection, negotiation support, and strategic advisory.
        </p>
      </div>

      <div className="space-y-4">
        {sorted.map((pain) => (
          <Link
            key={pain.id}
            to={`/pain-points/${pain.id}`}
            className="w-full text-left bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow block"
          >
            <div className="flex items-end justify-between mb-2">
              <h4 className="font-bold text-gray-900">{pain.title}</h4>
              <span className="text-sm font-bold text-gray-600">{pain.weight}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div
                className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full transition-all"
                style={{ width: `${pain.weight}%` }}
              />
            </div>

            <p className="text-sm text-gray-600 mb-2">{pain.description}</p>

            {pain.sources && pain.sources.length > 0 && (
              <div className="text-xs text-gray-500">
                Sources: {pain.sources.map(s => s.title).join(', ')}
              </div>
            )}

            <div className="mt-2 text-orange-600 font-medium text-sm">View Details →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
