import { Link } from 'react-router-dom';
import { partners } from '../data/partners';

export function PartnersTab() {
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
              <Link
                key={partner.id}
                to={`/partners/${partner.id}`}
                className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow text-left border border-gray-200 block"
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
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
