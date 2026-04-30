import React, { useState } from 'react';
import { Star, Trophy, Calendar, Award, ArrowRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const LandingPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header userType="guest" isOpen={menuOpen} setIsOpen={setMenuOpen} />

      {/* Hero Section - Limpio y Profesional */}
      <section className="bg-gradient-to-r from-white via-gray-50 to-white pt-16 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 border border-sportshausen-red/30 rounded-full">
                  <span className="text-lg">✨</span>
                  <span className="text-sm font-semibold text-sportshausen-red">
                    Impulsando el deporte nacional chileno
                  </span>
                </div>

                <h1 className="text-5xl md:text-6xl font-display font-black text-sportshausen-dark leading-tight">
                  La Red Profesional del Deporte
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  Conecta luchadores, bookers y agrupaciones deportivas. Construye tu reputación, encuentra oportunidades y crece profesionalmente en un solo lugar.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-sportshausen-red text-sportshausen-dark font-bold text-lg rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  Comenzar Ahora
                  <ArrowRight size={22} />
                </Link>
                <button className="flex items-center justify-center gap-2 px-8 py-4 bg-sportshausen-red text-sportshausen-dark font-bold text-lg rounded-lg hover:bg-red-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                  Ver Demo
                  <span>→</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div>
                  <p className="text-3xl font-bold text-sportshausen-red">500+</p>
                  <p className="text-sm text-gray-600">Luchadores Verificados</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-sportshausen-red">1200+</p>
                  <p className="text-sm text-gray-600">Eventos Realizados</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-sportshausen-red">98%</p>
                  <p className="text-sm text-gray-600">Satisfacción</p>
                </div>
              </div>
            </div>

            {/* Right - Hero Image (placeholder) */}
            <div className="hidden md:block">
              <div className="relative">
                {/* Decorative background */}
                <div className="absolute inset-0 bg-gradient-to-r from-sportshausen-red/10 to-sportshausen-gold/10 rounded-3xl blur-3xl"></div>

                {/* Hero card */}
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl p-12 border border-gray-200 shadow-lg">
                  <div className="space-y-6">
                    {/* Profile Card Preview */}
                    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-sportshausen-red to-red-700 rounded-full"></div>
                        <div className="flex-1">
                          <p className="font-bold text-sportshausen-dark">Carlos "El León"</p>
                          <p className="text-sm text-gray-600">Luchador • 5 años exp</p>
                          <div className="flex gap-1 mt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} className="fill-sportshausen-gold text-sportshausen-gold" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Calendar Preview */}
                    <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
                      <p className="text-xs font-semibold text-gray-600 mb-3">Disponibilidad</p>
                      <div className="grid grid-cols-7 gap-2">
                        {[...Array(14)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-6 h-6 rounded text-xs flex items-center justify-center font-bold ${
                              i % 3 === 0 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-sportshausen-dark mb-4">
              Por Qué Elegir SportsHausen
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              La plataforma completa para profesionalizar el deporte
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users size={40} className="text-sportshausen-red" />,
                title: 'Red Verificada',
                desc: 'Conecta con bookers y luchadores profesionales verificados. Elimina intermediarios innecesarios.'
              },
              {
                icon: <Calendar size={40} className="text-sportshausen-red" />,
                title: 'Gestión Inteligente',
                desc: 'Calendario interactivo, disponibilidad clara y sincronización automática de eventos.'
              },
              {
                icon: <Award size={40} className="text-sportshausen-red" />,
                title: 'Reputación Verificada',
                desc: 'Construye tu perfil profesional basado en experiencias auditadas y comentarios reales.'
              }
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-8 border border-gray-200 rounded-2xl hover:shadow-lg hover:border-sportshausen-red/50 transition-all duration-300 bg-white"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-sportshausen-dark mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-sportshausen-dark mb-4">
              Cómo Funciona
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Para Luchadores */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-sportshausen-dark">Para Luchadores</h3>
              {[
                { num: '1', title: 'Crea tu Perfil', desc: 'Información profesional y verificación' },
                { num: '2', title: 'Gestiona tu Disponibilidad', desc: 'Calendario inteligente y visible' },
                { num: '3', title: 'Recibe Oportunidades', desc: 'Bookers te contactan directamente' },
                { num: '4', title: 'Construye Reputación', desc: 'Calificaciones y comentarios verificados' }
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-sportshausen-red text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <p className="font-bold text-sportshausen-dark">{step.title}</p>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Para Bookers */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-sportshausen-dark">Para Bookers</h3>
              {[
                { num: '1', title: 'Busca Talento', desc: 'Base de datos filtrable de profesionales' },
                { num: '2', title: 'Verifica Perfiles', desc: 'Información completa y verificada' },
                { num: '3', title: 'Contacta Directamente', desc: 'Propuestas y ofertas sin intermediarios' },
                { num: '4', title: 'Gestiona Contratos', desc: 'Sistema integrado de órdenes y pagos' }
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 bg-sportshausen-red text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {step.num}
                  </div>
                  <div>
                    <p className="font-bold text-sportshausen-dark">{step.title}</p>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-sportshausen-dark mb-4">
              Lo Que Dicen Nuestros Usuarios
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Carlos "El León" Rodríguez',
                role: 'Luchador Profesional',
                text: 'SportsHausen cambió mi carrera. Ahora consigo eventos de calidad sin intermediarios.',
                rating: 5
              },
              {
                name: 'María González',
                role: 'Booker - Agrupación Elite',
                text: 'Encontrar talentos verificados es mucho más fácil. Ahorra tiempo y garantiza profesionalismo.',
                rating: 5
              },
              {
                name: 'Jorge "La Tormenta" Silva',
                role: 'Luchador Profesional',
                text: 'El calendario integrado es increíble. Mis clientes ven mi disponibilidad al instante.',
                rating: 5
              }
            ].map((testimonial, i) => (
              <div key={i} className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-all">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} size={18} className="fill-sportshausen-gold text-sportshausen-gold" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-sportshausen-dark">{testimonial.name}</p>
                  <p className="text-sm text-sportshausen-red font-semibold">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-gradient-to-r from-sportshausen-red to-red-700">
        <div className="max-w-4xl mx-auto text-center text-white space-y-8">
          <h2 className="text-5xl md:text-6xl font-display font-black drop-shadow-lg">
            ¿Listo para Comenzar?
          </h2>
          <p className="text-xl text-red-100 drop-shadow-lg">
            Únete a la plataforma que está transformando el deporte profesional en Chile
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-10 py-4 bg-sportshausen-gold text-sportshausen-dark font-bold text-lg rounded-lg hover:bg-yellow-500 transition-all shadow-lg"
            >
              Registrarme como Luchador
            </Link>
            <Link
              to="/signup"
              className="px-10 py-4 bg-sportshausen-gold text-sportshausen-dark font-bold text-lg rounded-lg hover:bg-yellow-500 transition-all shadow-lg"
            >
              Registrarme como Booker
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;