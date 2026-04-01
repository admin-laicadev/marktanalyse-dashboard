import { useState } from 'react';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { TabNav } from './components/TabNav';
import { CompetitorTab } from './components/CompetitorTab';
import { PainPointsTab } from './components/PainPointsTab';
import { StudiesTab } from './components/StudiesTab';
import { NewsTab } from './components/NewsTab';
import { PartnersTab } from './components/PartnersTab';
import { FundingTab } from './components/FundingTab';

export default function App() {
  const [activeTab, setActiveTab] = useState('competitors');

  const renderTab = () => {
    switch (activeTab) {
      case 'competitors':
        return <CompetitorTab />;
      case 'painPoints':
        return <PainPointsTab />;
      case 'studies':
        return <StudiesTab />;
      case 'news':
        return <NewsTab />;
      case 'partners':
        return <PartnersTab />;
      case 'funding':
        return <FundingTab />;
      default:
        return <CompetitorTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold">Laica Market Dashboard</h1>
          <p className="text-teal-100 mt-1">
            Comprehensive competitive analysis, market research & strategic planning
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <ExecutiveSummary />

        <div className="mt-12">
          <TabNav activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="bg-white border-l border-r border-gray-200 p-8">
            {renderTab()}
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600 text-sm">
          <p>
            Laica Market Analysis Dashboard • Last Updated: April 1, 2026
          </p>
          <p className="mt-2">
            Data compiled from 19 competitors, 10 pain points, 12 market studies, 52 news articles,
            20 strategic partners, and 20 funding programs
          </p>
        </div>
      </footer>
    </div>
  );
}
