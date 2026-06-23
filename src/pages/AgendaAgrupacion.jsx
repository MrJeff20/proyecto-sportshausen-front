import React, { useState, useEffect } from 'react';
import {
  ChevronLeft, ChevronRight, Calendar, Clock,
  Users, Trash2, Edit3, X, CheckCircle2, Plus, Check,
} from 'lucide-react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';
import Footer from '../components/Footer';

// ─────────────────────────────────────────
//  Constantes
// ─────────────────────────────────────────
const MONTH_NAMES = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
];
const DAY_NAMES = ['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
const STORAGE_KEY = 'agrupacion_eventos';

// Horas disponibles: 08:00 — 22:00
const ALL_HOURS = Array.from({ length: 15 }, (_, i) => {
  const h = i + 8;
  return `${String(h).padStart(2, '0')}:00`;
});

// Filtra horas según duración para que el evento termine antes de las 23:00
const getHorasDisponibles = (duracion) => {
  if (!duracion) return ALL_HOURS;
  return ALL_HOURS.filter(h => parseInt(h) + duracion <= 23);
};

const calcHoraFin = (horaInicio, duracion) => {
  if (!horaInicio || !duracion) return '';
  const fin = parseInt(horaInicio) + duracion;
  if (fin > 23) return '';
  return `${String(fin).padStart(2, '0')}:00`;
};

// ─────────────────────────────────────────
//  Persistencia localStorage
// ─────────────────────────────────────────
const loadEventos = () => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { return []; }
};
const saveEventos = (ev) => localStorage.setItem(STORAGE_KEY, JSON.stringify(ev));

// ─────────────────────────────────────────
//  Sub-componentes reutilizables
// ─────────────────────────────────────────
function Overlay({ onClose, children }) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function ModalHeader({ title, onClose }) {
  return (
    <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
      <h3 className="text-xl font-bold text-sportshausen-dark">{title}</h3>
      <button
        onClick={onClose}
        className="p-1 text-gray-300 hover:text-gray-500 transition-colors rounded-lg hover:bg-gray-100"
      >
        <X size={20} />
      </button>
    </div>
  );
}

function ModalFooter({ children }) {
  return (
    <div className="flex items-center justify-between gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/60">
      {children}
    </div>
  );
}

function ResumenRow({ label, value }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5 border-b border-gray-100 last:border-0">
      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap flex-shrink-0">
        {label}
      </span>
      <span className="text-sm font-semibold text-sportshausen-dark text-right">{value}</span>
    </div>
  );
}

