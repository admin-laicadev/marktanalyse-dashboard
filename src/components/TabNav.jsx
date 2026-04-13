import { NavLink } from 'react-router-dom';
import { BarChart3, AlertTriangle, BookOpen, Newspaper, Users, Coins } from 'lucide-react';

const tabs = [
  { path: '/competitors', label: 'Competitors', icon: BarChart3 },
  { path: '/pain-points', label: 'Pain Points', icon: AlertTriangle },
  { path: '/studies', label: 'Studies', icon: BookOpen },
  { path: '/news', label: 'News', icon: Newspaper },
  { path: '/partners', label: 'Partners', icon: Users },
  { path: '/funding', label: 'Funding', icon: Coins },
];

export function TabNav() {
  return (
    <div className="border-b border-gray-200 overflow-x-auto">
      <div className="flex gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{tab.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}
