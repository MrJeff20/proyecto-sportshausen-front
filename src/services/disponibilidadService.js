const XANO_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:disponibilidad/disponibilidad';

const headers = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handle = async (res) => {
  if (!res.ok) {
    let msg = `Error ${res.status}`;
    try { const b = await res.json(); msg = b?.message || b?.error || msg; } catch {}
    throw new Error(msg);
  }
  const text = await res.text();
  return text ? JSON.parse(text) : {};
};

export const getFechas = () =>
  fetch(XANO_URL, { headers: headers() }).then(handle);

export const upsertFecha = (fecha, status, razon = '') => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const user_id = user.id || localStorage.getItem('userId');
  return fetch(XANO_URL, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({ fecha, status, razon, user_id }),
  }).then(handle);
};

export const deleteFecha = (fecha) =>
  fetch(`${XANO_URL}/${fecha}`, {
    method: 'DELETE',
    headers: headers(),
  }).then(handle);
