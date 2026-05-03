import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }
    // Credenciales forzadas para entorno de prueba
    const validEmail = 'test@test.com';
    const validPassword = '123456abc';
    if (email === validEmail && password === validPassword) {
      localStorage.setItem('authenticated', 'true');
      localStorage.setItem('userType', 'luchador');
      // For testing, set a user id
      localStorage.setItem('userId', '1');
      setError('');
      // ensure navigation occurs after storage update
      navigate('/dashboard/luchador', { replace: true });
      // fallback: force full reload to the dashboard if SPA navigation fails
      try { window.location.replace('/dashboard/luchador'); } catch (e) {}
    } else {
      setError('Credenciales inválidas. Usa test@test.com / 123456abc');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header userType="guest" />

      <div className="flex items-center justify-center min-h-[calc(100vh-64px)] py-12 px-4 pt-24">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Link to="/" className="inline-flex items-center gap-2 text-sportshausen-red hover:text-red-700 font-semibold mb-8 transition-colors">
            <ArrowLeft size={20} />
            Volver
          </Link>

          {/* Card */}
          <div className="card-shadow bg-white rounded-2xl p-8 md:p-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-sportshausen-red to-red-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                <LogIn size={32} className="text-white" />
              </div>
              <h1 className="text-3xl font-display font-bold text-sportshausen-dark mb-2">
                Ingresar
              </h1>
              <p className="text-gray-600">
                Accede a tu cuenta de SportsHausen
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-sportshausen-dark mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ring-sportshausen-red outline-none transition-all"
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-sportshausen-dark mb-2">
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tu contraseña"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ring-sportshausen-red outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-sportshausen-red transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  <span className="text-gray-600">Recuérdame</span>
                </label>
                <a href="#" className="text-sportshausen-red hover:text-red-700 font-semibold transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full btn-primary py-3 text-lg font-bold mt-6"
              >
                Ingresar
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">O</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                <span>🔵</span>
                <span>Ingresar con Google</span>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600">
                ¿No tienes cuenta?
                <Link to="/signup" className="ml-2 text-sportshausen-red hover:text-red-700 font-semibold transition-colors">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>

          {/* Features Highlight */}
          <div className="mt-12 grid grid-cols-2 gap-4">
            <div className="text-center p-4">
              <div className="text-3xl mb-2">✅</div>
              <p className="text-sm text-gray-600 font-semibold">Acceso Instantáneo</p>
            </div>
            <div className="text-center p-4">
              <div className="text-3xl mb-2">🔒</div>
              <p className="text-sm text-gray-600 font-semibold">100% Seguro</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;

