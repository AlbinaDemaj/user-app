export function formatWebsite(url = "") {
  const t = url.trim();
  if (!t) return "—";
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}
