import { useState } from "react";

export default function AddUserForm({ onAdd }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Name and email are required");
      return;
    }
    const newUser = {
      id: -Date.now(),
      name: name.trim(),
      email: email.trim(),
      company: { name: company.trim() || "—" },
      address: { city: "—" },
      phone: "—",
      website: "—",
    };
    onAdd(newUser);
    setName("");
    setEmail("");
    setCompany("");
    setError("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-3 md:grid-cols-4 md:items-start"
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name *"
        className="rounded-lg border px-3 py-2 text-sm"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email *"
        className="rounded-lg border px-3 py-2 text-sm"
      />
      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company"
        className="rounded-lg border px-3 py-2 text-sm"
      />
      <button
        type="submit"
        className="rounded-lg bg-black px-4 py-2 text-sm text-white transition hover:opacity-90"
      >
        Add user
      </button>

      {error && (
        <p className="col-span-full text-sm text-red-600">{error}</p>
      )}
    </form>
  );
}
