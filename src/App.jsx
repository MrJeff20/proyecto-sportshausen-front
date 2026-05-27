import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LuchadorDashboard from './pages/LuchadorDashboard';
import BookerDashboard from './pages/BookerDashboard';
import AgrupacionDashboard from './pages/AgrupacionDashboard';
import PanelDeLuchador from './pages/PanelDeLuchador';
import PerfilLuchador from './pages/PerfilLuchador';
import { CalendarioDisponibilidad } from './pages/CalendarioDisponibilidad';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas Públicas - Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Rutas de Autenticación - Solo accesibles sin autenticar */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />

        {/* Rutas de Dashboard - Protegidas, accesibles solo autenticados */}
        <Route
          path="/dashboard/luchador"
          element={
            <ProtectedRoute requiredRole="luchador">
              <LuchadorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/booker"
          element={
            <ProtectedRoute requiredRole="booker">
              <BookerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/agrupacion"
          element={
            <ProtectedRoute requiredRole="agrupacion">
              <AgrupacionDashboard />
            </ProtectedRoute>
          }
        />

        {/* Rutas del Panel - Protegidas para luchadores */}
        <Route
          path="/panel/luchador"
          element={
            <ProtectedRoute requiredRole="luchador">
              <PanelDeLuchador />
            </ProtectedRoute>
          }
        />

        {/* Ruta de Perfil - Protegida */}
        <Route
          path="/perfil/:id"
          element={
            <ProtectedRoute>
              <PerfilLuchador />
            </ProtectedRoute>
          }
        />

        {/* Ruta de Calendario - Protegida */}
        <Route
          path="/calendario-disponibilidad"
          element={
            <ProtectedRoute>
              <CalendarioDisponibilidad />
            </ProtectedRoute>
          }
        />

        {/* Páginas especiales */}
        <Route path="/not-found" element={<NotFound />} />

        {/* Redirecciones por rutas inválidas */}
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
