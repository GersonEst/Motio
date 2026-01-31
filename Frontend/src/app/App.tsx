import { useState } from 'react';
import { Sidebar } from '@/app/components/Sidebar';
import { PatientDashboard } from '@/app/components/PatientDashboard';
import { ResearchMode } from '@/app/components/ResearchMode';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <PatientDashboard />;
      case 'research':
        return <ResearchMode />;
      case 'patients':
      case 'alerts':
      case 'reports':
      case 'settings':
        return (
          <div className="flex-1 bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
              </h2>
              <p className="text-gray-600">This page is under development</p>
            </div>
          </div>
        );
      default:
        return <PatientDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
    </div>
  );
}
