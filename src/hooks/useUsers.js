import { useEffect, useMemo, useState } from "react";

const BASE = "https://jsonplaceholder.typicode.com";

function loadLocals() {
  try {
    return JSON.parse(localStorage.getItem("locals") || "[]");
  } catch {
    return [];
  }
}
function saveLocals(list) {
  try {
    localStorage.setItem("locals", JSON.stringify(list));
  } catch {}
}

const sorters = {
  name_asc: (a, b) => a.name.localeCompare(b.name),
  name_desc: (a, b) => b.name.localeCompare(a.name),
  email_asc: (a, b) => a.email.localeCompare(b.email),
  company_asc: (a, b) =>
    (a.company?.name || "").localeCompare(b.company?.name || ""),
};

export default function useUsers() {
  const [remote, setRemote] = useState([]);
  const [locals, setLocals] = useState(loadLocals());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("name_asc");

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(`${BASE}/users`);
        if (!r.ok) throw new Error();
        setRemote(await r.json());
      } catch {
        setError("Could not load users");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    saveLocals(locals);
  }, [locals]);

  const visibleUsers = useMemo(() => {
    const merged = [...locals, ...remote];
    const q = query.trim().toLowerCase();
    const filtered = q
      ? merged.filter(
          (u) =>
            u.name.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q)
        )
      : merged;
    const sorter = sorters[sortBy] || sorters.name_asc;
    return [...filtered].sort(sorter);
  }, [locals, remote, query, sortBy]);

  function addLocal({ name, email, company }) {
    const newUser = {
      id: -Date.now(),
      name: name.trim(),
      email: email.trim(),
      company: { name: (company || "").trim() || "—" },
      address: { city: "—" },
      phone: "—",
      website: "—",
    };
    setLocals((prev) => [newUser, ...prev]);
  }

  function clearSearch() {
    setQuery("");
  }

  return {
    // state
    loading,
    error,
    visibleUsers,
    query,
    sortBy,
    // actions
    setQuery,
    setSortBy,
    addLocal,
    clearSearch,
  };
}
