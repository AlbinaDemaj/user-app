import { Link } from "react-router-dom";

function initial(name = "") {
  const n = name.trim();
  if (!n) return "?";
  const parts = n.split(" ");
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}

export default function UserCard({ user }) {
  return (
    <Link
      to={`/users/${user.id}`}
      state={{ user }}
      className="group block rounded-2xl border bg-white p-4 shadow-sm ring-1 ring-transparent transition hover:shadow-md hover:ring-slate-200"
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
          {initial(user.name)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-medium leading-tight">
            {user.name}
          </h3>
          <p className="truncate text-sm text-slate-600">{user.email}</p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <span className="rounded-full bg-slate-50 px-2 py-1 text-xs text-slate-700">
          {user.company?.name || "—"}
        </span>
        <span className="translate-x-0 text-slate-400 transition group-hover:translate-x-0.5">
          →
        </span>
      </div>
    </Link>
  );
}