// ─────────────────────────────────────────
//  Formulario de evento (crear / editar)
// ─────────────────────────────────────────
function EventoForm({ form, onChange }) {
  const horaFin = calcHoraFin(form.horaInicio, form.duracion);
  const horas   = getHorasDisponibles(form.duracion);

  const setPill = (key, val) => {
    const updated = { ...form, [key]: val };
    // Si la hora elegida queda fuera del rango permitido para la nueva duración, la reseteamos
    if (key === 'duracion' && form.horaInicio) {
      if (parseInt(form.horaInicio) + val > 23) updated.horaInicio = '';
    }
    onChange(updated);
  };

  return (
    <div className="space-y-5">

      {/* Nombre del evento */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
          Nombre del evento
        </label>
        <input
          type="text"
          value={form.nombre}
          onChange={(e) => onChange({ ...form, nombre: e.target.value })}
          placeholder="Ej: FNL Doomsday, Cerveza y Oro..."
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none
            focus:ring-2 focus:ring-sportshausen-gold/40 focus:border-sportshausen-gold
            transition-colors placeholder:text-gray-300"
        />
      </div>

      {/* Duración */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
          Duración del evento
        </label>
        <div className="flex gap-3">
          {[2, 3].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setPill('duracion', d)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                form.duracion === d
                  ? 'border-sportshausen-gold bg-sportshausen-gold text-white shadow-sm'
                  : 'border-gray-200 text-gray-600 bg-white hover:border-sportshausen-gold/50 hover:bg-sportshausen-gold/5'
              }`}
            >
              {d} horas
            </button>
          ))}
        </div>
      </div>

      {/* Hora de inicio */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-1.5">
          Hora de inicio
        </label>
        <div className="relative">
          <select
            value={form.horaInicio}
            onChange={(e) => onChange({ ...form, horaInicio: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none
              focus:ring-2 focus:ring-sportshausen-gold/40 focus:border-sportshausen-gold
              transition-colors appearance-none bg-white cursor-pointer"
          >
            <option value="">Selecciona la hora de inicio</option>
            {horas.map((h) => (
              <option key={h} value={h}>{h} hrs</option>
            ))}
          </select>
          <Clock
            size={15}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none"
          />
        </div>

        {/* Hora de término calculada */}
        {horaFin && (
          <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-sportshausen-gold">
            <Check size={13} />
            Hora de término: {horaFin} hrs
          </div>
        )}
        {!horaFin && form.horaInicio && form.duracion && (
          <p className="mt-1.5 text-xs text-sportshausen-red">
            La duración seleccionada supera las 23:00 hrs.
          </p>
        )}
      </div>

      {/* Cantidad de luchadores */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
          Cantidad de luchadores
        </label>
        <div className="flex gap-3">
          {[10, 15].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPill('luchadores', n)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                form.luchadores === n
                  ? 'border-sportshausen-gold bg-sportshausen-gold text-white shadow-sm'
                  : 'border-gray-200 text-gray-600 bg-white hover:border-sportshausen-gold/50 hover:bg-sportshausen-gold/5'
              }`}
            >
              <span className="flex items-center justify-center gap-1.5">
                <Users size={14} />
                {n}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
//  Estado vacío del formulario
// ─────────────────────────────────────────
const FORM_EMPTY = { nombre: '', duracion: null, horaInicio: '', luchadores: null };

const isFormValido = (f) =>
  f.nombre.trim() && f.duracion && f.horaInicio && f.luchadores &&
  !!calcHoraFin(f.horaInicio, f.duracion);

// ─────────────────────────────────────────
//  Componente principal
// ─────────────────────────────────────────
export default function AgendaAgrupacion() {
  const today = new Date();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [month, setMonth] = useState(today.getMonth());
  const [year,  setYear]  = useState(today.getFullYear());
  const [eventos, setEventos] = useState(loadEventos);

  // Modals
  const [modalCrear,   setModalCrear]   = useState(null); // { date, month, year }
  const [modalExito,   setModalExito]   = useState(null); // evento recién creado
  const [modalDetalle, setModalDetalle] = useState(null); // evento existente
  const [modalEditar,  setModalEditar]  = useState(null); // evento a editar

  // Formularios
  const [form,     setForm]     = useState(FORM_EMPTY);
  const [editForm, setEditForm] = useState(FORM_EMPTY);

  useEffect(() => { saveEventos(eventos); }, [eventos]);

  // ── Navegación de mes ──
  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  // ── Grilla del calendario ──
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay    = (new Date(year, month, 1).getDay() + 6) % 7;
  const calDays     = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const getEvento = (d, m, y) =>
    eventos.find((e) => e.fecha.date === d && e.fecha.month === m && e.fecha.year === y);
  const isPast  = (d, m, y) =>
    new Date(y, m, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isToday = (d, m, y) =>
    d === today.getDate() && m === today.getMonth() && y === today.getFullYear();

  // ── Clic en un día ──
  const handleDayClick = (date) => {
    const evento = getEvento(date, month, year);
    if (evento) {
      setModalDetalle(evento);
    } else {
      setForm(FORM_EMPTY);
      setModalCrear({ date, month, year });
    }
  };

  // ── Crear evento ──
  const handleCrear = () => {
    if (!isFormValido(form)) return;
    const nuevo = {
      id:         Date.now(),
      nombre:     form.nombre.trim(),
      duracion:   form.duracion,
      horaInicio: form.horaInicio,
      horaFin:    calcHoraFin(form.horaInicio, form.duracion),
      luchadores: form.luchadores,
      fecha:      { ...modalCrear },
    };
    setEventos((prev) => [...prev, nuevo]);
    setModalCrear(null);
    setForm(FORM_EMPTY);
    setModalExito(nuevo);
  };

  // ── Eliminar evento ──
  const handleEliminar = (id) => {
    setEventos((prev) => prev.filter((e) => e.id !== id));
    setModalDetalle(null);
  };

  // ── Editar evento ──
  const openEditar = (evento) => {
    setEditForm({
      nombre:     evento.nombre,
      duracion:   evento.duracion,
      horaInicio: evento.horaInicio,
      luchadores: evento.luchadores,
    });
    setModalDetalle(null);
    setModalEditar(evento);
  };

  const handleGuardarEdicion = () => {
    if (!isFormValido(editForm)) return;
    setEventos((prev) =>
      prev.map((e) =>
        e.id === modalEditar.id
          ? {
              ...e,
              nombre:     editForm.nombre.trim(),
              duracion:   editForm.duracion,
              horaInicio: editForm.horaInicio,
              horaFin:    calcHoraFin(editForm.horaInicio, editForm.duracion),
              luchadores: editForm.luchadores,
            }
          : e
      )
    );
    setModalEditar(null);
  };

  // ── Datos del sidebar ──
  const eventosEsteMes = eventos.filter(
    (e) => e.fecha.month === month && e.fecha.year === year
  );

  const upcomingEventos = eventos
    .filter((e) => {
      const d    = new Date(e.fecha.year, e.fecha.month, e.fecha.date);
      const diff = (d - today) / 86400000;
      return diff >= 0 && diff <= 90;
    })
    .sort(
      (a, b) =>
        new Date(a.fecha.year, a.fecha.month, a.fecha.date) -
        new Date(b.fecha.year, b.fecha.month, b.fecha.date)
    );

  const formatFecha = (fecha) => {
    const anio = fecha.year !== today.getFullYear() ? ` ${fecha.year}` : '';
    return `${fecha.date} de ${MONTH_NAMES[fecha.month]}${anio}`;
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-sportshausen-light">
      <Header userType="agrupacion" isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <SideNav
        active="calendar"
        onSelect={() => {}}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex flex-col pt-16 md:ml-64">
        <div className="max-w-5xl mx-auto w-full px-4 py-8">

          {/* Encabezado de página */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-sportshausen-dark">Agenda de Eventos</h1>
            <p className="text-gray-500 mt-1">
              Gestiona los eventos de tu agrupación. Haz clic en un día para crear o revisar eventos.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── GRILLA CALENDARIO ── */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">

              {/* Navegación de mes */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevMonth}
                  className="p-2 hover:bg-sporthausen-neutral-light rounded-lg transition-colors"
                >
                  <ChevronLeft size={22} className="text-sportshausen-red" />
                </button>
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-sportshausen-dark">
                    {MONTH_NAMES[month]}
                  </h2>
                  <p className="text-gray-400 text-sm">{year}</p>
                </div>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-sporthausen-neutral-light rounded-lg transition-colors"
                >
                  <ChevronRight size={22} className="text-sportshausen-red" />
                </button>
              </div>

              {/* Cabeceras de días */}
              <div className="grid grid-cols-7 mb-2">
                {DAY_NAMES.map((d) => (
                  <div key={d} className="text-center text-xs font-bold text-gray-400 py-2">
                    {d}
                  </div>
                ))}
              </div>

              {/* Días */}
              <div className="grid grid-cols-7 gap-1">
                {calDays.map((date, idx) => {
                  if (!date) return <div key={idx} />;
                  const evento = getEvento(date, month, year);
                  const past   = isPast(date, month, year);
                  const tod    = isToday(date, month, year);

                  return (
                    <button
                      key={idx}
                      disabled={past}
                      onClick={() => handleDayClick(date)}
                      title={evento ? evento.nombre : 'Agregar evento'}
                      className={`relative h-12 rounded-xl text-sm font-semibold transition-all focus:outline-none ${
                        past
                          ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                          : evento
                          ? 'bg-sportshausen-gold text-white shadow-sm hover:opacity-90 active:scale-95'
                          : 'cal-disponible hover:shadow-md active:scale-95'
                      } ${tod && !evento && !past ? 'ring-2 ring-sportshausen-dark' : ''}`}
                    >
                      {date}

                      {/* Punto indicador para días con evento */}
                      {evento && !past && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white/60" />
                      )}
                      {/* Punto de hoy sin evento */}
                      {tod && !evento && !past && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sportshausen-red" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Leyenda */}
              <div className="flex flex-wrap gap-5 mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-lg"
                    style={{ background: '#FFF3C0', border: '1.5px solid #FFD100' }}
                  />
                  <span className="text-xs text-gray-600">Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-sportshausen-gold" />
                  <span className="text-xs text-gray-600">Con evento</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-gray-100" />
                  <span className="text-xs text-gray-600">Pasado</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-lg cal-disponible ring-2 ring-sportshausen-dark"
                    style={{ background: '#FFF3C0', border: '1.5px solid #FFD100' }}
                  />
                  <span className="text-xs text-gray-600">Hoy</span>
                </div>
              </div>
            </div>

            {/* ── SIDEBAR ── */}
            <div className="space-y-4">

              {/* Estadísticas del mes */}
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="font-bold text-sportshausen-dark mb-4 flex items-center gap-2">
                  <Calendar size={16} className="text-sportshausen-red" />
                  {MONTH_NAMES[month]}
                </h3>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Eventos programados</span>
                  <span className="font-bold text-sportshausen-dark text-lg">
                    {eventosEsteMes.length}
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-sportshausen-gold transition-all"
                    style={{
                      width: `${Math.min(
                        (eventosEsteMes.length / Math.max(daysInMonth, 1)) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Próximos eventos */}
              <div className="bg-white rounded-2xl shadow-sm p-5">
                <h3 className="font-bold text-sportshausen-dark mb-3 flex items-center gap-2">
                  <Clock size={16} className="text-sportshausen-red" />
                  Próximos eventos
                </h3>

                {upcomingEventos.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">
                    No hay eventos en los próximos 90 días
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {upcomingEventos.slice(0, 5).map((ev) => (
                      <li
                        key={ev.id}
                        className="flex items-start justify-between gap-2 py-2.5 border-b border-gray-50 last:border-0"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-sportshausen-dark truncate">
                            {ev.nombre}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {formatFecha(ev.fecha)} · {ev.horaInicio}–{ev.horaFin}
                          </p>
                          <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                            <Users size={11} />
                            {ev.luchadores} luchadores
                          </p>
                        </div>
                        <div className="flex gap-1 flex-shrink-0 mt-0.5">
                          <button
                            onClick={() => openEditar(ev)}
                            className="p-1 text-gray-300 hover:text-sportshausen-gold transition-colors rounded"
                            title="Editar"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => handleEliminar(ev.id)}
                            className="p-1 text-gray-300 hover:text-sportshausen-red transition-colors rounded"
                            title="Eliminar"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Consejo */}
              <div className="bg-sportshausen-gold/10 border border-sportshausen-gold/30 rounded-2xl p-4">
                <p className="text-xs text-gray-700">
                  <strong>Consejo:</strong> Haz clic en cualquier día futuro para crear un evento.
                  Los días ocupados aparecen en teal. Puedes editar o eliminar desde la lista de
                  próximos eventos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* ═══════════════════════════════════════════════════════════
          MODAL 1 — CREAR EVENTO
      ═══════════════════════════════════════════════════════════ */}
      {modalCrear && (
        <Overlay onClose={() => setModalCrear(null)}>
          <ModalHeader
            title={`${modalCrear.date} de ${MONTH_NAMES[modalCrear.month]}`}
            onClose={() => setModalCrear(null)}
          />

          <div className="px-6 py-5">
            <EventoForm form={form} onChange={setForm} />
          </div>

          <ModalFooter>
            <button
              type="button"
              onClick={() => setForm(FORM_EMPTY)}
              className="btn-outline text-sm py-2 px-4"
            >
              Borrar todo
            </button>
            <button
              type="button"
              onClick={handleCrear}
              disabled={!isFormValido(form)}
              className={`btn-primary text-sm py-2 px-5 flex items-center gap-2 transition-all ${
                !isFormValido(form)
                  ? 'opacity-40 cursor-not-allowed !transform-none !shadow-none'
                  : ''
              }`}
            >
              <Plus size={15} />
              Crear evento
            </button>
          </ModalFooter>
        </Overlay>
      )}

      {/* ═══════════════════════════════════════════════════════════
          MODAL 2 — ÉXITO: EVENTO CREADO
      ═══════════════════════════════════════════════════════════ */}
      {modalExito && (
        <Overlay onClose={() => setModalExito(null)}>
          <div className="px-8 py-8 text-center">
            {/* Ícono de éxito */}
            <div className="w-20 h-20 rounded-full bg-sportshausen-gold/15 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 size={46} className="text-sportshausen-gold" />
            </div>

            <h3 className="text-2xl font-bold text-sportshausen-dark mb-1">
              ¡Felicitaciones!
            </h3>
            <p className="text-gray-500 mb-6 text-sm">
              Creaste tu evento exitosamente.
            </p>

            {/* Resumen del evento */}
            <div className="bg-sporthausen-neutral-light rounded-xl px-4 py-3 text-left mb-6">
              <ResumenRow label="Nombre"       value={modalExito.nombre} />
              <ResumenRow label="Fecha"        value={formatFecha(modalExito.fecha)} />
              <ResumenRow
                label="Horario"
                value={`${modalExito.horaInicio} – ${modalExito.horaFin} (${modalExito.duracion} hrs)`}
              />
              <ResumenRow
                label="Luchadores"
                value={`${modalExito.luchadores} participantes`}
              />
            </div>

            <button
              onClick={() => setModalExito(null)}
              className="btn-primary w-full"
            >
              Cerrar
            </button>
          </div>
        </Overlay>
      )}

      {/* ═══════════════════════════════════════════════════════════
          MODAL 3 — DETALLE EVENTO (ver / editar / eliminar)
      ═══════════════════════════════════════════════════════════ */}
      {modalDetalle && (
        <Overlay onClose={() => setModalDetalle(null)}>
          <ModalHeader
            title={modalDetalle.nombre}
            onClose={() => setModalDetalle(null)}
          />

          <div className="px-6 py-5">
            <div className="bg-sporthausen-neutral-light rounded-xl px-4 py-3">
              <ResumenRow label="Fecha"    value={formatFecha(modalDetalle.fecha)} />
              <ResumenRow
                label="Horario"
                value={`${modalDetalle.horaInicio} – ${modalDetalle.horaFin} (${modalDetalle.duracion} hrs)`}
              />
              <ResumenRow
                label="Luchadores"
                value={`${modalDetalle.luchadores} participantes`}
              />
            </div>
          </div>

          <ModalFooter>
            {/* Eliminar a la izquierda */}
            <button
              onClick={() => handleEliminar(modalDetalle.id)}
              className="flex items-center gap-1.5 text-sm text-sportshausen-red font-semibold
                hover:underline transition-colors"
            >
              <Trash2 size={14} />
              Eliminar
            </button>

            {/* Cerrar + Editar a la derecha */}
            <div className="flex gap-2">
              <button
                onClick={() => setModalDetalle(null)}
                className="btn-outline text-sm py-2 px-4"
              >
                Cerrar
              </button>
              <button
                onClick={() => openEditar(modalDetalle)}
                className="btn-teal text-sm py-2 px-4 flex items-center gap-1.5"
              >
                <Edit3 size={14} />
                Editar
              </button>
            </div>
          </ModalFooter>
        </Overlay>
      )}

      {/* ═══════════════════════════════════════════════════════════
          MODAL 4 — EDITAR EVENTO
      ═══════════════════════════════════════════════════════════ */}
      {modalEditar && (
        <Overlay onClose={() => setModalEditar(null)}>
          <ModalHeader
            title="Editar evento"
            onClose={() => setModalEditar(null)}
          />

          <div className="px-6 py-5">
            <EventoForm form={editForm} onChange={setEditForm} />
          </div>

          <ModalFooter>
            <button
              onClick={() => setModalEditar(null)}
              className="btn-outline text-sm py-2 px-4"
            >
              Cancelar
            </button>
            <button
              onClick={handleGuardarEdicion}
              disabled={!isFormValido(editForm)}
              className={`btn-primary text-sm py-2 px-5 flex items-center gap-2 ${
                !isFormValido(editForm)
                  ? 'opacity-40 cursor-not-allowed !transform-none !shadow-none'
                  : ''
              }`}
            >
              <Check size={15} />
              Guardar cambios
            </button>
          </ModalFooter>
        </Overlay>
      )}
    </div>
  );
}
