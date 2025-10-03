export default function SearchBar({ value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search by name or email..."
      className="w-full md:w-64 rounded-lg border px-3 py-2 text-sm focus:outline-none"
    />
  );
}
