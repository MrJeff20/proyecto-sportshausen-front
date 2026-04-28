import React from 'react';
import { Menu, X, Bell, LogOut, LogIn, Home, Search, MessageCircle, Users, Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Header = ({ userType = 'guest', isOpen = false, setIsOpen = () => {}, onLogout = () => {} }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-sportshausen-red to-red-700 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white font-black text-lg">S</span>
            </div>
            <span className="hidden sm:block text-xl font-bold text-sportshausen-dark font-display">
              SportsHausen
            </span>
          </Link>

          {/* Desktop Navigation - Centro */}
          {userType !== 'guest' && (
            <nav className="hidden md:flex items-center gap-8 flex-1 mx-8">
              <Link to="/feed/luchador" className="flex items-center gap-2 text-gray-600 hover:text-sportshausen-red transition-colors font-medium text-sm">
                <Home size={18} />
                <span>Inicio</span>
              </Link>
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-sportshausen-red transition-colors font-medium text-sm">
                <Users size={18} />
                <span>Mi Red</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-sportshausen-red transition-colors font-medium text-sm">
                <Briefcase size={18} />
                <span>Oportunidades</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-sportshausen-red transition-colors font-medium text-sm">
                <MessageCircle size={18} />
                <span>Mensajería</span>
              </a>
            </nav>
          )}

          {/* Desktop Navigation - Guest */}
          {userType === 'guest' && (
            <nav className="hidden md:flex items-center gap-8">
              <a href="/" className="text-sportshausen-text hover:text-sportshausen-red transition-colors font-medium">
                Inicio
              </a>
              <a href="#features" className="text-sportshausen-text hover:text-sportshausen-red transition-colors font-medium">
                Características
              </a>
              <a href="#" className="text-sportshausen-text hover:text-sportshausen-red transition-colors font-medium">
                Sobre Nosotros
              </a>
            </nav>
          )}

          {/* Right side icons/buttons */}
          <div className="flex items-center gap-2 md:gap-4">
            {userType === 'guest' && (
              <>
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-6 py-2.5 text-sportshausen-red border-2 border-sportshausen-red rounded-full font-semibold hover:bg-red-50 transition-all group text-sm"
                >
                  <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                  <span className="hidden sm:inline">Ingresar</span>
                </Link>
                <button
                  onClick={() => navigate('/signup')}
                  className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-sportshausen-red text-white rounded-full font-semibold hover:bg-red-700 transition-all shadow-md text-sm"
                >
                  Registrarse
                </button>
              </>
            )}

            {userType !== 'guest' && (
              <>
                <button className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <Search size={18} />
                </button>
                <button className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors relative">
                  <Bell size={18} />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="hidden md:flex items-center gap-3 pl-4 border-l border-gray-200">
                  <div className="w-9 h-9 bg-gradient-to-br from-sportshausen-gold to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:ring-2 ring-sportshausen-red transition-all">
                    U
                  </div>
                  <button onClick={onLogout} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors" title="Cerrar sesión">
                    <LogOut size={18} />
                  </button>
                </div>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 bg-gray-50">
            {userType === 'guest' && (
              <>
                <a href="/" className="block px-4 py-2 text-sportshausen-text hover:bg-gray-100 rounded-lg">
                  Inicio
                </a>
                <a href="#features" className="block px-4 py-2 text-sportshausen-text hover:bg-gray-100 rounded-lg">
                  Características
                </a>
                <div className="pt-4 space-y-2 border-t border-gray-200">
                  <Link to="/login" className="block px-4 py-2 text-sportshausen-red font-semibold text-center border border-sportshausen-red rounded-lg">
                    Ingresar
                  </Link>
                  <Link to="/signup" className="block px-4 py-2 bg-sportshausen-red text-white font-semibold text-center rounded-lg">
                    Registrarse
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;