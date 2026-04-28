import React, { useState } from 'react';
import { Search, Home, Users, Calendar, Trophy, MessageCircle, Bell, Settings, LogOut, Heart, MessageSquare, Share2, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

export const FeedLuchador = () => {
  const [likedPosts, setLikedPosts] = useState([]);

  const toggleLike = (postId) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const posts = [
    {
      id: 1,
      author: 'Carlos "El León" Rodríguez',
      role: 'Luchador Profesional',
      avatar: '🦁',
      time: 'Hace 2 horas',
      content: '¡Acabo de conseguir un evento en Santiago! Gracias a SportsHausen por conectarme con la mejor agrupación. ¡A prepararse! 💪',
      likes: 243,
      comments: 45,
      shares: 12
    },
    {
      id: 2,
      author: 'Agrupación Elite',
      role: 'Organizador de Eventos',
      avatar: '🎭',
      time: 'Hace 4 horas',
      content: 'Buscamos 3 luchadores talentosos para nuestro evento del 15 de Mayo. ¡Envíen sus propuestas! Disponible en SportsHausen. 📋',
      likes: 567,
      comments: 89,
      shares: 34
    },
    {
      id: 3,
      author: 'María González',
      role: 'Booker',
      avatar: '📋',
      time: 'Hace 6 horas',
      content: 'Lucha de campeonato del viernes a las 8pm en el Coliseo. ¡Los mejores talentos de Chile! ¿Ya confirmaste tu asistencia? 🔥',
      likes: 1203,
      comments: 234,
      shares: 567
    },
  ];

  const suggestedUsers = [
    { name: 'Phoenix', role: 'Luchador', avatar: '🔥', mutual: 45 },
    { name: 'Agrupación Premium', role: 'Organizador', avatar: '⭐', mutual: 89 },
    { name: 'Jorge "La Tormenta"', role: 'Luchador', avatar: '⛈️', mutual: 23 },
    { name: 'Events Pro', role: 'Booker', avatar: '🎪', mutual: 156 },
    { name: 'El Rey del Ring', role: 'Luchador', avatar: '👑', mutual: 67 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 font-bold text-2xl flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-sportshausen-red to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="hidden sm:inline text-sportshausen-dark">SportsHausen</span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Busca luchadores, eventos..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:bg-white focus:ring-2 ring-sportshausen-red outline-none transition-all"
                />
              </div>
            </div>

            {/* Navigation Icons */}
            <nav className="flex items-center gap-1 md:gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors group" title="Inicio">
                <Home size={20} className="text-gray-600 group-hover:text-sportshausen-red" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors group" title="Mis conexiones">
                <Users size={20} className="text-gray-600 group-hover:text-sportshausen-red" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors group" title="Eventos">
                <Calendar size={20} className="text-gray-600 group-hover:text-sportshausen-red" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors group" title="Logros">
                <Trophy size={20} className="text-gray-600 group-hover:text-sportshausen-red" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors group relative" title="Mensajes">
                <MessageCircle size={20} className="text-gray-600 group-hover:text-sportshausen-red" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-sportshausen-red rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors group relative" title="Notificaciones">
                <Bell size={20} className="text-gray-600 group-hover:text-sportshausen-red" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-sportshausen-red rounded-full"></span>
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-sportshausen-gold to-yellow-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:ring-2 ring-sportshausen-red transition-all">
                U
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-24">
              {/* Banner */}
              <div className="h-20 bg-gradient-to-r from-sportshausen-red to-red-700"></div>
              
              {/* Content */}
              <div className="px-6 pb-4 -mt-8">
                {/* Avatar */}
                <div className="w-20 h-20 bg-gradient-to-br from-sportshausen-gold to-yellow-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-3 border-4 border-white shadow-md">
                  🔥
                </div>

                {/* Info */}
                <h3 className="text-lg font-bold text-center text-sportshausen-dark">Phoenix</h3>
                <p className="text-sm text-gray-600 text-center mb-4">Luchador Profesional</p>

                {/* Stats */}
                <div className="space-y-2 text-sm border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Visitas a tu perfil</span>
                    <span className="font-bold text-sportshausen-red">247</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impresiones</span>
                    <span className="font-bold text-sportshausen-red">1,203</span>
                  </div>
                </div>

                {/* Action Button */}
                <Link to="/perfil/1" className="w-full mt-4 py-2 bg-sportshausen-red text-white rounded-lg font-semibold hover:bg-red-700 transition-colors text-center text-sm">
                  Ver Perfil
                </Link>
              </div>
            </div>

            {/* Trending Events */}
            <div className="bg-white rounded-lg shadow-sm mt-6 p-4">
              <h3 className="font-bold text-sportshausen-dark mb-4">🔥 Trending Ahora</h3>
              <div className="space-y-3">
                {['Lucha Libre Chile', 'Campeonato Regional', 'Evento Elite', 'Nueva Temporada'].map((trend, i) => (
                  <div key={i} className="pb-3 border-b border-gray-200 last:border-0 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors">
                    <p className="text-sm font-semibold text-gray-600">{trend}</p>
                    <p className="text-xs text-gray-400">23.4K eventos</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Feed */}
          <div className="lg:col-span-2">
            {/* Post Creator */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-sportshausen-gold rounded-full flex items-center justify-center text-xl flex-shrink-0">
                  🔥
                </div>
                <input
                  type="text"
                  placeholder="¿Qué estás pensando?"
                  className="flex-1 bg-gray-100 rounded-full px-4 py-2 hover:bg-gray-200 transition-colors focus:bg-white focus:ring-2 ring-sportshausen-red outline-none"
                />
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded transition-colors">
                  <Calendar size={18} />
                  <span className="text-sm">Evento</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded transition-colors">
                  <Trophy size={18} />
                  <span className="text-sm">Logro</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded transition-colors">
                  <MessageSquare size={18} />
                  <span className="text-sm">Pregunta</span>
                </button>
              </div>
            </div>

            {/* Feed Posts */}
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm p-6 mb-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sportshausen-dark">{post.author}</h4>
                      <p className="text-sm text-gray-600">{post.role}</p>
                      <p className="text-xs text-gray-400">{post.time}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                    <MoreHorizontal size={18} className="text-gray-400" />
                  </button>
                </div>

                {/* Content */}
                <p className="text-gray-800 mb-4 leading-relaxed">{post.content}</p>

                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-sportshausen-red to-red-700 rounded-lg mb-4 flex items-center justify-center text-4xl">
                  ⚡
                </div>

                {/* Stats */}
                <div className="flex gap-4 text-sm text-gray-600 py-3 border-y border-gray-200 mb-3">
                  <span>👍 {post.likes}</span>
                  <span>💬 {post.comments}</span>
                  <span>↗️ {post.shares}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded transition-colors font-semibold ${
                      likedPosts.includes(post.id)
                        ? 'text-sportshausen-red bg-red-50'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Heart size={18} className={likedPosts.includes(post.id) ? 'fill-sportshausen-red' : ''} />
                    Me interesa
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded transition-colors font-semibold">
                    <MessageSquare size={18} />
                    Comentar
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 py-2 text-gray-600 hover:bg-gray-50 rounded transition-colors font-semibold">
                    <Share2 size={18} />
                    Compartir
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar - Suggested Users */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24">
              <h3 className="font-bold text-sportshausen-dark mb-4">Sugerencias para ti</h3>
              <div className="space-y-4">
                {suggestedUsers.map((user, i) => (
                  <div key={i} className="flex items-start justify-between">
                    <div className="flex gap-2 flex-1">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-lg flex-shrink-0">
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-600">{user.role}</p>
                        <p className="text-xs text-gray-400">{user.mutual} conexiones en común</p>
                      </div>
                    </div>
                    <button className="px-3 py-1 border-2 border-sportshausen-red text-sportshausen-red rounded-full text-xs font-semibold hover:bg-red-50 transition-colors flex-shrink-0">
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Info */}
            <div className="text-center text-xs text-gray-600 mt-6 space-y-1">
              <p>
                <a href="#" className="hover:text-sportshausen-red">Sobre</a>
                {' '} · {' '}
                <a href="#" className="hover:text-sportshausen-red">Accesibilidad</a>
              </p>
              <p>© 2026 SportsHausen</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FeedLuchador;

