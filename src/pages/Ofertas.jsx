import React, { useState } from 'react';
import { MapPin, Calendar, DollarSign, Users, Filter, X } from 'lucide-react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';
import { crearTicket } from '../services/ticketService';

const ofertas = [
  { id: 1, org: 'FNL', org_id: 1, titulo: 'Luchador Estelar — Copa Nacional', desc: 'Se busca luchador técnico para combate principal. Experiencia mínima 3 años.', fecha: '20 Jun 2026', tarifa: '$200.000', lugar: 'Santiago', cupos: 2, tag: 'Destacado', cierre: '15 Jun' },
  { id: 2, org: 'WKC', org_id: 2, titulo: 'Combate de Campeonato', desc: 'Disputa del cinturón regional WKC. Se requiere experiencia en combates de título.', fecha: '5 Jul 2026', tarifa: '$350.000', lugar: 'Valparaíso', cupos: 1, tag: 'Urgente', cierre: '28 Jun' },
  { id: 3, org: '5 Luchas Clandestino', org_id: 3, titulo: 'Lucha de Apertura', desc: 'Show familiar. Buen ambiente y público. Ideal para luchadores emergentes.', fecha: '12 Jul 2026', tarifa: '$80.000', lugar: 'Concepción', cupos: 4, tag: 'Nuevo', cierre: '5 Jul' },
  { id: 4, org: 'Andes Pro Wrestling', org_id: 4, titulo: 'Open Andino — Categoría Pro', desc: 'Torneo abierto categoría profesional. Clasificatorio a campeonato latinoamericano.', fecha: '8 Ago 2026', tarifa: '$120.000', lugar: 'Antofagasta', cupos: 8, tag: 'Nuevo', cierre: '1 Ago' },
  { id: 5, org: 'Agrupación Elite', org_id: 5, titulo: 'Show Premium — Noche de Campeones', desc: 'Evento premium con transmisión online. Contrato por 2 presentaciones.', fecha: '22 Ago 2026', tarifa: '$280.000', lugar: 'Santiago', cupos: 3, tag: 'Destacado', cierre: '15 Ago' },
];

const TIPOS_TICKET = [
  'Consulta sobre evento',
  'Problema con postulación',
  'Reporte de incidente',
  'Otro asunto'
];

const tagStyle = { Destacado: 'badge-yellow', Urgente: 'badge-red', Nuevo: 'badge-dark' };

