const BASE = 'https://x8ki-letl-twmt.n7.xano.io/api:sportshausen';

// ── Conversión de fecha ──────────────────────────────────────────────────────

// { date, month, year } → Unix ms (mediodía para evitar desfases de zona horaria)
const fechaObjToMs = ({ date, month, year }) =>
  new Date(year, month, date, 12, 0, 0).getTime();

// Unix ms de Xano → { date, month, year }
const msToFechaObj = (ms) => {
  const d = new Date(typeof ms === 'number' ? ms : Number(ms));
  return { date: d.getDate(), month: d.getMonth(), year: d.getFullYear() };
};

// ── Mapeo de campos Xano ↔ Frontend ─────────────────────────────────────────

const fromXano = (r) => ({
  id:         r.id,
  nombre:     r.nombre,
  duracion:   r.duracion,
  horaInicio: r.hora_inicio,
  horaFin:    r.hora_fin,
  luchadores: r.luchadores,
  fecha:      msToFechaObj(r.fecha),
});

const toXano = (ev) => ({
  nombre:      ev.nombre,
  duracion:    ev.duracion,
  hora_inicio: ev.horaInicio,
  hora_fin:    ev.horaFin,
  luchadores:  ev.luchadores,
  fecha:       fechaObjToMs(ev.fecha),
});

// ── HTTP helper ──────────────────────────────────────────────────────────────

const http = async (path, options = {}) => {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const msg  = body.message || body.error || JSON.stringify(body) || `HTTP ${res.status}`;
    console.error(`[Xano ${options.method || 'GET'} ${path}]`, res.status, body);
    throw new Error(msg);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
};

// ── Endpoints CRUD ───────────────────────────────────────────────────────────

// GET /eventos — lista todos los eventos
export const getEventos = () =>
  http('/eventos').then((data) => (Array.isArray(data) ? data.map(fromXano) : []));

// POST /eventos — crea un evento nuevo
// Xano devuelve body vacío en create/update, así que se refresca la lista completa
export const crearEvento = async (ev) => {
  const payload = toXano(ev);
  console.log('[Xano POST /eventos] payload →', payload);
  await http('/eventos', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  return getEventos();
};

// PUT /eventos/{id} — actualiza un evento existente
export const actualizarEvento = async (id, ev) => {
  await http(`/eventos/${id}`, {
    method: 'PUT',
    body: JSON.stringify(toXano(ev)),
  });
  return getEventos();
};

// DELETE /eventos/{id} — elimina un evento
export const eliminarEvento = (id) =>
  http(`/eventos/${id}`, { method: 'DELETE' });
