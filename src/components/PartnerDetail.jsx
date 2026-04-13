import { useParams, Link } from 'react-router-dom';
import { partners } from '../data/partners';

export function PartnerDetail() {
  const { id } = useParams();
  const item = partners.find((p) => p.id === Number(id));

  if (!item) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Partner not found.</p>
        <Link to="/partners" className="text-teal-600 hover:underline mt-2 inline-block">← Back to Partners</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/partners" className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium">
        ← Back to Partners
      </Link>

      <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>

      <div>
        <h3 className="font-bold text-gray-900 mb-2">Description</h3>
        <p className="text-gray-700">{item.description}</p>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-3">Platforms & Reach</h3>
        <div className="space-y-2">
          {Object.entries(item.reach).map(([platform, stats], i) => (
            <div key={i} className="bg-gray-50 p-3 rounded-lg">
              <h4 className="font-bold text-gray-900">{platform}</h4>
              <div className="text-sm text-gray-600 mt-1">
                {Object.entries(stats).map(([key, value], j) => (
                  <div key={j}>
                    {key}: <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {item.values && item.values.length > 0 && (
        <div>
          <h3 className="font-bold text-gray-900 mb-2">Core Values</h3>
          <div className="flex flex-wrap gap-2">
            {item.values.map((value, i) => (
              <span
                key={i}
                className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-bold text-gray-900 mb-3">Content Examples</h3>
        <div className="space-y-3">
          {item.examples?.map((example, i) => (
            <div key={i} className="border-l-4 border-purple-300 pl-3">
              <a
                href={example.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-600 hover:underline"
              >
                {example.title} →
              </a>
              <p className="text-sm text-gray-700 mt-1">{example.excerpt}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-2">Why Alliance?</h3>
        <p className="text-gray-700 bg-purple-50 p-3 rounded-lg">{item.whyAlliance}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-sm font-bold text-blue-900">Authority</div>
          <div className="text-2xl font-bold text-blue-600">{item.authorityScore}</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-sm font-bold text-green-900">Values Match</div>
          <div className="text-2xl font-bold text-green-600">{item.valuesMatch}</div>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg">
          <div className="text-sm font-bold text-orange-900">Reach</div>
          <div className="text-2xl font-bold text-orange-600">{item.reachScore}</div>
        </div>
      </div>

      {item.url && (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
        >
          Visit Partner →
        </a>
      )}
    </div>
  );
}
