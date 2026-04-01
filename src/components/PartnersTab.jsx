import { useState } from 'react';
import { Modal } from './Modal';
import { partners } from '../data/partners';

export function PartnersTab() {
  const [selectedPartner, setSelectedPartner] = useState(null);

  const phases = {
    1: { label: 'Phase 1: Priority', color: 'bg-red-50 border-red-200', textColor: 'text-red-900' },
    2: { label: 'Phase 2: Active', color: 'bg-yellow-50 border-yellow-200', textColor: 'text-yellow-900' },
    3: { label: 'Phase 3: Explore', color: 'bg-blue-50 border-blue-200', textColor: 'text-blue-900' },
  };

  const byPhase = {
    1: partners.filter((p) => p.phase === 1),
    2: partners.filter((p) => p.phase === 2),
    3: partners.filter((p) => p.phase === 3),
  };

  return (
    <div className="space-y-8">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="font-bold text-purple-900 mb-2">20+ Strategic Partnerships</h3>
        <p className="text-purple-800 text-sm">
          Relationships with KI podcasts (Everlast AI 125K subs), newsletters (Jens Polomski 42K),
          industry bodies (BVMW 400K members), and media outlets for co-marketing and distribution.
        </p>
      </div>

      {[1, 2, 3].map((phase) => (
        <div key={phase} className={`border-2 rounded-lg p-6 ${phases[phase].color}`}>
          <h2 className={`text-xl font-bold ${phases[phase].textColor} mb-4`}>
            {phases[phase].label}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {byPhase[phase].map((partner) => (
              <button
                key={partner.id}
                onClick={() => setSelectedPartner(partner)}
                className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow text-left border border-gray-200"
              >
                <h4 className="font-bold text-gray-900 mb-2">{partner.name}</h4>

                <div className="space-y-3 mb-3">
                  <div>
                    <div className="text-xs font-bold text-gray-600 mb-1">Authority</div>
                    <div className="flex gap-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${partner.authorityScore}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-600">{partner.authorityScore}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-gray-600 mb-1">Values Match</div>
                    <div className="flex gap-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${partner.valuesMatch}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-600">{partner.valuesMatch}</span>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-bold text-gray-600 mb-1">Reach</div>
                    <div className="flex gap-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${partner.reachScore}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-gray-600">{partner.reachScore}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-2">{partner.description}</p>
                <div className="text-purple-600 font-medium text-sm">View Details →</div>
              </button>
            ))}
          </div>
        </div>
      ))}

      <Modal
        isOpen={!!selectedPartner}
        onClose={() => setSelectedPartner(null)}
        title={selectedPartner?.name || ''}
      >
        {selectedPartner && (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{selectedPartner.description}</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Platforms & Reach</h3>
              <div className="space-y-2">
                {Object.entries(selectedPartner.reach).map(([platform, stats], i) => (
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

            {selectedPartner.values && selectedPartner.values.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Core Values</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPartner.values.map((value, i) => (
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
                {selectedPartner.examples?.map((example, i) => (
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
              <p className="text-gray-700 bg-purple-50 p-3 rounded-lg">{selectedPartner.whyAlliance}</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm font-bold text-blue-900">Authority</div>
                <div className="text-2xl font-bold text-blue-600">{selectedPartner.authorityScore}</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <div className="text-sm font-bold text-green-900">Values Match</div>
                <div className="text-2xl font-bold text-green-600">{selectedPartner.valuesMatch}</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <div className="text-sm font-bold text-orange-900">Reach</div>
                <div className="text-2xl font-bold text-orange-600">{selectedPartner.reachScore}</div>
              </div>
            </div>

            {selectedPartner.url && (
              <a
                href={selectedPartner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Visit Partner →
              </a>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}