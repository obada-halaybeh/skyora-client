import { adminUsers } from "../data/adminUsers";

let users = [...adminUsers];
const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));

export async function getUsers() {
  await delay();
  return [...users];
  // LATER: return fetch("/api/users").then((r) => r.json());
}

export async function addUser(user) {
  await delay();
  const newUser = { ...user, id: Date.now() };
  users = [newUser, ...users];
  return newUser;
  // LATER: POST /api/users
}

export async function updateUser(id, updates) {
  await delay();
  users = users.map((u) => (u.id === id ? { ...u, ...updates } : u));
  return users.find((u) => u.id === id);
  // LATER: PUT /api/users/:id
}

export async function deleteUser(id) {
  await delay();
  users = users.filter((u) => u.id !== id);
  return { success: true };
  // LATER: DELETE /api/users/:id
}
