import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Global Components
import GlobalHeader from './components/GlobalHeader';
import GlobalFooter from './components/GlobalFooter';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Home from './pages/Home';
import Automations from './pages/Automations';
import Portfolio from './pages/Portfolio';
import CinematicSequences from './pages/CinematicSequences';
import FluidDynamics from './pages/FluidDynamics';
import UIPolish from './pages/UIPolish';
import Skunkworks from './pages/Skunkworks';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      
      <div className="flex flex-col min-h-screen bg-slate-950 font-sans selection:bg-brand-orange selection:text-white">
        {/* Fixed Navigation */}
        <GlobalHeader />
        
        {/* Main Routing Canvas */}
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/automations" element={<Automations />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/case-studies" element={<Portfolio />} />
            <Route path="/case-study" element={<Portfolio />} />
            <Route path="/cinematic" element={<CinematicSequences />} />
            <Route path="/fluid" element={<FluidDynamics />} />
            <Route path="/fluid-dynamics" element={<FluidDynamics />} />
            <Route path="/ui-polish" element={<UIPolish />} />
            <Route path="/skunkworks" element={<Skunkworks />} />
          </Routes>
        </main>
        
        {/* Global Footer */}
        <GlobalFooter />
      </div>
    </Router>
  );
}
