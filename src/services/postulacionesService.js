const KEY = 'sh_postulaciones';

const read = () => {
  try { return JSON.parse(localStorage.getItem(KEY) || '[]'); }
  catch { return []; }
};
const write = (data) => localStorage.setItem(KEY, JSON.stringify(data));

export const crearPostulacion = (data) => {
  const all = read();
  if (all.some(p => String(p.luchador_id) === String(data.luchador_id) && p.evento_id === data.evento_id)) {
    throw new Error('Ya te has postulado a este evento');
  }
  const nueva = { ...data, id: Date.now(), estado: 'PENDIENTE', fecha: new Date().toISOString() };
  write([...all, nueva]);
  return nueva;
};

export const getPostulacionesAgrupacion = (agrupacionId) =>
  read().filter(p => String(p.agrupacion_id) === String(agrupacionId));

export const getPostulacionesLuchador = (luchadorId) =>
  read().filter(p => String(p.luchador_id) === String(luchadorId));

export const aceptarPostulacion = (id) => {
  const all = read().map(p => p.id === id ? { ...p, estado: 'ACEPTADA' } : p);
  write(all);
  return all.find(p => p.id === id);
};

export const rechazarPostulacion = (id) => {
  const all = read().map(p => p.id === id ? { ...p, estado: 'RECHAZADA' } : p);
  write(all);
  return all.find(p => p.id === id);
};

// Notificaciones del luchador (para el tab notificaciones)
const NOTIF_KEY = 'sh_notificaciones_luchador';
export const agregarNotificacionLuchador = (luchadorId, msg) => {
  const key = `${NOTIF_KEY}_${luchadorId}`;
  const all = (() => { try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; } })();
  localStorage.setItem(key, JSON.stringify([
    { id: Date.now(), msg, fecha: new Date().toISOString(), leido: false },
    ...all,
  ]));
};
export const getNotificacionesLuchador = (luchadorId) => {
  const key = `${NOTIF_KEY}_${luchadorId}`;
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
};
