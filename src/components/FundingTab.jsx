import { Link } from 'react-router-dom';
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

export function FundingTab() {
  const urgent = fundingPrograms.filter((p) => p.deadlineUrgent).sort((a, b) => {
    return daysUntilDeadline(a.deadline) - daysUntilDeadline(b.deadline);
  });

  const active = fundingPrograms
    .filter((p) => !p.deadlineUrgent && p.deadline !== 'Laufend')
    .sort((a, b) => daysUntilDeadline(a.deadline) - daysUntilDeadline(b.deadline));

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
                <Link
                  key={program.id}
                  to={`/funding/${program.id}`}
                  className="w-full bg-white rounded-lg p-4 hover:shadow-lg transition-shadow text-left border-2 border-red-200 block"
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
                </Link>
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
                <Link
                  key={program.id}
                  to={`/funding/${program.id}`}
                  className="w-full bg-white rounded-lg p-4 hover:shadow-lg transition-shadow text-left border border-gray-200 block"
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
                </Link>
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
              <Link
                key={program.id}
                to={`/funding/${program.id}`}
                className="w-full bg-white rounded-lg p-4 hover:shadow-lg transition-shadow text-left border border-gray-200 block"
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
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
