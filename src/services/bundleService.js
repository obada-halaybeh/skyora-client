import { adminBundles } from "../data/adminBundles";

let bundles = [...adminBundles];
const delay = (ms = 200) => new Promise((res) => setTimeout(res, ms));

export async function getBundles() {
  await delay();
  return [...bundles];
  // LATER: return fetch("/api/bundles").then((r) => r.json());
}

export async function addBundle(bundle) {
  await delay();
  const newBundle = { ...bundle, id: Date.now() };
  bundles = [newBundle, ...bundles];
  return newBundle;
  // LATER: POST /api/bundles
}

export async function updateBundle(id, updates) {
  await delay();
  bundles = bundles.map((b) => (b.id === id ? { ...b, ...updates } : b));
  return bundles.find((b) => b.id === id);
  // LATER: PUT /api/bundles/:id
}

export async function deleteBundle(id) {
  await delay();
  bundles = bundles.filter((b) => b.id !== id);
  return { success: true };
  // LATER: DELETE /api/bundles/:id
}
