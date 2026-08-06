import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Admin from './components/Admin';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

import OurStory from './components/OurStory';
import B2b from './components/B2b';
import CreativeProcess from './components/CreativeProcess';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/b2b" element={<B2b />} />
          <Route path="/creative-process" element={<CreativeProcess />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
