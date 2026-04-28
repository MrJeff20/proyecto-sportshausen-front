import React, { useState } from 'react';
import { Search, LogOut, Heart, Star, MapPin } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const BookerDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [searchFilters, setSearchFilters] = useState({
    city: '',
    experience: '',
    weight: '',
  });

  const luchadores = [
    { id: 1, nombre: 'Phoenix', ciudad: 'Santiago', exp: 8, rating: 4.8, img: '🔥' },
    { id: 2, nombre: 'Titán', ciudad: 'Valparaíso', exp: 5, rating: 4.5, img: '💪' },
    { id: 3, nombre: 'Rayo', ciudad: 'Concepción', exp: 6, rating: 4.7, img: '⚡' },
    { id: 4, nombre: 'Dragón', ciudad: 'Santiago', exp: 10, rating: 4.9, img: '🐉' },
    { id: 5, nombre: 'Sombra', ciudad: 'Valparaíso', exp: 4, rating: 4.6, img: '👻' },
    { id: 6, nombre: 'León', ciudad: 'Santiago', exp: 7, rating: 4.8, img: '🦁' },
  ];

  const sidebarItems = [
    { id: 'home', label: 'Dashboard', icon: '📊' },
    { id: 'search', label: 'Buscar Talento', icon: '🔍' },
    { id: 'messages', label: 'Mis Mensajes', icon: '💬' },
    { id: 'contracts', label: 'Órdenes de Contratación', icon: '📋' },
    { id: 'profile', label: 'Mi Perfil', icon: '👤' },
  ];

  return (
    <div className="min-h-screen bg-sportshausen-light">
      <Header userType="booker" />

      <div className="flex h-screen pt-16">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:block p-6 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-lg font-semibold transition-colors ${
                activeTab === item.id ? 'bg-sportshausen-red text-white' : 'hover:bg-gray-100'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
          <button className="w-full text-left px-4 py-3 rounded-lg font-semibold text-red-600 hover:bg-red-50 transition-colors mt-8 flex items-center gap-2">
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-8">
          {activeTab === 'home' && (
            <div>
              <h1 className="text-4xl font-bold text-sportshausen-dark mb-2">Descubre Nuevo Talento</h1>
              <p className="text-gray-600 mb-8">Estos son los luchadores destacados esta semana</p>

              {/* Featured Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {luchadores.slice(0, 3).map((luchador) => (
                  <div key={luchador.id} className="card-shadow bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="bg-gradient-to-r from-sportshausen-red to-sportshausen-gold h-32 flex items-center justify-center text-6xl">
                      {luchador.img}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-sportshausen-dark mb-2">{luchador.nombre}</h3>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < Math.floor(luchador.rating) ? 'fill-sportshausen-gold text-sportshausen-gold' : 'text-gray-300'}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2">{luchador.rating}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                        <MapPin size={16} className="text-sportshausen-red" />
                        {luchador.ciudad}
                      </p>
                      <button className="w-full btn-primary text-sm">Ver Perfil</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'search' && (
            <div>
              <h1 className="text-4xl font-bold text-sportshausen-dark mb-8">Buscar Talento</h1>

              {/* Filters */}
              <div className="card-shadow bg-white rounded-lg p-6 mb-8">
                <h2 className="text-xl font-bold text-sportshausen-dark mb-4">Filtros Avanzados</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-sportshausen-dark mb-2">
                      Ciudad
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ring-sportshausen-red outline-none">
                      <option>Todas</option>
                      <option>Santiago</option>
                      <option>Valparaíso</option>
                      <option>Concepción</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-sportshausen-dark mb-2">
                      Años de Experiencia
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ring-sportshausen-red outline-none">
                      <option>Cualquiera</option>
                      <option>0-2 años</option>
                      <option>3-5 años</option>
                      <option>6+ años</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-sportshausen-dark mb-2">
                      Rango de Peso
                    </label>
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ring-sportshausen-red outline-none">
                      <option>Cualquiera</option>
                      <option>70-80 kg</option>
                      <option>80-90 kg</option>
                      <option>90+ kg</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button className="w-full btn-primary">Buscar</button>
                  </div>
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {luchadores.map((luchador) => (
                  <div key={luchador.id} className="card-shadow bg-white rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="bg-gradient-to-r from-sportshausen-red to-sportshausen-gold h-32 flex items-center justify-center text-6xl">
                      {luchador.img}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-sportshausen-dark mb-2">{luchador.nombre}</h3>
                      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                        <div>
                          <p className="text-gray-600">Experiencia</p>
                          <p className="font-semibold text-sportshausen-dark">{luchador.exp} años</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Calificación</p>
                          <p className="font-semibold text-sportshausen-dark">{luchador.rating}</p>
                        </div>
                      </div>
                      <button className="w-full btn-primary text-sm">Contactar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab !== 'home' && activeTab !== 'search' && (
            <div className="card-shadow bg-white p-12 rounded-lg text-center">
              <p className="text-xl text-gray-600">Sección en construcción</p>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default BookerDashboard;

