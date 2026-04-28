import React, { useState } from 'react';
import { Eye, EyeOff, ArrowLeft, UserPlus, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const SignupPage = () => {
  const [userType, setUserType] = useState('luchador'); // 'luchador' o 'booker'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor completa todos los campos');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (!formData.terms) {
      setError('Debes aceptar los términos y condiciones');
      return;
    }

    // Aquí iría la lógica real de registro
    localStorage.setItem('userType', userType);
    navigate(userType === 'luchador' ? '/feed/luchador' : '/feed/booker');
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
                <UserPlus size={32} className="text-white" />
              </div>
              <h1 className="text-3xl font-display font-bold text-sportshausen-dark mb-2">
                Regístrate
              </h1>
              <p className="text-gray-600">
                Únete a SportsHausen hoy mismo
              </p>
            </div>

            {/* User Type Selection */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                onClick={() => setUserType('luchador')}
                className={`p-4 rounded-lg border-2 transition-all font-semibold ${
                  userType === 'luchador'
                    ? 'border-sportshausen-red bg-red-50 text-sportshausen-red'
                    : 'border-gray-200 text-gray-600 hover:border-sportshausen-red'
                }`}
              >
                🥋 Soy Luchador
              </button>
              <button
                onClick={() => setUserType('booker')}
                className={`p-4 rounded-lg border-2 transition-all font-semibold ${
                  userType === 'booker'
                    ? 'border-sportshausen-red bg-red-50 text-sportshausen-red'
                    : 'border-gray-200 text-gray-600 hover:border-sportshausen-red'
                }`}
              >
                📋 Soy Booker
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSignup} className="space-y-5">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-semibold text-sportshausen-dark mb-2">
                  {userType === 'luchador' ? 'Nombre Artístico' : 'Nombre de Agrupación'}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={userType === 'luchador' ? 'Tu alias...' : 'Nombre de tu agrupación...'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ring-sportshausen-red outline-none transition-all"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-sportshausen-dark mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
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
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
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

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-sportshausen-dark mb-2">
                  Confirmar Contraseña
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirma tu contraseña"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ring-sportshausen-red outline-none transition-all"
                />
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleInputChange}
                  className="w-5 h-5 rounded border-gray-300 mt-1"
                />
                <span className="text-sm text-gray-600">
                  Acepto los <a href="#" className="text-sportshausen-red hover:underline font-semibold">Términos y Condiciones</a> y la <a href="#" className="text-sportshausen-red hover:underline font-semibold">Política de Privacidad</a>
                </span>
              </label>

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
                Crear Cuenta
              </button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-8 pt-8 border-t border-gray-200">
              <p className="text-gray-600">
                ¿Ya tienes cuenta?
                <Link to="/login" className="ml-2 text-sportshausen-red hover:text-red-700 font-semibold transition-colors">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-12 space-y-3">
            <div className="flex items-center gap-3">
              <Check size={20} className="text-green-500 flex-shrink-0" />
              <span className="text-sm text-gray-600">Acceso inmediato a la plataforma</span>
            </div>
            <div className="flex items-center gap-3">
              <Check size={20} className="text-green-500 flex-shrink-0" />
              <span className="text-sm text-gray-600">Perfil verificado y profesional</span>
            </div>
            <div className="flex items-center gap-3">
              <Check size={20} className="text-green-500 flex-shrink-0" />
              <span className="text-sm text-gray-600">Conecta con tu comunidad deportiva</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignupPage;

