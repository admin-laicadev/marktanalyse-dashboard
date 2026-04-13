import { Link } from 'react-router-dom';
import { studies } from '../data/studies';

export function StudiesTab() {
  const keyNumbers = [
    { label: 'Global SaaS Market', value: '$465B', change: '+15.2%' },
    { label: 'KI Adoption (Germany)', value: '36%', change: 'current' },
    { label: 'KMU with Strategy', value: '22%', change: '↑ growing' },
    { label: 'Avg. Buying Cycle', value: '10.1 mo', change: '↑ lengthening' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-bold text-blue-900 mb-2">Market Size & Trends</h3>
        <p className="text-blue-800 text-sm">
          12 comprehensive studies covering SaaS market size, KI adoption, buyer behavior, and digital transformation trends.
          These studies validate Laica's market opportunity and timing.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyNumbers.map((kn, i) => (
          <div key={i} className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
            <div className="text-2xl font-bold">{kn.value}</div>
            <div className="text-sm mt-1 opacity-90">{kn.label}</div>
            <div className="text-xs mt-2 opacity-75">{kn.change}</div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {studies.map((study) => (
          <Link
            key={study.id}
            to={`/studies/${study.id}`}
            className="w-full text-left bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow block"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-bold text-gray-900">{study.title}</h4>
                <p className="text-sm text-gray-600">{study.publisher} • {study.date}</p>
              </div>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                {study.keyNumbers?.length || 0} metrics
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-2">{study.keyFindings[0]}</p>
            <div className="text-blue-600 font-medium text-sm">View Study →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
