import { authUsers } from "../data/authUsers";

const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

// Simulates the backend verifying credentials and returning the user (with role).
export async function login(email, password) {
  await delay();

  const user = authUsers.find(
    (u) => u.email === email && u.password === password,
  );

  if (!user) {
    // Backend would return a 401; we throw so the page can catch it
    throw new Error("Invalid email or password");
  }

  // Return the user WITHOUT the password (never expose it)
  return { id: user.id, email: user.email, role: user.role, name: user.name };

  // LATER (real backend):
  // const res = await fetch("/api/auth/login", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email, password }),
  // });
  // if (!res.ok) throw new Error("Invalid email or password");
  // return res.json();   // backend returns { id, email, role, name, token }
}
