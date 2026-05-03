import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import LuchadorDashboard from './pages/LuchadorDashboard';
import PerfilLuchador from './pages/PerfilLuchador';
import NotFound from './pages/NotFound';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Only allow luchador dashboard and simple landing page. Other routes redirect home. */}
        <Route path="/dashboard/luchador" element={
          localStorage.getItem('authenticated') === 'true' ? <LuchadorDashboard /> : <Navigate to="/login" />
        } />
        <Route path="/perfil/:id" element={
          localStorage.getItem('authenticated') === 'true' ? <PerfilLuchador /> : <Navigate to="/login" />
        } />
        <Route path="/not-found" element={<NotFound />} />
        {/* Catch-all: redirect to landing */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
