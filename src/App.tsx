import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UIPolish from './pages/UIPolish';
import FluidDynamics from './pages/FluidDynamics'; // Add this import
import CinematicSequences from './pages/CinematicSequences';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ui-polish" element={<UIPolish />} />
        <Route path="/fluid-dynamics" element={<FluidDynamics />} /> {/* Add this route */}
        <Route path="/cinematic" element={<CinematicSequences />} />
      </Routes>
    </Router>
  );
}

export default App;
