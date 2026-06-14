import { adminBookings } from "../data/adminBookings";

let bookings = [...adminBookings];
const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));

export async function getBookings() {
  await delay();
  return [...bookings];
  // LATER: return fetch("/api/bookings").then((r) => r.json());
}

export async function updateBookingStatus(id, status) {
  await delay();
  bookings = bookings.map((b) => (b.id === id ? { ...b, status } : b));
  return bookings.find((b) => b.id === id);
  // LATER: PUT /api/bookings/:id  body: { status }
}

export async function deleteBooking(id) {
  await delay();
  bookings = bookings.filter((b) => b.id !== id);
  return { success: true };
  // LATER: DELETE /api/bookings/:id
}
