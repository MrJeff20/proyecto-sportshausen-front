import React, { useState } from 'react';
import { MapPin, Calendar, DollarSign, Users, Filter } from 'lucide-react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';

const ofertas = [
  { id: 1, org: 'FNL', titulo: 'Luchador Estelar — Copa Nacional', desc: 'Se busca luchador técnico para combate principal. Experiencia mínima 3 años.', fecha: '20 Jun 2026', tarifa: '$200.000', lugar: 'Santiago', cupos: 2, tag: 'Destacado', cierre: '15 Jun' },
  { id: 2, org: 'WKC', titulo: 'Combate de Campeonato', desc: 'Disputa del cinturón regional WKC. Se requiere experiencia en combates de título.', fecha: '5 Jul 2026', tarifa: '$350.000', lugar: 'Valparaíso', cupos: 1, tag: 'Urgente', cierre: '28 Jun' },
  { id: 3, org: '5 Luchas Clandestino', titulo: 'Lucha de Apertura', desc: 'Show familiar. Buen ambiente y público. Ideal para luchadores emergentes.', fecha: '12 Jul 2026', tarifa: '$80.000', lugar: 'Concepción', cupos: 4, tag: 'Nuevo', cierre: '5 Jul' },
  { id: 4, org: 'Andes Pro Wrestling', titulo: 'Open Andino — Categoría Pro', desc: 'Torneo abierto categoría profesional. Clasificatorio a campeonato latinoamericano.', fecha: '8 Ago 2026', tarifa: '$120.000', lugar: 'Antofagasta', cupos: 8, tag: 'Nuevo', cierre: '1 Ago' },
  { id: 5, org: 'Agrupación Elite', titulo: 'Show Premium — Noche de Campeones', desc: 'Evento premium con transmisión online. Contrato por 2 presentaciones.', fecha: '22 Ago 2026', tarifa: '$280.000', lugar: 'Santiago', cupos: 3, tag: 'Destacado', cierre: '15 Ago' },
];

const tagStyle = { Destacado: 'badge-yellow', Urgente: 'badge-red', Nuevo: 'badge-dark' };

const Ofertas = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [postulados, setPostulados] = useState([]);

  const postular = (id) => setPostulados(prev => prev.includes(id) ? prev : [...prev, id]);

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
                  {postulados.includes(of.id) ? (
                    <span className="badge-yellow px-4 py-2 text-sm">✓ Postulado</span>
                  ) : (
                    <button onClick={() => postular(of.id)} className="btn-primary text-sm px-5 py-2">Postularme</button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Ofertas;
