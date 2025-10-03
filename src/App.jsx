import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UsersPage from "./pages/UsersPage.jsx";
import UserDetailsPage from "./pages/UserDetailsPage.jsx";
import "./index.css";

export default function App() {
  return (
    <BrowserRouter>
      <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            User Management
          </Link>
          <nav className="text-sm text-slate-600">React • Routing • Forms</nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
