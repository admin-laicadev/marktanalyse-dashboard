import { useState } from 'react';
import { Modal } from './Modal';
import { studies } from '../data/studies';

export function StudiesTab() {
  const [selectedStudy, setSelectedStudy] = useState(null);

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
          <button
            key={study.id}
            onClick={() => setSelectedStudy(study)}
            className="w-full text-left bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
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
          </button>
        ))}
      </div>

      <Modal
        isOpen={!!selectedStudy}
        onClose={() => setSelectedStudy(null)}
        title={selectedStudy?.title || ''}
      >
        {selectedStudy && (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">
                <strong>{selectedStudy.publisher}</strong> • {selectedStudy.date}
              </p>
              {selectedStudy.url && (
                <a
                  href={selectedStudy.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:underline text-sm font-medium"
                >
                  Read Full Study →
                </a>
              )}
            </div>

            {selectedStudy.keyNumbers && selectedStudy.keyNumbers.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Key Metrics</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedStudy.keyNumbers.map((kn, i) => (
                    <div key={i} className="bg-gradient-to-br from-gray-100 to-gray-50 p-3 rounded-lg">
                      <div className="text-xl font-bold text-gray-900">{kn.value}</div>
                      <div className="text-sm text-gray-600">{kn.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedStudy.keyFindings && selectedStudy.keyFindings.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Key Findings</h3>
                <ul className="space-y-2">
                  {selectedStudy.keyFindings.map((finding, i) => (
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
              <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">{selectedStudy.relevance}</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}