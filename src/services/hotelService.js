import { adminHotels } from "../data/adminHotels";

let hotels = [...adminHotels];
const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));

export async function getHotels() {
  await delay();
  return [...hotels];
  // LATER: return fetch("/api/hotels").then((r) => r.json());
}

export async function addHotel(hotel) {
  await delay();
  const newHotel = { ...hotel, id: Date.now() };
  hotels = [newHotel, ...hotels];
  return newHotel;
  // LATER: POST /api/hotels
}

export async function updateHotel(id, updates) {
  await delay();
  hotels = hotels.map((h) => (h.id === id ? { ...h, ...updates } : h));
  return hotels.find((h) => h.id === id);
  // LATER: PUT /api/hotels/:id
}

export async function deleteHotel(id) {
  await delay();
  hotels = hotels.filter((h) => h.id !== id);
  return { success: true };
  // LATER: DELETE /api/hotels/:id
}
