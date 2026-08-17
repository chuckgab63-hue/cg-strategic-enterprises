import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import UIPolish from './pages/UIPolish';
import FluidDynamics from './pages/FluidDynamics';
import CinematicSequences from './pages/CinematicSequences';
import Portfolio from './pages/Portfolio';

function App() {
  return (
    <Router>
      {/* This will fire on every route change and reset the scrollbar */}
      <ScrollToTop />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ui-polish" element={<UIPolish />} />
        <Route path="/fluid-dynamics" element={<FluidDynamics />} />
        <Route path="/cinematic" element={<CinematicSequences />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
