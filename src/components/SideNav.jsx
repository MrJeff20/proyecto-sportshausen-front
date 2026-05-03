import React from 'react';
import { Link } from 'react-router-dom';

const SideNav = ({ active, onSelect, isOpen = false, setIsOpen }) => {
  // Temporary global hide flag: set to true to completely hide the navbar and its contents.
  const HIDE_NAVBAR = true;
  if (HIDE_NAVBAR) return null;
  const items = [
    { id: 'profile', label: 'Mi perfil', icon: '👤', to: '/perfil/1' },
    { id: 'calendar', label: 'Calendario', icon: '📅', to: '/calendario' },
    { id: 'events', label: 'Eventos', icon: '📌', to: '/events' },
    { id: 'offers', label: 'Ofertas', icon: '💼', to: '/offers' },
    { id: 'notifications', label: 'Notificaciones', icon: '🔔', to: '/notifications' },
  ];

  return (
    <>
      {/* Desktop / large screens */}
      <nav className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 p-6 hidden md:block z-40">
        <div className="space-y-3">
          {items.map(item => (
            <Link
              key={item.id}
              to={item.to}
              onClick={() => onSelect && onSelect(item.id)}
              className={`block px-4 py-3 rounded-lg font-semibold ${active === item.id ? 'bg-sportshausen-red text-white' : 'text-gray-700 hover:bg-gray-50'}`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black opacity-30" onClick={() => setIsOpen && setIsOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white p-6 shadow-lg overflow-auto">
            <div className="space-y-3">
              {items.map(item => (
                <Link
                  key={item.id}
                  to={item.to}
                  onClick={() => { onSelect && onSelect(item.id); setIsOpen && setIsOpen(false); }}
                  className={`block px-4 py-3 rounded-lg font-semibold ${active === item.id ? 'bg-sportshausen-red text-white' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideNav;
