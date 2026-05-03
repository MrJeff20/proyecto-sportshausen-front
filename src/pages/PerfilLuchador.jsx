import React, { useState } from 'react';
import { Star, MapPin, Mail, Share2, Phone, Calendar, MessageSquare } from 'lucide-react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';

export const PerfilLuchador = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [connected, setConnected] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [previewRole, setPreviewRole] = useState('talent');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  React.useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('connections') || '[]');
      setConnected(stored.includes(luchador.nombre));
    } catch (e) {
      setConnected(false);
    }
  }, []);

  // close edit mode when entering preview; keep preview read-only
  React.useEffect(() => {
    if (previewOpen) setEditMode(false);
  }, [previewOpen]);

  const toggleConnect = () => {
    try {
      const key = 'connections';
      const stored = JSON.parse(localStorage.getItem(key) || '[]');
      let next = [];
      if (stored.includes(luchador.nombre)) {
        next = stored.filter((n) => n !== luchador.nombre);
        setConnected(false);
      } else {
        next = [...stored, luchador.nombre];
        setConnected(true);
      }
      localStorage.setItem(key, JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  };

  const [luchador, setLuchador] = useState({
    nombre: 'Phoenix',
    nombreLegal: 'Carlos Alberto Rodríguez',
    ciudad: 'Santiago',
    experiencia: 8,
    peso: 85,
    estatura: 180,
    edad: 30,
    calificacion: 4.8,
    resenas: 24,
    banner: 'bg-gradient-to-r from-sportshausen-red to-sportshausen-dark',
    redes: [
      { icon: Mail, url: '#', name: 'Email' },
      { icon: Share2, url: '#', name: 'Compartir' },
      { icon: Phone, url: '#', name: 'Teléfono' },
    ]
  });

  return (
    <div className="min-h-screen bg-white">
      <Header userType="luchador" isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <SideNav active={'profile'} onSelect={()=>{}} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Banner + Profile Header: only visible in preview mode */}
      {previewOpen && (
        <>
          <div className={`h-48 md:h-64 ${luchador.banner} relative`}>
            <div className="absolute inset-0 opacity-30 bg-black"></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 relative -mt-24 mb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar removed per request (no photos) */}

              {/* Info */}
              <div className="flex-1 pt-8">
                <h1 className="text-4xl md:text-5xl font-bold text-sportshausen-dark mb-2">MI PERFIL</h1>
                <p className="text-xl text-gray-700 mb-4">{luchador.nombre} — <span className="text-sm text-gray-500">{luchador.nombreLegal}</span></p>

                {/* Cagematch-style data box */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left column: quick facts */}
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Edad</p>
                        <p className="font-bold text-lg text-sportshausen-dark">{luchador.edad}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Ciudad</p>
                        <p className="font-bold text-lg text-sportshausen-dark">{luchador.ciudad}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Peso</p>
                        <p className="font-bold text-lg text-sportshausen-dark">{luchador.peso} kg</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Estatura</p>
                        <p className="font-bold text-lg text-sportshausen-dark">{luchador.estatura} cm</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Experiencia</p>
                        <p className="font-bold text-lg text-sportshausen-dark">{luchador.experiencia} años</p>
                      </div>
                    </div>

                    {/* Middle column: biography */}
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-semibold mb-2">Biografía</h3>
                      <p className="text-gray-600 mb-4">Luchador con amplia experiencia en el circuito nacional. Técnico agresivo, conocido por su estilo aéreo y finishers contundentes. Ha participado en múltiples promociones y eventos destacados.</p>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Debut</p>
                          <p className="font-semibold">2008</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Reseñas</p>
                          <p className="font-semibold">{luchador.resenas}</p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="text-sm font-semibold mb-1">Finishers</h4>
                        <ul className="list-disc ml-5 text-gray-600">
                          <li>Phantom Driver</li>
                          <li>Rising Plunge</li>
                        </ul>
                      </div>
                      <div className="mt-3">
                        <h4 className="text-sm font-semibold mb-1">Movimientos firmados</h4>
                        <ul className="list-disc ml-5 text-gray-600">
                          <li>Suplex invertido</li>
                          <li>Enzuigiri</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button onClick={() => setPreviewOpen(false)} className="px-4 py-2 rounded-lg border">Cerrar vista</button>
                  <button onClick={() => setShowContactModal(true)} className="btn-primary">Contactar</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main content + Right profile panel grid */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: main profile content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Reduced social elements: Redes Sociales section removed to make profile more tool-like */}

          {/* Calendario de Disponibilidad */}
          <section className="bg-white p-6 rounded-2xl">
            <h2 className="text-2xl font-bold text-sportshausen-dark mb-6">Disponibilidad - Mayo 2026</h2>
            <div className="grid grid-cols-7 gap-2 mb-4">
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
          <section className="bg-white p-6 rounded-lg">
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
        </div>

        {/* Right: profile summary + actions */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 space-y-4">
            <div>
              <p className="text-sm text-gray-500">Nombre Artístico</p>
              <h3 className="text-lg font-bold text-sportshausen-dark">{luchador.nombre}</h3>
              <p className="text-sm text-gray-600">{luchador.nombreLegal}</p>
            </div>

            {!editMode ? (
              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-sm text-gray-600">Peso</span><strong>{luchador.peso} kg</strong></div>
                <div className="flex justify-between"><span className="text-sm text-gray-600">Estatura</span><strong>{luchador.estatura} cm</strong></div>
                <div className="flex justify-between"><span className="text-sm text-gray-600">Edad</span><strong>{luchador.edad} años</strong></div>
              </div>
            ) : (
              <div className="space-y-3">
                <label className="block text-sm">Nombre Artístico</label>
                <input value={luchador.nombre} onChange={(e)=>setLuchador({...luchador,nombre:e.target.value})} className="w-full px-3 py-2 border rounded" />
                <label className="block text-sm">Nombre Real</label>
                <input value={luchador.nombreLegal} onChange={(e)=>setLuchador({...luchador,nombreLegal:e.target.value})} className="w-full px-3 py-2 border rounded" />
                <label className="block text-sm">Peso (kg)</label>
                <input type="number" value={luchador.peso} onChange={(e)=>setLuchador({...luchador,peso: Number(e.target.value)})} className="w-full px-3 py-2 border rounded" />
                <label className="block text-sm">Estatura (cm)</label>
                <input type="number" value={luchador.estatura} onChange={(e)=>setLuchador({...luchador,estatura: Number(e.target.value)})} className="w-full px-3 py-2 border rounded" />
                <label className="block text-sm">Edad</label>
                <input type="number" value={luchador.edad} onChange={(e)=>setLuchador({...luchador,edad: Number(e.target.value)})} className="w-full px-3 py-2 border rounded" />
              </div>
            )}

              <div className="flex gap-3">
                {!previewOpen && (
                  !editMode ? (
                    <button onClick={()=>setEditMode(true)} className="flex-1 px-4 py-2 border rounded font-semibold">Editar</button>
                  ) : (
                    <>
                      <button onClick={()=>setEditMode(false)} className="flex-1 px-4 py-2 bg-green-600 text-white rounded font-semibold">Guardar</button>
                      <button onClick={()=>setEditMode(false)} className="flex-1 px-4 py-2 border rounded font-semibold">Cancelar</button>
                    </>
                  )
                )}

                {!previewOpen ? (
                  <button onClick={()=>setPreviewModal(true)} className="flex-1 btn-primary">Vista previa</button>
                ) : (
                  <button onClick={()=>setPreviewOpen(false)} className="flex-1 border rounded">Cerrar vista</button>
                )}
              </div>
          </div>
        </aside>
      </div>

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

      {/* Preview Modal: choose role, then apply full-page preview */}
      {previewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Vista previa - Rol</h3>
              <div className="flex items-center gap-2">
                <select value={previewRole} onChange={(e)=>setPreviewRole(e.target.value)} className="px-3 py-1 border rounded">
                  <option value="talent">Talento</option>
                  <option value="booker">Booker</option>
                  <option value="group">Agrupación</option>
                </select>
                <button onClick={()=>setPreviewModal(false)} className="px-3 py-1 border rounded">Cancelar</button>
              </div>
            </div>

            <div className="p-4 border rounded mb-4">
              <p className="text-sm text-gray-600">Selecciona cómo quieres ver tu perfil (simulación).</p>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={()=>setPreviewModal(false)} className="px-4 py-2 border rounded">Cerrar</button>
              <button onClick={() => { setPreviewModal(false); setPreviewOpen(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="px-4 py-2 btn-primary">Ver como {previewRole === 'talent' ? 'Talento' : previewRole === 'booker' ? 'Booker' : 'Agrupación'}</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default PerfilLuchador;

