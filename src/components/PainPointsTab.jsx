import { useState } from 'react';
import { Modal } from './Modal';
import { painPoints } from '../data/painPoints';

export function PainPointsTab() {
  const [selectedPain, setSelectedPain] = useState(null);
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
          <button
            key={pain.id}
            onClick={() => setSelectedPain(pain)}
            className="w-full text-left bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
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
          </button>
        ))}
      </div>

      <Modal
        isOpen={!!selectedPain}
        onClose={() => setSelectedPain(null)}
        title={selectedPain?.title || ''}
      >
        {selectedPain && (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{selectedPain.description}</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">Weight / Impact</h3>
              <div className="bg-gray-100 rounded-lg p-4">
                <div className="text-3xl font-bold text-orange-600 mb-2">{selectedPain.weight}%</div>
                <div className="w-full bg-gray-300 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${selectedPain.weight}%` }}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">Desired Solution</h3>
              <p className="text-gray-700 bg-blue-50 p-3 rounded-lg">{selectedPain.desiredSolution}</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">Laica's Relevance</h3>
              <p className="text-gray-700 bg-teal-50 p-3 rounded-lg">{selectedPain.laicaRelevance}</p>
            </div>

            {selectedPain.sources && selectedPain.sources.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Sources</h3>
                <div className="space-y-3">
                  {selectedPain.sources.map((source, i) => (
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

            {selectedPain.examples && selectedPain.examples.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Real-World Examples</h3>
                <div className="space-y-3">
                  {selectedPain.examples.map((example, i) => (
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
        )}
      </Modal>
    </div>
  );
}