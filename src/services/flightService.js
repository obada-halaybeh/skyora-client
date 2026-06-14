import { adminFlights } from "../data/adminFlights";

// In-memory copy we can mutate (simulates the database)
let flights = [...adminFlights];

// Simulate network delay so it behaves like a real API
const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));

// GET all flights
export async function getFlights() {
  await delay();
  return [...flights];
  // LATER: return fetch("/api/flights").then((r) => r.json());
}

// CREATE a flight
export async function addFlight(flight) {
  await delay();
  const newFlight = {
    ...flight,
    id: Date.now(), // temporary unique id; the backend will assign the real one
  };
  flights = [newFlight, ...flights];
  return newFlight;
  // LATER:
  // return fetch("/api/flights", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(flight),
  // }).then((r) => r.json());
}

// UPDATE a flight
export async function updateFlight(id, updates) {
  await delay();
  flights = flights.map((f) => (f.id === id ? { ...f, ...updates } : f));
  return flights.find((f) => f.id === id);
  // LATER:
  // return fetch(`/api/flights/${id}`, {
  //   method: "PUT",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(updates),
  // }).then((r) => r.json());
}

// DELETE a flight
export async function deleteFlight(id) {
  await delay();
  flights = flights.filter((f) => f.id !== id);
  return { success: true };
  // LATER:
  // return fetch(`/api/flights/${id}`, { method: "DELETE" }).then((r) => r.json());
}