const Ofertas = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [postulados, setPostulados] = useState([]);
  const [modalTicket, setModalTicket] = useState(null);
  const [ticketForm, setTicketForm] = useState({
    tipo_solicitud: '',
    motivo: '',
  });
  const [enviandoTicket, setEnviandoTicket] = useState(false);

  const postular = (id) => setPostulados(prev => prev.includes(id) ? prev : [...prev, id]);

  const abrirTicket = (oferta) => {
    setModalTicket(oferta);
    setTicketForm({ tipo_solicitud: '', motivo: '' });
  };

  const handleEnviarTicket = async () => {
    if (!ticketForm.tipo_solicitud || ticketForm.motivo.trim().length < 10) {
      alert('Completa todos los campos (mínimo 10 caracteres)');
      return;
    }

    setEnviandoTicket(true);
    try {
      await crearTicket({
        tipo_solicitud: ticketForm.tipo_solicitud,
        motivo: ticketForm.motivo.trim(),
        agrupacion_id: modalTicket.org_id,
      });

      alert('✓ Ticket enviado exitosamente');
      setModalTicket(null);
    } catch (error) {
      alert('Error al enviar ticket: ' + error.message);
    } finally {
      setEnviandoTicket(false);
    }
  };

  return (
    <div className="min-h-screen bg-sportshausen-light">
      <Header userType="luchador" isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex pt-16 min-h-screen">
        <SideNav active="offers" onSelect={() => {}} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <main className="flex-1 md:ml-64 px-4 sm:px-6 lg:px-8 py-10 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-display font-black text-sportshausen-dark mb-2">Ofertas Disponibles</h1>
              <p className="text-gray-600">Encuentra las mejores oportunidades para tu carrera.</p>
            </div>
            <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 border border-gray-200 text-sm text-gray-600">
              <Filter size={16} />
              <span>{ofertas.length} ofertas disponibles</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ofertas.map(of => (
              <article key={of.id} className="bg-white rounded-2xl p-6 card-shadow hover:shadow-lg transition-all border border-transparent hover:border-sportshausen-red/30 flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-sportshausen-red to-red-700 rounded-xl flex items-center justify-center text-white font-black text-lg">
                    {of.org[0]}
                  </div>
                  <span className={tagStyle[of.tag]}>{of.tag}</span>
                </div>

                <p className="text-xs font-bold text-sportshausen-red mb-1 uppercase tracking-wide">{of.org}</p>
                <h3 className="text-xl font-bold text-sportshausen-dark mb-2">{of.titulo}</h3>
                <p className="text-sm text-gray-600 mb-4 flex-1">{of.desc}</p>

                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                  <span className="flex items-center gap-1"><Calendar size={14} className="text-sportshausen-red" />{of.fecha}</span>
                  <span className="flex items-center gap-1"><MapPin size={14} className="text-sportshausen-red" />{of.lugar}</span>
                  <span className="flex items-center gap-1"><Users size={14} className="text-sportshausen-red" />{of.cupos} cupos</span>
                  <span className="text-xs text-gray-400">Cierre: {of.cierre}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <p className="text-xl font-bold text-sportshausen-red">{of.tarifa} CLP</p>
                  <div className="flex gap-2">
                    {postulados.includes(of.id) ? (
                      <span className="badge-yellow px-4 py-2 text-sm whitespace-nowrap">✓ Postulado</span>
                    ) : (
                      <>
                        <button
                          onClick={() => postular(of.id)}
                          className="btn-primary text-sm px-3 py-2 whitespace-nowrap"
                        >
                          Postularme
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => abrirTicket(of)}
                      className="btn-outline text-sm px-3 py-2 whitespace-nowrap"
                      title="Enviar una consulta a esta agrupación"
                    >
                      🎫 Ticket
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Modal: Crear Ticket */}
          {modalTicket && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl max-w-md w-full p-6 card-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-sportshausen-dark">
                    Enviar Consulta
                  </h2>
                  <button
                    onClick={() => setModalTicket(null)}
                    className="hover:bg-gray-100 p-2 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-6">
                  A: <span className="font-semibold">{modalTicket.org}</span>
                </p>

                <div className="space-y-4">
                  {/* Tipo de Solicitud */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Tipo de Consulta
                    </label>
                    <select
                      value={ticketForm.tipo_solicitud}
                      onChange={(e) =>
                        setTicketForm({ ...ticketForm, tipo_solicitud: e.target.value })
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 ring-sportshausen-red outline-none"
                    >
                      <option value="">-- Selecciona --</option>
                      {TIPOS_TICKET.map(tipo => (
                        <option key={tipo} value={tipo}>{tipo}</option>
                      ))}
                    </select>
                  </div>

                  {/* Motivo */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Detalle
                    </label>
                    <textarea
                      rows={4}
                      value={ticketForm.motivo}
                      onChange={(e) =>
                        setTicketForm({ ...ticketForm, motivo: e.target.value })
                      }
                      placeholder="Describe tu consulta..."
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 ring-sportshausen-red outline-none resize-none"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Mínimo 10 caracteres
                    </p>
                  </div>
                </div>

                {/* Botones */}
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setModalTicket(null)}
                    className="flex-1 btn-outline"
                    disabled={enviandoTicket}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleEnviarTicket}
                    className="flex-1 btn-primary"
                    disabled={enviandoTicket}
                  >
                    {enviandoTicket ? 'Enviando...' : 'Enviar'}
                  </button>
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

export default Ofertas;
