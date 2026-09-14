export const ENDPOINT_METHOD: Record<string, { method: string; color: string }> = {
  get: { method: "GET", color: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  post: { method: "POST", color: "bg-blue-50 text-blue-700 ring-blue-200" },
  put: { method: "PUT", color: "bg-amber-50 text-amber-700 ring-amber-200" },
  delete: { method: "DELETE", color: "bg-red-50 text-red-700 ring-red-200" },
};

export function inferMethod(endpoint: string): string {
  const lower = endpoint.toLowerCase();
  if (lower.includes("/delete") || lower.endsWith("/remove")) return "delete";
  if (lower.includes("/update") || lower.includes("/edit") || lower.includes("/put")) return "put";
  if (lower.includes("/create") || lower.includes("/add") || lower.includes("/post")) return "post";
  return "get";
}
