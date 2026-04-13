import { useParams, Link } from 'react-router-dom';
import { fundingPrograms } from '../data/funding';

const typeLabels = {
  'bund': 'Federal',
  'land': 'State',
  'eu': 'European',
};

function getRelevanceBars(relevance) {
  return Array.from({ length: 10 }).map((_, i) => i < relevance);
}

export function FundingDetail() {
  const { id } = useParams();
  const item = fundingPrograms.find((f) => f.id === Number(id));

  if (!item) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Funding program not found.</p>
        <Link to="/funding" className="text-teal-600 hover:underline mt-2 inline-block">← Back to Funding</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/funding" className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium">
        ← Back to Funding
      </Link>

      <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>

      <div>
        <p className="text-sm text-gray-600 mb-2">
          <strong>{typeLabels[item.type]}</strong> • Provider: {item.provider}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded-lg">
          <div className="text-sm font-bold text-green-900 mb-1">Funding Amount</div>
          <div className="text-2xl font-bold text-green-700">{item.amount}</div>
        </div>
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-lg">
          <div className="text-sm font-bold text-blue-900 mb-1">Deadline</div>
          <div className="text-lg font-bold text-blue-700">{item.deadline}</div>
          {item.deadlineUrgent && (
            <div className="text-xs text-red-600 mt-1 font-bold">URGENT!</div>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-2">Description</h3>
        <p className="text-gray-700">{item.description}</p>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-2">Relevance for Laica</h3>
        <div className="flex gap-1 mb-2">
          {getRelevanceBars(item.relevance).map((filled, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded ${filled ? 'bg-orange-500' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        <p className="text-gray-700 text-sm">{item.relevanceNote}</p>
      </div>

      {item.conditions && item.conditions.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Conditions</h3>
          <ul className="space-y-1">
            {item.conditions.map((condition, i) => (
              <li key={i} className="flex gap-2 text-gray-700 text-sm">
                <span className="text-teal-600 font-bold">✓</span>
                <span>{condition}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="font-bold text-gray-900 mb-2">Details</h3>
        <p className="text-gray-700">{item.details}</p>
      </div>

      <div className="flex gap-2">
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors text-center"
          >
            More Info →
          </a>
        )}
        {item.applicationUrl && (
          <a
            href={item.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors text-center"
          >
            Apply Now →
          </a>
        )}
      </div>
    </div>
  );
}
