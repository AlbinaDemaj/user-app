import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { formatWebsite } from "../utils";

export default function UserDetailsPage() {
  const { id } = useParams();
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || null);
  const [loading, setLoading] = useState(!user && Number(id) > 0);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user || Number(id) < 0) return;
    (async () => {
      try {
        const r = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!r.ok) throw new Error();
        setUser(await r.json());
      } catch {
        setError("Could not load user");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, user]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!user) return <p>User not found.</p>;

  const address = user.address
    ? `${user.address.street || ""} ${user.address.suite || ""}, ${user.address.city || ""}`.trim()
    : "—";

  return (
    <div className="space-y-4">
      <Link to="/" className="inline-block text-sm text-blue-700">
        ← Back
      </Link>

      <div className="rounded-2xl border bg-white p-6">
        <h1 className="text-2xl font-semibold">{user.name}</h1>
        <p className="text-sm text-slate-600">{user.email}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-slate-50 p-4">
            <div className="text-sm">
              <div><span className="font-medium">Company:</span> {user.company?.name || "—"}</div>
              <div><span className="font-medium">Phone:</span> {user.phone || "—"}</div>
              <div><span className="font-medium">Website:</span> {user.website || "—"}</div>
              <div><span className="font-medium">Address:</span> {address}</div>
            <div><span className="font-medium">Website:</span> {formatWebsite(user.website)}</div>

            </div>
          </div>
          <div className="rounded-xl border bg-slate-50 p-4">
            <p className="text-sm text-slate-600">
              This is a fake API (JSONPlaceholder). Data updates are local only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
