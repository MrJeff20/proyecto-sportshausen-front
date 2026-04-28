import React, { useState } from 'react';
import { Calendar, MessageSquare, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const LuchadorDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-sportshausen-light">
      <Header userType="luchador" />
      <div className="flex h-screen pt-16">
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:block p-6 space-y-2">
          {[
            { id: 'home', label: 'Dashboard', icon: '📊' },
            { id: 'profile', label: 'Mi Perfil', icon: '👤' },
            { id: 'calendar', label: 'Mi Calendario', icon: '📅' },
            { id: 'messages', label: 'Mensajes', icon: '💬' },
            { id: 'ratings', label: 'Calificaciones', icon: '⭐' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg font-semibold ${
                activeTab === item.id ? 'bg-sportshausen-red text-white' : 'hover:bg-gray-100'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </aside>

        <main className="flex-1 overflow-auto p-8">
          {activeTab === 'home' && (
            <div>
              <h1 className="text-4xl font-bold text-sportshausen-dark mb-8">¡Bienvenido, Phoenix!</h1>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'Próximos Eventos', value: '3' },
                  { label: 'Mensajes Nuevos', value: '5' },
                  { label: 'Calificación', value: '4.8' },
                  { label: 'Visualizaciones', value: '156' },
                ].map((stat, i) => (
                  <div key={i} className="card-shadow bg-white p-6 rounded-lg">
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-sportshausen-dark">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card-shadow bg-white p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-sportshausen-dark mb-6">Próximas Fechas</h2>
                  {[
                    { date: '15 Mayo', event: 'Combate Regional', loc: 'Santiago' },
                    { date: '22 Mayo', event: 'Lucha Especial', loc: 'Valparaíso' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 pb-4 border-b border-gray-200 last:border-0">
                      <Calendar className="text-sportshausen-red" size={20} />
                      <div>
                        <p className="font-semibold">{item.event}</p>
                        <p className="text-sm text-gray-600">{item.date} • {item.loc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="card-shadow bg-white p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-sportshausen-dark mb-6">Últimos Mensajes</h2>
                  {[
                    { booker: 'Agrupación Elite', msg: 'Te interesa evento?', time: 'Hace 2h' },
                    { booker: 'Carlos Eventos', msg: 'Vimos tu perfil', time: 'Hace 5h' },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 pb-4 border-b border-gray-200 last:border-0">
                      <div className="w-10 h-10 bg-sportshausen-gold rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {item.booker[0]}
                      </div>
                      <div>
                        <p className="font-semibold">{item.booker}</p>
                        <p className="text-sm text-gray-600">{item.msg}</p>
                        <p className="text-xs text-gray-500">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default LuchadorDashboard;
