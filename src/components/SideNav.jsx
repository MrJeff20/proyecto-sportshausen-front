import React from 'react';
import { useNavigate } from 'react-router-dom';

const SideNav = ({ active, onSelect, isOpen = false, setIsOpen }) => {
  const authed = typeof window !== 'undefined' && localStorage.getItem('authenticated') === 'true';
  if (!authed) return null;
  const navigate = useNavigate();
  const userType = typeof window !== 'undefined' ? localStorage.getItem('userType') : null;
  const items = [
    { id: 'home', label: 'Inicio', icon: '🏠' },
    { id: 'profile', label: 'Mi perfil', icon: '👤' },
    { id: 'calendar', label: 'Calendario', icon: '📅' },
    { id: 'events', label: 'Eventos', icon: '📌' },
    { id: 'offers', label: 'Ofertas', icon: '💼' },
    { id: 'messages', label: 'Mensajes', icon: '💬' },
    { id: 'notifications', label: 'Notificaciones', icon: '🔔' },
  ];

  const handleClick = (id) => {
    const routes = {
      home:          userType === 'luchador' ? '/panel/luchador'
                   : userType === 'booker'   ? '/dashboard/booker'
                   : '/dashboard/agrupacion',
      profile:       `/perfil/${localStorage.getItem('userId') || '1'}`,
      calendar:      '/calendario-disponibilidad',
      events:        '/mis-eventos',
      offers:        '/ofertas',
      messages:      '/mensajeria',
      notifications: '/notificaciones',
    };
    if (routes[id]) {
      navigate(routes[id]);
    } else if (onSelect) {
      onSelect(id);
    }
  };

  const NavItem = ({ item, onClick }) => (
    <button
      onClick={() => onClick(item.id)}
      className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors ${
        active === item.id
          ? 'bg-sportshausen-red text-white'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      <span className="mr-2">{item.icon}</span>
      {item.label}
    </button>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <nav className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 p-4 hidden md:block z-40 overflow-y-auto">
        <div className="space-y-1">
          {items.map(item => (
            <NavItem key={item.id} item={item} onClick={handleClick} />
          ))}
        </div>
      </nav>

      {/* Mobile drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => setIsOpen && setIsOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-white p-4 shadow-xl overflow-y-auto">
            <div className="pt-4 space-y-1">
              {items.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    handleClick(item.id);
                    setIsOpen && setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors ${
                    active === item.id
                      ? 'bg-sportshausen-red text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideNav;
