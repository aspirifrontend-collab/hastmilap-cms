import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

// Route-level code splitting: each page ships its own chunk instead of
// bundling every page (including the whole Admin panel) into the JS every
// visitor has to download before the site can render.
const Home = lazy(() => import('./components/Home'));
const Admin = lazy(() => import('./components/Admin'));
const OurStory = lazy(() => import('./components/OurStory'));
const B2b = lazy(() => import('./components/B2b'));
const CreativeProcess = lazy(() => import('./components/CreativeProcess'));
const ContactUs = lazy(() => import('./components/ContactUs'));

const routeFallback = (
  <div style={{ position: 'fixed', inset: 0, zIndex: 99999, background: '#ffffff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ border: '4px solid #f3f3f3', borderTop: '4px solid #b8976a', borderRadius: '50%', width: '50px', height: '50px', animation: 'spin 1s linear infinite' }}></div>
    <style>
      {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
    </style>
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={routeFallback}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/b2b" element={<B2b />} />
            <Route path="/creative-process" element={<CreativeProcess />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
