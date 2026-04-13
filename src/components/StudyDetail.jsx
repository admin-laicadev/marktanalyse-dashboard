import { useParams, Link } from 'react-router-dom';
import { studies } from '../data/studies';

export function StudyDetail() {
  const { id } = useParams();
  const item = studies.find((s) => s.id === Number(id));

  if (!item) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Study not found.</p>
        <Link to="/studies" className="text-teal-600 hover:underline mt-2 inline-block">← Back to Studies</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/studies" className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium">
        ← Back to Studies
      </Link>

      <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>

      <div>
        <p className="text-sm text-gray-600 mb-2">
          <strong>{item.publisher}</strong> • {item.date}
        </p>
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 hover:underline text-sm font-medium"
          >
            Read Full Study →
          </a>
        )}
      </div>

      {item.keyNumbers && item.keyNumbers.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-900 mb-3">Key Metrics</h3>
          <div className="grid grid-cols-2 gap-3">
            {item.keyNumbers.map((kn, i) => (
              <div key={i} className="bg-gradient-to-br from-gray-100 to-gray-50 p-3 rounded-lg">
                <div className="text-xl font-bold text-gray-900">{kn.value}</div>
                <div className="text-sm text-gray-600">{kn.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {item.keyFindings && item.keyFindings.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-900 mb-3">Key Findings</h3>
          <ul className="space-y-2">
            {item.keyFindings.map((finding, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                <span className="text-gray-700">{finding}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <h3 className="font-bold text-gray-900 mb-2">Relevance for Laica</h3>
        <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">{item.relevance}</p>
      </div>
    </div>
  );
}
