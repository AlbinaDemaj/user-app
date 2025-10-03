import useUsers from "../hooks/useUsers";
import SearchBar from "../components/SearchBar";
import AddUserForm from "../components/AddUserForm";
import UserCard from "../components/UserCard";

function SkeletonCard() {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3 animate-pulse">
        <div className="h-10 w-10 rounded-full bg-slate-200" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-40 bg-slate-200 rounded" />
          <div className="h-3 w-56 bg-slate-200 rounded" />
        </div>
      </div>
      <div className="mt-3 h-5 w-24 bg-slate-200 rounded" />
    </div>
  );
}

export default function UsersPage() {
  const {
    loading,
    error,
    visibleUsers,
    query,
    sortBy,
    setQuery,
    setSortBy,
    addLocal,
    clearSearch,
  } = useUsers();

  function handleAdd(u) {
    addLocal(u);
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <section className="rounded-2xl border bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="h-6 w-24 bg-slate-200 rounded animate-pulse" />
            <div className="flex flex-wrap items-center gap-3">
              <div className="h-9 w-64 bg-slate-200 rounded animate-pulse" />
              <div className="h-9 w-40 bg-slate-200 rounded animate-pulse" />
            </div>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-4">
            <div className="h-9 bg-slate-200 rounded animate-pulse" />
            <div className="h-9 bg-slate-200 rounded animate-pulse" />
            <div className="h-9 bg-slate-200 rounded animate-pulse" />
            <div className="h-9 bg-slate-200 rounded animate-pulse" />
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </section>
      </div>
    );
  }

  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-semibold">Users</h1>
          <div className="flex flex-wrap items-center gap-3">
            <SearchBar value={query} onChange={setQuery} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border px-3 py-2 text-sm"
            >
              <option value="name_asc">Name ↑</option>
              <option value="name_desc">Name ↓</option>
              <option value="email_asc">Email ↑</option>
              <option value="company_asc">Company ↑</option>
            </select>
            {query && (
              <button
                onClick={clearSearch}
                className="rounded-lg border px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                Clear search
              </button>
            )}
          </div>
        </div>

        <div className="mt-4">
          <h2 className="mb-2 text-sm font-medium text-slate-700">
            Add new user (local only)
          </h2>
          <AddUserForm onAdd={handleAdd} />
        </div>
      </section>

      {visibleUsers.length === 0 ? (
        <div className="rounded-2xl border bg-white p-10 text-center text-slate-500">
          No matches found.
          {query ? (
            <div className="mt-3">
              <button
                onClick={clearSearch}
                className="rounded-lg border px-3 py-2 text-sm hover:bg-slate-50"
              >
                Clear search
              </button>
            </div>
          ) : null}
        </div>
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleUsers.map((u) => (
            <UserCard key={u.id} user={u} />
          ))}
        </section>
      )}
    </div>
  );
}
