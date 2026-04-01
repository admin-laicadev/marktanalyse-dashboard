import { BarChart3, AlertTriangle, BookOpen, Newspaper, Users, Coins } from 'lucide-react';

const tabs = [
  { id: 'competitors', label: 'Competitors', icon: BarChart3 },
  { id: 'painPoints', label: 'Pain Points', icon: AlertTriangle },
  { id: 'studies', label: 'Studies', icon: BookOpen },
  { id: 'news', label: 'News', icon: Newspaper },
  { id: 'partners', label: 'Partners', icon: Users },
  { id: 'funding', label: 'Funding', icon: Coins },
];

export function TabNav({ activeTab, onTabChange }) {
  return (
    <div className="border-b border-gray-200 overflow-x-auto">
      <div className="flex gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                isActive
                  ? 'border-teal-600 text-teal-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}