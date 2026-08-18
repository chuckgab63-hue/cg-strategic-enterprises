import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import GlobalHeader from './components/GlobalHeader';
import GlobalFooter from './components/GlobalFooter';
import Home from './pages/Home';
import UIPolish from './pages/UIPolish';
import FluidDynamics from './pages/FluidDynamics';
import CinematicSequences from './pages/CinematicSequences';
import Portfolio from './pages/Portfolio';
import Automations from './pages/Automations';

function App() {
  return (
    <Router>
      <ScrollToTop />
      
      {/* Outer wrapper to ensure the footer stays at the bottom */}
      <div className="flex flex-col min-h-screen bg-slate-950">
        
        <GlobalHeader />
        
        {/* Main content area. pt-28 ensures content starts below the fixed header */}
        <main className="flex-grow pt-28">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ui-polish" element={<UIPolish />} />
            <Route path="/fluid-dynamics" element={<FluidDynamics />} />
            <Route path="/cinematic" element={<CinematicSequences />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/automations" element={<Automations />} />
          </Routes>
        </main>

        <GlobalFooter />
        
      </div>
    </Router>
  );
}

export default App;
