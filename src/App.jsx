import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ExecutiveSummary } from './components/ExecutiveSummary';
import { TabNav } from './components/TabNav';
import { CompetitorTab } from './components/CompetitorTab';
import { CompetitorDetail } from './components/CompetitorDetail';
import { PainPointsTab } from './components/PainPointsTab';
import { PainPointDetail } from './components/PainPointDetail';
import { StudiesTab } from './components/StudiesTab';
import { StudyDetail } from './components/StudyDetail';
import { NewsTab } from './components/NewsTab';
import { NewsPainPointDetail } from './components/NewsPainPointDetail';
import { PartnersTab } from './components/PartnersTab';
import { PartnerDetail } from './components/PartnerDetail';
import { FundingTab } from './components/FundingTab';
import { FundingDetail } from './components/FundingDetail';

function Layout() {
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
        <TabNav />
        <div className="bg-white border-l border-r border-gray-200 p-8">
          <Outlet />
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/overview" replace />} />
        <Route path="overview" element={<ExecutiveSummary />} />
        <Route path="competitors" element={<CompetitorTab />} />
        <Route path="competitors/:id" element={<CompetitorDetail />} />
        <Route path="pain-points" element={<PainPointsTab />} />
        <Route path="pain-points/:id" element={<PainPointDetail />} />
        <Route path="studies" element={<StudiesTab />} />
        <Route path="studies/:id" element={<StudyDetail />} />
        <Route path="news" element={<NewsTab />} />
        <Route path="news/pain-point/:id" element={<NewsPainPointDetail />} />
        <Route path="partners" element={<PartnersTab />} />
        <Route path="partners/:id" element={<PartnerDetail />} />
        <Route path="funding" element={<FundingTab />} />
        <Route path="funding/:id" element={<FundingDetail />} />
      </Route>
    </Routes>
  );
}
