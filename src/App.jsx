import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { usePortfolio } from './hooks/usePortfolio';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';
import AdminAuth from './components/admin/AdminAuth';
import AdminPanel from './components/admin/AdminPanel';
import ProjectEditor from './components/admin/ProjectEditor';
import ChatBot from './components/ChatBot';
import './index.css';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const { portfolioData, updateData } = usePortfolio();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        setShowAuth(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!portfolioData) return <div>Loading...</div>;

  const handleAuthenticated = () => {
    setIsAdminMode(true);
    setShowAuth(false);
  };

  const startProjectEdit = (index) => {
    setEditingProjectIndex(index);
    if (!isAdminMode) {
      setShowAuth(true);
    }
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar
          name={portfolioData.hero.name}
          sectionsVisible={portfolioData.settings.sectionsVisible}
          customSections={portfolioData.customSections}
        />

        <Routes>
          <Route path="/" element={<Home portfolioData={portfolioData} onEdit={() => setShowAuth(true)} />} />
          <Route path="/project/:index" element={<ProjectDetail portfolioData={portfolioData} onEdit={(idx) => startProjectEdit(idx)} />} />
        </Routes>

        <Footer name={portfolioData.hero.name} />

        {showAuth && (
          <AdminAuth
            defaultPassword={portfolioData.settings.password}
            onAuthenticate={handleAuthenticated}
            onCancel={() => { setShowAuth(false); setEditingProjectIndex(null); }}
          />
        )}

        {isAdminMode && !editingProjectIndex && (
          <AdminPanel
            portfolioData={portfolioData}
            updateData={updateData}
            onClose={() => setIsAdminMode(false)}
          />
        )}

        {isAdminMode && editingProjectIndex !== null && (
          <ProjectEditor
            portfolioData={portfolioData}
            projectIndex={editingProjectIndex}
            updateData={updateData}
            onClose={() => { setEditingProjectIndex(null); setIsAdminMode(false); }}
          />
        )}
        <ChatBot portfolioData={portfolioData} />
      </div>
    </Router>
  );
}

export default App;
