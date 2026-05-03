import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';

const LuchadorDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const currentUser = { displayName: 'Blake Parker' };

  return (
    <div className="min-h-screen bg-sportshausen-light">
      <Header userType="luchador" isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex min-h-screen pt-16">
        <SideNav active={activeTab} onSelect={(id) => setActiveTab(id)} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <main className="main-content flex-1 p-8 transition-transform duration-300 ease-out">
          {activeTab === 'home' && (
            <div>
              <h1 className="text-4xl font-bold text-sportshausen-dark mb-8">¡Bienvenido, {currentUser.displayName}!</h1>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'Eventos Programados', value: '3' },
                  { label: 'Eventos Participados', value: '20' },
                  { label: 'Calificación', value: '4.8' },
                  { label: 'Visualizaciones del último mes', value: '156' },
                ].map((stat, i) => (
                  <div key={i} className="card-shadow bg-white p-6 rounded-lg">
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-sportshausen-dark">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <div className="card-shadow bg-white p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-sportshausen-dark mb-4">Próxima Aparición</h2>
                  <p className="text-gray-700">FNL Doomsday, 23 de Mayo, 14:00 Hrs</p>
                  <div className="mt-4">
                    <button onClick={() => navigate('/not-found')} className="btn-subtle">Ver Más</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <div className="card-shadow bg-white p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-sportshausen-dark mb-6">Más Fechas</h2>
                  {[
                    { date: '30 Mayo', event: 'Batalla Nocturna', loc: 'Santiago', group: '5 Luchas Clandestino' },
                    { date: '12 Junio', event: 'WKC Showdown', loc: 'Valparaíso', group: 'WKC' },
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
                  <h2 className="text-2xl font-bold text-sportshausen-dark mb-6">Visualizaciones</h2>
                  {[
                    { viewer: 'FNL', msg: 'ha visto tu perfil', time: 'Hace 2h' },
                    { viewer: 'WKC', msg: 'ha visto tu perfil', time: 'Hace 5h' },
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
                  <p className="text-gray-700">Mira las últimas ofertas que han aparecido en el portal</p>
                  <div className="mt-4">
                    <button onClick={() => navigate('/not-found')} className="btn-primary">Ir a Ofertas</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h1 className="text-3xl font-bold text-sportshausen-dark mb-4">Bienvenido de vuelta, {currentUser.displayName}</h1>
              <p className="text-gray-600 mb-6">Accede a tu perfil completo, edítalo y gestiona tu presencia profesional.</p>
              <div className="card-shadow bg-white p-6 rounded-lg">Contenido del perfil (usa la página de Perfil para más detalle)</div>
            </div>
          )}

          {activeTab === 'calendar' && (
            <div>
              <h1 className="text-3xl font-bold text-sportshausen-dark mb-4">Calendario</h1>
              <div className="card-shadow bg-white p-6 rounded-lg">Calendario y disponibilidad</div>
            </div>
          )}

          {activeTab === 'events' && (
            <div>
              <h1 className="text-3xl font-bold text-sportshausen-dark mb-4">Eventos</h1>
              <div className="card-shadow bg-white p-6 rounded-lg">Tus próximos eventos y propuestas</div>
            </div>
          )}

          {activeTab === 'offers' && (
            <div>
              <h1 className="text-3xl font-bold text-sportshausen-dark mb-4">Ofertas</h1>
              <div className="card-shadow bg-white p-6 rounded-lg">Ofertas laborales y contrataciones</div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h1 className="text-3xl font-bold text-sportshausen-dark mb-4">Notificaciones</h1>
              <div className="card-shadow bg-white p-6 rounded-lg">Novedades y alertas</div>
            </div>
          )}
        </main>

        {/* right panel removed to make main full width */}
      </div>
      <Footer />
    </div>
  );
};

export default LuchadorDashboard;
