import React, { useState, useEffect } from 'react';
import { Menu, X, Bell, LogOut, LogIn, Home, Search, MessageCircle, Users, Briefcase } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import SideNav from './SideNav';

export const Header = ({ userType = 'guest', isOpen: propIsOpen, setIsOpen: propSetIsOpen, onLogout = () => {} }) => {
  const navigate = useNavigate();
  const [internalOpen, setInternalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [leftMenuOpen, setLeftMenuOpen] = useState(false);
  const location = useLocation();
  const authed = typeof window !== 'undefined' && localStorage.getItem('authenticated') === 'true';
  // Show left drawer for authenticated users on app pages, but hide on landing and login
  const showLeftDrawer = authed && !['/', '/login'].includes(location.pathname);
  const userId = typeof window !== 'undefined' ? (localStorage.getItem('userId') || '1') : '1';
  const menuItems = [
    { label: 'Perfil', to: `/perfil/${userId}` },
    { label: 'Dashboard', to: '/dashboard/luchador' },
    { label: 'Calendario', to: null },
    { label: 'Eventos', to: null },
    { label: 'Ofertas', to: null },
  ];

  useEffect(() => {
    try {
      if (leftMenuOpen) document.body.classList.add('left-drawer-open');
      else document.body.classList.remove('left-drawer-open');
    } catch (e) {}
    return () => { try { document.body.classList.remove('left-drawer-open'); } catch(e){} };
  }, [leftMenuOpen]);

  useEffect(() => {
    if (!showLeftDrawer) setLeftMenuOpen(false);
  }, [showLeftDrawer]);

  // Determine whether parent provided controlled props
  const isControlled = typeof propSetIsOpen === 'function';
  const isOpen = isControlled ? !!propIsOpen : internalOpen;
  const setIsOpen = isControlled ? propSetIsOpen : setInternalOpen;

  return (
    <>
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Menu button moved before logo to match requested order */}
          <div className="flex items-center gap-3">
            {showLeftDrawer && (
              <div className="relative">
                <button onClick={() => setLeftMenuOpen(!leftMenuOpen)} className="hidden md:flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors">
                  <Menu size={16} />
                </button>
                <div className={`hidden md:block fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white rounded-r-md shadow-lg border border-gray-100 w-64 z-40 transform transition-transform duration-300 ease-out ${leftMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}>
                  <div className="p-4">
                    {menuItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          setLeftMenuOpen(false);
                          navigate(item.to ? item.to : '/not-found');
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors md:hidden">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <button onClick={() => {
              try {
                const authed = localStorage.getItem('authenticated') === 'true';
                const userTypeStored = localStorage.getItem('userType');
                if (authed) {
                  if (userTypeStored === 'luchador') navigate('/dashboard/luchador');
                  else navigate('/dashboard');
                } else {
                  navigate('/');
                }
              } catch (e) { navigate('/'); }
            }} className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-br from-sportshausen-red to-red-700 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-black text-lg">S</span>
              </div>
              <span className="hidden sm:block text-xl font-bold text-sportshausen-dark font-display">
                SportsHausen
              </span>
            </button>
          </div>

          {/* Desktop Navigation - Centro: show minimal controls for authenticated users */}
          {userType !== 'guest' && (
            <div className="hidden md:flex items-center gap-4 flex-1 mx-8">
              <div className="flex-1"></div>
            </div>
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
                  className="flex items-center gap-2 px-6 py-2.5 btn-subtle rounded-full font-semibold group text-sm"
                >
                  <LogIn size={18} className="group-hover:translate-x-1 transition-transform" />
                  <span className="hidden sm:inline">Ingresar</span>
                </Link>
                <button
                  onClick={() => navigate('/signup')}
                  className="hidden sm:flex items-center gap-2 px-6 py-2.5 btn-subtle rounded-full font-semibold text-sm"
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
                <div className="hidden md:flex items-center gap-3 pl-4 border-l border-gray-200 relative">
                  <button onClick={() => setMenuOpen(!menuOpen)} className="w-9 h-9 bg-gradient-to-br from-sportshausen-gold to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:ring-2 ring-sportshausen-red transition-all">
                    U
                  </button>
                  {/* Dropdown menu */}
                  {menuOpen && (
                    <div className="absolute right-0 mt-12 w-48 bg-white rounded-md shadow-lg border border-gray-100 z-50">
                      <button onClick={() => { setMenuOpen(false); navigate('/dashboard/luchador'); }} className="w-full text-left px-4 py-2 hover:bg-gray-50">Mi Perfil</button>
                      <button onClick={() => { setMenuOpen(false); navigate('/settings'); }} className="w-full text-left px-4 py-2 hover:bg-gray-50">Ajustes</button>
                      <div className="border-t border-gray-100" />
                      <button onClick={() => { setMenuOpen(false); onLogout(); }} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50">Cerrar sesión</button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* single mobile menu button is placed before the logo to avoid duplicates */}
          </div>
        </div>

        {/* Mobile Navigation for guest only: keep header mobile links when guest */}
        {userType === 'guest' && isOpen && (
          <div className="md:hidden pb-4 space-y-2 bg-gray-50">
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
          </div>
        )}
      </div>
    </header>
    {/* Render mobile drawer only when Header manages its own state (avoid duplicates) */}
    {!isControlled && <SideNav isOpen={isOpen} setIsOpen={setIsOpen} />}
    </>
  );
};

export default Header;