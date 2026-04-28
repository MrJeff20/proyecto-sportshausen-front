import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import FeedLuchador from './pages/FeedLuchador';
import FeedBooker from './pages/FeedBooker';
import LuchadorDashboard from './pages/LuchadorDashboard';
import PerfilLuchador from './pages/PerfilLuchador';
import CalendarioDisponibilidad from './pages/CalendarioDisponibilidad';
import BookerDashboard from './pages/BookerDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        {/* Feeds estilo LinkedIn */}
        <Route path="/feed/luchador" element={<FeedLuchador />} />
        <Route path="/feed/booker" element={<FeedBooker />} />
        
        {/* Dashboards clásicos */}
        <Route path="/dashboard/luchador" element={<LuchadorDashboard />} />
        <Route path="/dashboard/booker" element={<BookerDashboard />} />
        
        {/* Perfil y otros */}
        <Route path="/perfil/:id" element={<PerfilLuchador />} />
        <Route path="/calendario" element={<CalendarioDisponibilidad />} />
      </Routes>
    </Router>
  );
}

export default App;
