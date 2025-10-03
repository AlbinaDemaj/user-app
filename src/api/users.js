const BASE = "https://jsonplaceholder.typicode.com";

export async function fetchUsers() {
  const res = await fetch(`${BASE}/users`);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}
