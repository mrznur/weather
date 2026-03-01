const KEY = import.meta.env.VITE_WEATHERAPI_KEY;
const BASE = "https://api.weatherapi.com/v1";

function ensureKey() {
  if (!KEY) {
    throw new Error("Missing API key. Add VITE_WEATHERAPI_KEY to the root .env file.");
  }
}

async function fetchJson(url) {
  const res = await fetch(url);
  const data = await res.json().catch(() => null);

  if (!res.ok || data?.error) {
    const msg = data?.error?.message || `API error (${res.status}). Try again.`;
    throw new Error(msg);
  }
  return data;
}

export async function getForecast({ q, days = 7, aqi = "no", alerts = "no" }) {
  ensureKey();
  const query = encodeURIComponent(q.trim());
  const url = `${BASE}/forecast.json?key=${KEY}&q=${query}&days=${days}&aqi=${aqi}&alerts=${alerts}`;
  return fetchJson(url);
}


export async function searchLocations({ q }) {
  ensureKey();
  const query = encodeURIComponent(q.trim());
  const url = `${BASE}/search.json?key=${KEY}&q=${query}`;
  return fetchJson(url);
}