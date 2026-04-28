import React, { useState } from 'react';
import { Star, MapPin, Mail, Share2, Phone, Calendar, MessageSquare } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const PerfilLuchador = () => {
  const [showContactModal, setShowContactModal] = useState(false);

  const luchador = {
    nombre: 'Phoenix',
    nombreLegal: 'Carlos Alberto Rodríguez',
    ciudad: 'Santiago',
    experiencia: 8,
    peso: 85,
    estatura: 180,
    calificacion: 4.8,
    resenas: 24,
    banner: 'bg-gradient-to-r from-sportshausen-red to-sportshausen-dark',
    redes: [
      { icon: Mail, url: '#', name: 'Email' },
      { icon: Share2, url: '#', name: 'Compartir' },
      { icon: Phone, url: '#', name: 'Teléfono' },
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Header userType="booker" />

      {/* Banner */}
      <div className={`h-48 md:h-64 ${luchador.banner} relative`}>
        <div className="absolute inset-0 opacity-30 bg-black"></div>
      </div>

      {/* Profile Header */}
      <div className="max-w-6xl mx-auto px-4 relative -mt-24 mb-8">
        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Avatar */}
          <div className="w-48 h-48 rounded-2xl bg-sportshausen-gold flex items-center justify-center text-6xl font-bold text-white shadow-lg ring-4 ring-white">
            🔥
          </div>

          {/* Info */}
          <div className="flex-1 pt-8">
            <h1 className="text-4xl md:text-5xl font-bold text-sportshausen-dark mb-2">
              {luchador.nombre}
            </h1>
            <p className="text-gray-600 text-lg mb-4">
              {luchador.nombreLegal}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-gray-600 text-sm">Experiencia</p>
                <p className="text-2xl font-bold text-sportshausen-dark">{luchador.experiencia} años</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Peso</p>
                <p className="text-2xl font-bold text-sportshausen-dark">{luchador.peso} kg</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Estatura</p>
                <p className="text-2xl font-bold text-sportshausen-dark">{luchador.estatura} cm</p>
              </div>
              <div className="flex items-center">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-sportshausen-gold text-sportshausen-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{luchador.resenas} reseñas</p>
                </div>
              </div>
            </div>

            {/* Location & CTA */}
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={20} className="text-sportshausen-red" />
                <span>{luchador.ciudad}, Chile</span>
              </div>
              <button
                onClick={() => setShowContactModal(true)}
                className="btn-primary flex items-center gap-2"
              >
                <MessageSquare size={18} />
                Contactar para Evento
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Redes Sociales */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-sportshausen-dark mb-6">Sígueme en Redes Sociales</h2>
        <div className="flex gap-6">
          {luchador.redes.map((red, idx) => {
            const Icon = red.icon;
            return (
              <a key={idx} href={red.url} className="w-16 h-16 bg-sportshausen-light rounded-lg flex items-center justify-center hover:bg-sportshausen-red hover:text-white transition-colors">
                <Icon size={28} />
              </a>
            );
          })}
        </div>
      </section>

      {/* Calendario de Disponibilidad */}
      <section className="max-w-6xl mx-auto px-4 py-12 bg-sportshausen-light mx-4 rounded-2xl mb-12">
        <h2 className="text-2xl font-bold text-sportshausen-dark mb-6">Disponibilidad - Mayo 2026</h2>
        <div className="grid grid-cols-7 gap-2">
          {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day) => (
            <div key={day} className="text-center font-bold text-gray-600 text-sm py-2">{day}</div>
          ))}
          {[...Array(31)].map((_, i) => {
            const date = i + 1;
            const isOccupied = [5, 12, 15, 22, 29].includes(date);
            return (
              <div
                key={i}
                className={`p-4 rounded-lg text-center font-semibold cursor-pointer transition-all ${
                  isOccupied
                    ? 'bg-sportshausen-red text-white'
                    : 'bg-white text-sportshausen-dark border-2 border-green-500'
                }`}
              >
                {date}
              </div>
            );
          })}
        </div>
        <div className="flex gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-sportshausen-red rounded"></div>
            <span className="text-sm text-gray-600">Ocupado</span>
          </div>
        </div>
      </section>

      {/* Calificaciones */}
      <section className="max-w-6xl mx-auto px-4 py-12 mb-12">
        <h2 className="text-2xl font-bold text-sportshausen-dark mb-6">Calificaciones y Reseñas</h2>
        <div className="space-y-6">
          {[
            { booker: 'Agrupación Elite', comment: 'Profesional, puntual y con gran actitud. Recomendado 100%', rating: 5 },
            { booker: 'Carlos Eventos', comment: 'Excelente desempeño en el evento. Volvería a contratarlo', rating: 5 },
            { booker: 'Lucha Premium', comment: 'Buen trabajo, muy dedicado', rating: 4 },
          ].map((review, idx) => (
            <div key={idx} className="card-shadow bg-white p-6 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <p className="font-bold text-sportshausen-dark">{review.booker}</p>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.rating ? 'fill-sportshausen-gold text-sportshausen-gold' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-sportshausen-dark mb-6">Propuesta de Evento</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-sportshausen-dark mb-2">
                  Asunto del Evento
                </label>
                <input
                  type="text"
                  placeholder="Ej: Lucha Especial"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ring-sportshausen-red outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-sportshausen-dark mb-2">
                  Descripción
                </label>
                <textarea
                  placeholder="Cuéntanos sobre el evento..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ring-sportshausen-red outline-none"
                  rows="4"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-semibold text-sportshausen-dark mb-2">
                  Fecha Propuesta
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ring-sportshausen-red outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-sportshausen-dark mb-2">
                  Tarifa Ofrecida (CLP)
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 ring-sportshausen-red outline-none"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 btn-primary"
                >
                  Enviar Propuesta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PerfilLuchador;

