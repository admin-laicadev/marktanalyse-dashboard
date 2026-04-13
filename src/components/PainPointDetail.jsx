import { useParams, Link } from 'react-router-dom';
import { painPoints } from '../data/painPoints';

export function PainPointDetail() {
  const { id } = useParams();
  const item = painPoints.find((p) => p.id === Number(id));

  if (!item) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Pain point not found.</p>
        <Link to="/pain-points" className="text-teal-600 hover:underline mt-2 inline-block">← Back to Pain Points</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/pain-points" className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium">
        ← Back to Pain Points
      </Link>

      <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>

      <div>
        <h3 className="font-bold text-gray-900 mb-2">Description</h3>
        <p className="text-gray-700">{item.description}</p>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-2">Weight / Impact</h3>
        <div className="bg-gray-100 rounded-lg p-4">
          <div className="text-3xl font-bold text-orange-600 mb-2">{item.weight}%</div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: `${item.weight}%` }}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-2">Desired Solution</h3>
        <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">{item.desiredSolution}</p>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-2">Laica's Relevance</h3>
        <p className="text-gray-700 bg-teal-50 p-3 rounded-lg">{item.laicaRelevance}</p>
      </div>

      {item.sources && item.sources.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Sources</h3>
          <div className="space-y-3">
            {item.sources.map((source, i) => (
              <div key={i} className="bg-gray-50 p-3 rounded-lg">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal-600 hover:underline"
                >
                  {source.title} →
                </a>
                <p className="text-sm text-gray-600 mt-1">"{source.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {item.examples && item.examples.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Real-World Examples</h3>
          <div className="space-y-3">
            {item.examples.map((example, i) => (
              <div key={i} className="border-l-4 border-orange-300 pl-3">
                <p className="text-gray-700">{example.text}</p>
                <a
                  href={example.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal-600 hover:underline"
                >
                  Source: {example.source} →
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
