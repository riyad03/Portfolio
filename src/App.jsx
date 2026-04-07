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
  const { portfolioData, updateData, loading, error } = usePortfolio();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [editingProjectIndex, setEditingProjectIndex] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => setIsChatOpen(!isChatOpen);

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

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Check for Ctrl+Shift+E (support both uppercase and lowercase)
      if (e.ctrlKey && e.shiftKey && (e.key === 'E' || e.key === 'e' || e.code === 'KeyE')) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🔧 Admin shortcut triggered!');
        console.log('Current path:', window.location.pathname);

        const projectMatch = window.location.pathname.match(/\/project\/(\d+)/);
        if (projectMatch) {
          const index = parseInt(projectMatch[1], 10);
          console.log('Opening project editor for project #', index);
          startProjectEdit(index);
        } else {
          console.log('Opening main admin panel');
          setShowAuth(true);
        }
      }
    };

    // Add to document instead of window for better compatibility
    document.addEventListener('keydown', handleKeyDown, true);
    return () => document.removeEventListener('keydown', handleKeyDown, true);
  }, [isAdminMode]);

  // Loading state
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: 'var(--color-text-primary)'
      }}>
        Loading portfolio...
      </div>
    );
  }

  // Error state (still shows portfolio with fallback data)
  if (error) {
    console.warn('Portfolio loaded with fallback data:', error);
  }

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
          <Route path="/" element={<Home portfolioData={portfolioData} onEdit={() => setShowAuth(true)} onChatToggle={toggleChat} />} />
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
        <ChatBot
          portfolioData={portfolioData}
          isOpen={isChatOpen}
          onToggle={toggleChat}
        />
      </div>
    </Router>
  );
}

export default App;
