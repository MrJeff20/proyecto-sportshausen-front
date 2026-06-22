import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';

const AgrupacionDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const currentUser = { displayName: 'Federación Nacional de Lucha' };

  return (
    <div className="min-h-screen bg-sportshausen-light">
      <Header userType="agrupacion" isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex min-h-screen pt-16">
        <SideNav active={activeTab} onSelect={(id) => setActiveTab(id)} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <main className="main-content flex-1 p-4 md:p-8 md:ml-64 transition-transform duration-300 ease-out overflow-y-auto">
          {activeTab === 'home' && (
            <div>
              <h1 className="text-4xl font-bold text-sportshausen-dark mb-4">Bienvenido, {currentUser.displayName}!</h1>
              
              <div className="flex gap-4 mb-8">
                <button onClick={() => navigate('/calendario-disponibilidad')} className="flex items-center gap-2 px-6 py-3 bg-sportshausen-red hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
                  <Calendar size={20} />
                  Calendario
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'Eventos Programados', value: '3' },
                  { label: 'Eventos Publicados', value: '12' },
                  { label: 'Calificación', value: '4.9' },
                  { label: 'Visualizaciones del último mes', value: '482' },
                ].map((stat, i) => (
                  <div key={i} className="card-shadow bg-white p-6 rounded-lg">
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-sportshausen-dark">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <div className="card-shadow bg-white p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-sportshausen-dark mb-4">Próximo Evento Programado</h2>
                  <p className="text-gray-700">FNL Doomsday, 23 de Mayo, 16:00 Hrs</p>
                  <div className="mt-4">
                    <button onClick={() => navigate('/not-found')} className="btn-subtle">Ver Más</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <div className="card-shadow bg-white p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-sportshausen-dark mb-6">Siguentes Eventos Programados</h2>
                  {[
                    { date: '6 Junio', event: 'Cerveza y Oro', loc: 'Santiago', group: 'FNL' },
                    { date: '18 Julio', event: 'Rivals', loc: 'Santiago', group: 'FNL' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                      <Calendar className="text-sportshausen-red" size={20} />
                      <div>
                        <p className="font-semibold">{item.group} — {item.event}</p>
                        <p className="text-sm text-gray-600">{item.date} • {item.loc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card-shadow bg-white p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-sportshausen-dark mb-6">Alerta de Ofertas</h2>
                  {[
                    { viewer: 'El Mágico', msg: 'ha postulado a tu oferta', time: 'Hace 2h' },
                    { viewer: 'Aníbal Trembo', msg: 'ha postulado a tu oferta', time: 'Hace 5h' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 pb-4 border-b border-gray-200 last:border-0">
                      <div className="w-10 h-10 bg-sportshausen-gold rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {item.viewer[0]}
                      </div>
                      <div>
                        <p className="font-semibold">{item.viewer}</p>
                        <p className="text-sm text-gray-600">{item.viewer} {item.msg}</p>
                        <p className="text-xs text-gray-500">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <div className="card-shadow bg-white p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-sportshausen-dark mb-4">Ofertas</h2>
                  <p className="text-gray-700">Revisa las postulaciones recibidas para tus ofertas.</p>
                  <div className="mt-4">
                    <button onClick={() => navigate('/not-found')} className="btn-primary">Ir a Ofertas</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h1 className="text-3xl font-bold text-sportshausen-dark mb-6">Perfil de Agrupación</h1>
              <div className="card-shadow bg-white p-6 rounded-lg space-y-4 max-w-xl">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre de la Federación</label>
                  <input defaultValue="Federación Nacional de Lucha" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ring-sporthausen-secondary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                  <input defaultValue="contacto@fnl.cl" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ring-sporthausen-secondary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Ciudad</label>
                  <input defaultValue="Santiago" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ring-sporthausen-secondary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
                  <textarea rows="3" defaultValue="Federación organizadora de eventos deportivos nacionales." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ring-sporthausen-secondary outline-none" />
                </div>
                <button className="btn-primary">Guardar Cambios</button>
              </div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div>
              <h1 className="text-3xl font-bold text-sportshausen-dark mb-6">Calendario de Eventos</h1>
              <div className="space-y-4">
                {[
                  { fecha: '23 Mayo', evento: 'FNL Doomsday', lugar: 'Santiago', luchadores: 8 },
                  { fecha: '6 Junio', evento: 'Cerveza y Oro', lugar: 'Santiago', luchadores: 6 },
                  { fecha: '18 Julio', evento: 'Rivals', lugar: 'Santiago', luchadores: 10 },
                ].map((ev, i) => (
                  <div key={i} className="card-shadow bg-white p-5 rounded-lg flex items-center justify-between">
                    <div className="flex gap-4 items-center">
                      <Calendar className="text-sportshausen-red" size={20} />
                      <div>
                        <p className="font-bold text-sportshausen-dark">{ev.evento}</p>
                        <p className="text-sm text-gray-500">{ev.fecha} · {ev.lugar}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">{ev.luchadores} luchadores</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <h1 className="text-3xl font-bold text-sportshausen-dark mb-6">Gestionar Eventos</h1>
              <div className="space-y-4">
                {[
                  { evento: 'FNL Doomsday', fecha: '23 Mayo', postulaciones: 12, estado: 'Abierto' },
                  { evento: 'Cerveza y Oro', fecha: '6 Junio', postulaciones: 5, estado: 'Borrador' },
                  { evento: 'Rivals', fecha: '18 Julio', postulaciones: 0, estado: 'Borrador' },
                ].map((ev, i) => (
                  <div key={i} className="card-shadow bg-white p-5 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sportshausen-dark">{ev.evento}</p>
                      <p className="text-sm text-gray-500">{ev.fecha} · {ev.postulaciones} postulaciones</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ev.estado === 'Abierto' ? 'badge-yellow' : 'badge-outline'}`}>
                        {ev.estado}
                      </span>
                      <button className="text-sm text-sportshausen-red font-semibold hover:underline">Editar</button>
                    </div>
                  </div>
                ))}
                <button className="btn-primary mt-2">+ Crear Nuevo Evento</button>
              </div>
            </div>
          )}

          {activeTab === 'offers' && (
            <div>
              <h1 className="text-3xl font-bold text-sportshausen-dark mb-6">Postulaciones Recibidas</h1>
              <div className="space-y-4">
                {[
                  { luchador: 'El Mágico', evento: 'FNL Doomsday', fecha: 'Hace 2h', estado: 'Nueva' },
                  { luchador: 'Aníbal Trembo', evento: 'FNL Doomsday', fecha: 'Hace 5h', estado: 'Nueva' },
                  { luchador: 'Phoenix', evento: 'Cerveza y Oro', fecha: 'Ayer', estado: 'Revisada' },
                ].map((p, i) => (
                  <div key={i} className="card-shadow bg-white p-5 rounded-lg flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sportshausen-dark">{p.luchador}</p>
                      <p className="text-sm text-gray-500">{p.evento} · {p.fecha}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.estado === 'Nueva' ? 'badge-red' : 'badge-outline'}`}>
                        {p.estado}
                      </span>
                      <button className="btn-primary text-xs px-3 py-1">Ver Perfil</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div>
              <h1 className="text-3xl font-bold text-sportshausen-dark mb-4">Mensajes</h1>
              <div className="card-shadow bg-white p-6 rounded-lg text-center">
                <p className="text-gray-600 mb-4">Accede a tu bandeja de mensajes.</p>
                <a href="/mensajeria" className="btn-primary inline-block">Ir a Mensajería</a>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h1 className="text-3xl font-bold text-sportshausen-dark mb-6">Notificaciones</h1>
              <div className="space-y-3">
                {[
                  { msg: 'El Mágico postuló a FNL Doomsday', time: 'Hace 2h' },
                  { msg: 'Aníbal Trembo postuló a FNL Doomsday', time: 'Hace 5h' },
                  { msg: 'Tu evento "Cerveza y Oro" fue publicado', time: 'Ayer' },
                ].map((n, i) => (
                  <div key={i} className="card-shadow bg-white p-4 rounded-lg flex gap-3 items-center">
                    <div className="w-2 h-2 rounded-full bg-sportshausen-red flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-sportshausen-dark">{n.msg}</p>
                      <p className="text-xs text-gray-500">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        {/* right panel removed to make main full width */}
      </div>
      <Footer />
    </div>
  );
};

export default AgrupacionDashboard;
