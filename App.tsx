import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { SmoothScroll } from './components/animations';
import Layout from './components/layout/Layout';
import { HomePage, GalleryPage, MediaPage, TourPage } from './components/pages';

// Scroll to top component
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Lite mode detector hook
const useLiteMode = () => {
  const [isLiteMode, setIsLiteMode] = useState(false);

  useEffect(() => {
    const touchQuery = window.matchMedia('(hover: none) and (pointer: coarse)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateLiteMode = () => {
      setIsLiteMode(touchQuery.matches || motionQuery.matches || window.innerWidth < 900);
    };

    updateLiteMode();
    touchQuery.addEventListener('change', updateLiteMode);
    motionQuery.addEventListener('change', updateLiteMode);
    window.addEventListener('resize', updateLiteMode);

    return () => {
      touchQuery.removeEventListener('change', updateLiteMode);
      motionQuery.removeEventListener('change', updateLiteMode);
      window.removeEventListener('resize', updateLiteMode);
    };
  }, []);

  return isLiteMode;
};

// Main App content with routing
const AppContent: React.FC = () => {
  const isLiteMode = useLiteMode();

  return (
    <Router>
      <ScrollToTop />
      <SmoothScroll>
        <AnimatePresence mode="wait">
          <Routes>
            <Route
              path="/"
              element={
                <Layout showIntro={true} isLiteMode={isLiteMode}>
                  <HomePage />
                </Layout>
              }
            />
            <Route
              path="/gallery"
              element={
                <Layout showIntro={false} isLiteMode={isLiteMode}>
                  <GalleryPage />
                </Layout>
              }
            />
            <Route
              path="/media"
              element={
                <Layout showIntro={false} isLiteMode={isLiteMode}>
                  <MediaPage />
                </Layout>
              }
            />
            <Route
              path="/tour"
              element={
                <Layout showIntro={false} isLiteMode={isLiteMode}>
                  <TourPage />
                </Layout>
              }
            />
            {/* Fallback to home for unknown routes */}
            <Route path="*" element={
              <Layout showIntro={true} isLiteMode={isLiteMode}>
                <HomePage />
              </Layout>
            } />
          </Routes>
        </AnimatePresence>
      </SmoothScroll>
    </Router>
  );
};

const App: React.FC = () => {
  return <AppContent />;
};

export default App;
