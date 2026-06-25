import React, { useState, useEffect } from 'react';
import { Bell, Eye, Briefcase, Calendar, MessageCircle, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';

const iconMap = { vista: Eye, oferta: Briefcase, evento: Calendar, mensaje: MessageCircle, sistema: CheckCircle };
const colorMap = { vista: 'bg-sportshausen-gold', oferta: 'bg-sportshausen-red', evento: 'bg-sportshausen-dark', mensaje: 'bg-sportshausen-red', sistema: 'bg-gray-400' };

const STORAGE_KEY = 'sportshausen_notifs';

const defaultNotifs = [
  { id: 1, tipo: 'vista', titulo: 'FNL vio tu perfil', desc: 'La Federación Nacional de Lucha revisó tu perfil completo.', time: 'Hace 2h', leida: false },
  { id: 2, tipo: 'oferta', titulo: 'Nueva oferta de WKC', desc: 'World Kombat Championship publicó una oferta que coincide con tu perfil.', time: 'Hace 4h', leida: false },
  { id: 3, tipo: 'evento', titulo: 'Evento confirmado', desc: 'Tu participación en FNL Doomsday el 23 de Mayo fue confirmada.', time: 'Ayer', leida: false },
  { id: 4, tipo: 'mensaje', titulo: 'Nuevo mensaje de Booker Carlos', desc: 'Te envió una propuesta de contrato para el Show Julio.', time: 'Ayer', leida: true },
  { id: 5, tipo: 'vista', titulo: 'Agrupación Elite vio tu perfil', desc: 'Revisaron tu historial y calificaciones.', time: 'Hace 2 días', leida: true },
  { id: 6, tipo: 'sistema', titulo: 'Perfil verificado', desc: 'Tu perfil ha sido verificado exitosamente por el equipo de SportsHausen.', time: 'Hace 3 días', leida: true },
];

const loadNotifs = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultNotifs;
  } catch {
    return defaultNotifs;
  }
};

const saveNotifs = (notifs) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(notifs)); } catch {}
};

const Notificaciones = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifs, setNotifs] = useState(loadNotifs);

  const update = (next) => {
    setNotifs(next);
    saveNotifs(next);
    // Actualizar badge en Header
    const noLeidas = next.filter(n => !n.leida).length;
    localStorage.setItem('sportshausen_notifs_unread', String(noLeidas));
    window.dispatchEvent(new Event('notifs-updated'));
  };

  const marcarTodas = () => update(notifs.map(n => ({ ...n, leida: true })));
  const marcarLeida = (id) => update(notifs.map(n => n.id === id ? { ...n, leida: true } : n));
  const noLeidas = notifs.filter(n => !n.leida).length;

  return (
    <div className="min-h-screen bg-sportshausen-light">
      <Header userType="luchador" isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex pt-16 min-h-screen">
        <SideNav active="notifications" onSelect={() => {}} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <main className="flex-1 md:ml-64 px-4 sm:px-6 lg:px-8 py-10 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-display font-black text-sportshausen-dark mb-2">Notificaciones</h1>
              <p className="text-gray-600">{noLeidas > 0 ? `${noLeidas} sin leer` : 'Todo al día'}</p>
            </div>
            {noLeidas > 0 && (
              <button onClick={marcarTodas} className="btn-outline text-sm px-4 py-2">Marcar todas como leídas</button>
            )}
          </div>

          <div className="space-y-3 max-w-2xl">
            {notifs.map(n => {
              const Icon = iconMap[n.tipo] || Bell;
              return (
                <div
                  key={n.id}
                  onClick={() => marcarLeida(n.id)}
                  className={`bg-white rounded-2xl p-5 card-shadow flex gap-4 items-start cursor-pointer transition-all hover:shadow-md ${!n.leida ? 'border-l-4 border-sportshausen-red' : ''}`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${colorMap[n.tipo]}`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`font-bold text-sportshausen-dark text-sm ${!n.leida ? '' : 'font-semibold'}`}>{n.titulo}</p>
                      {!n.leida && <span className="w-2 h-2 bg-sportshausen-red rounded-full flex-shrink-0 mt-1.5" />}
                    </div>
                    <p className="text-sm text-gray-600 mt-0.5">{n.desc}</p>
                    <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Notificaciones;
