import { useState } from 'react';
import { Modal } from './Modal';
import { fundingPrograms } from '../data/funding';
import { AlertCircle } from 'lucide-react';

const typeLabels = {
  'bund': 'Federal',
  'land': 'State',
  'eu': 'European',
};

const typeColors = {
  'bund': 'bg-blue-100 text-blue-800',
  'land': 'bg-green-100 text-green-800',
  'eu': 'bg-purple-100 text-purple-800',
};

function daysUntilDeadline(dateStr) {
  const deadline = new Date(dateStr);
  const today = new Date('2026-04-01');
  const diff = deadline.getTime() - today.getTime();
  const days = Math.ceil(diff / (1000 * 3600 * 24));
  return days;
}

function getRelevanceBars(relevance) {
  return Array.from({ length: 10 }).map((_, i) => i < relevance);
}

export function FundingTab() {
  const [selectedProgram, setSelectedProgram] = useState(null);

  const urgent = fundingPrograms.filter((p) => p.deadlineUrgent).sort((a, b) => {
    const daysA = daysUntilDeadline(a.deadline);
    const daysB = daysUntilDeadline(b.deadline);
    return daysA - daysB;
  });

  const active = fundingPrograms
    .filter((p) => !p.deadlineUrgent && p.deadline !== 'Laufend')
    .sort((a, b) => {
      const daysA = daysUntilDeadline(a.deadline);
      const daysB = daysUntilDeadline(b.deadline);
      return daysA - daysB;
    });

  const ongoing = fundingPrograms.filter((p) => p.deadline === 'Laufend');

  return (
    <div className="space-y-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="font-bold text-red-900 mb-2">20 Funding Programs</h3>
        <p className="text-red-800 text-sm">
          €100M+ in available funding from BMWK, BMBF, KfW, EU, and VC funds specifically for digital transformation and KI startups.
          Laica is eligible for multiple programs as a KI-focused B2B SaaS startup.
        </p>
      </div>

      {urgent.length > 0 && (
        <div className="border-2 border-red-400 rounded-lg p-6 bg-red-50">
          <div className="flex gap-2 items-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold text-red-900">URGENT - Deadline Soon</h2>
          </div>
          <div className="space-y-3">
            {urgent.map((program) => {
              const days = daysUntilDeadline(program.deadline);
              return (
                <button
                  key={program.id}
                  onClick={() => setSelectedProgram(program)}
                  className="w-full bg-white rounded-lg p-4 hover:shadow-lg transition-shadow text-left border-2 border-red-200"
                >
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h4 className="font-bold text-gray-900">{program.name}</h4>
                    <div className="flex gap-2 flex-shrink-0">
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${typeColors[program.type]}`}>
                        {typeLabels[program.type]}
                      </span>
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-bold">
                        {days}d left
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{program.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-600">{program.amount}</span>
                    <span className="text-red-600 font-medium text-sm">Apply Now →</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {active.length > 0 && (
        <div className="border-2 border-yellow-400 rounded-lg p-6 bg-yellow-50">
          <h2 className="text-xl font-bold text-yellow-900 mb-4">Active - Next 3-6 Months</h2>
          <div className="space-y-3">
            {active.map((program) => {
              const days = daysUntilDeadline(program.deadline);
              return (
                <button
                  key={program.id}
                  onClick={() => setSelectedProgram(program)}
                  className="w-full bg-white rounded-lg p-4 hover:shadow-lg transition-shadow text-left border border-gray-200"
                >
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h4 className="font-bold text-gray-900">{program.name}</h4>
                    <div className="flex gap-2 flex-shrink-0">
                      <span className={`text-xs px-2 py-1 rounded-full font-bold ${typeColors[program.type]}`}>
                        {typeLabels[program.type]}
                      </span>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold">
                        {days}d left
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{program.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-bold text-gray-600">{program.amount}</span>
                    <span className="text-teal-600 font-medium text-sm">View Details →</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {ongoing.length > 0 && (
        <div className="border-2 border-green-400 rounded-lg p-6 bg-green-50">
          <h2 className="text-xl font-bold text-green-900 mb-4">Ongoing - Year-Round</h2>
          <div className="space-y-3">
            {ongoing.map((program) => (
              <button
                key={program.id}
                onClick={() => setSelectedProgram(program)}
                className="w-full bg-white rounded-lg p-4 hover:shadow-lg transition-shadow text-left border border-gray-200"
              >
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h4 className="font-bold text-gray-900">{program.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${typeColors[program.type]}`}>
                    {typeLabels[program.type]}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">{program.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-600">{program.amount}</span>
                  <span className="text-teal-600 font-medium text-sm">View Details →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <Modal
        isOpen={!!selectedProgram}
        onClose={() => setSelectedProgram(null)}
        title={selectedProgram?.name || ''}
      >
        {selectedProgram && (
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">
                <strong>{typeLabels[selectedProgram.type]}</strong> • Provider: {selectedProgram.provider}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-100 to-green-50 p-4 rounded-lg">
                <div className="text-sm font-bold text-green-900 mb-1">Funding Amount</div>
                <div className="text-2xl font-bold text-green-700">{selectedProgram.amount}</div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-4 rounded-lg">
                <div className="text-sm font-bold text-blue-900 mb-1">Deadline</div>
                <div className="text-lg font-bold text-blue-700">{selectedProgram.deadline}</div>
                {selectedProgram.deadlineUrgent && (
                  <div className="text-xs text-red-600 mt-1 font-bold">URGENT!</div>
                )}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-700">{selectedProgram.description}</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-2">Relevance for Laica</h3>
              <div className="flex gap-1 mb-2">
                {getRelevanceBars(selectedProgram.relevance).map((filled, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded ${filled ? 'bg-orange-500' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <p className="text-gray-700 text-sm">{selectedProgram.relevanceNote}</p>
            </div>

            {selectedProgram.conditions && selectedProgram.conditions.length > 0 && (
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Conditions</h3>
                <ul className="space-y-1">
                  {selectedProgram.conditions.map((condition, i) => (
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
              <p className="text-gray-700">{selectedProgram.details}</p>
            </div>

            <div className="flex gap-2">
              {selectedProgram.url && (
                <a
                  href={selectedProgram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition-colors text-center"
                >
                  More Info →
                </a>
              )}
              {selectedProgram.applicationUrl && (
                <a
                  href={selectedProgram.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors text-center"
                >
                  Apply Now →
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}