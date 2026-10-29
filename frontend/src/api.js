const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export async function fetchMatches(signal) {
  const response = await fetch(`${API_BASE}/matches`, { signal });
  if (!response.ok) throw new Error("Unable to load matches");
  return response.json();
}

export async function fetchMatch(id, signal) {
  const response = await fetch(`${API_BASE}/matches/${id}`, { signal });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.message || "Unable to load match");
  }
  return response.json();
}
