"use client";

import { useEffect, useState } from "react";
import { permissionsApi, Permission } from "@/lib/api";

const ENDPOINT_METHOD: Record<string, { method: string; color: string }> = {
  get: { method: "GET", color: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  post: { method: "POST", color: "bg-blue-50 text-blue-700 ring-blue-200" },
  put: { method: "PUT", color: "bg-amber-50 text-amber-700 ring-amber-200" },
  delete: { method: "DELETE", color: "bg-red-50 text-red-700 ring-red-200" },
};

function inferMethod(endpoint: string): string {
  const lower = endpoint.toLowerCase();
  if (lower.includes("/delete") || lower.endsWith("/remove")) return "delete";
  if (lower.includes("/update") || lower.includes("/edit") || lower.includes("/put")) return "put";
  if (lower.includes("/create") || lower.includes("/add") || lower.includes("/post")) return "post";
  return "get";
}

export default function AdminPermissionPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchPermissions = async (p = page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await permissionsApi.getAll(p, pageSize);
      setPermissions(data.items);
      setTotalPage(data.totalPage || 1);
      setPage(data.page);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Không thể tải danh sách quyền hạn");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions(1);
  }, []);

  const filtered = search.trim()
    ? permissions.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.endpoint.toLowerCase().includes(search.toLowerCase()) ||
          p.desc.toLowerCase().includes(search.toLowerCase())
      )
    : permissions;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Quyền hạn (Permissions)</h1>
          <p className="mt-1 text-sm text-gray-500">Danh sách các endpoint quyền hạn trong hệ thống</p>
        </div>
        <button
          onClick={() => fetchPermissions(page)}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          <i className="fa-solid fa-rotate text-xs" /> Làm mới
        </button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Tổng quyền hạn</p>
          <p className="mt-2 text-2xl font-bold text-[#07275A]">{permissions.length}</p>
          <p className="mt-1 text-xs text-gray-400">Trang hiện tại</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Endpoint đọc</p>
          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {permissions.filter((p) => inferMethod(p.endpoint) === "get").length}
          </p>
          <p className="mt-1 text-xs text-gray-400">Phương thức GET</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Endpoint ghi</p>
          <p className="mt-2 text-2xl font-bold text-blue-600">
            {permissions.filter((p) => inferMethod(p.endpoint) !== "get").length}
          </p>
          <p className="mt-1 text-xs text-gray-400">POST / PUT / DELETE</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm theo tên, endpoint, mô tả..."
          className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#07275A] focus:ring-2 focus:ring-[#07275A]/10"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {error && (
          <div className="mx-4 mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            <i className="fa-solid fa-triangle-exclamation mr-2" />
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Tên quyền</th>
                <th className="px-4 py-3 font-medium">Mô tả</th>
                <th className="px-4 py-3 font-medium">Endpoint</th>
                <th className="px-4 py-3 font-medium">Phương thức</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-gray-400">
                    <i className="fa-solid fa-spinner fa-spin mr-2" /> Đang tải dữ liệu...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-gray-400">
                    {search ? "Không tìm thấy kết quả phù hợp" : "Chưa có quyền hạn nào trong hệ thống"}
                  </td>
                </tr>
              ) : (
                filtered.map((p, i) => {
                  const method = inferMethod(p.endpoint);
                  const style = ENDPOINT_METHOD[method] || ENDPOINT_METHOD.get;
                  return (
                    <tr key={p.uuid} className="hover:bg-gray-50/60">
                      <td className="px-4 py-3 text-xs tabular-nums text-gray-400">{(page - 1) * pageSize + i + 1}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                      <td className="max-w-[260px] truncate px-4 py-3 text-gray-600" title={p.desc}>
                        {p.desc || <span className="text-gray-300">--</span>}
                      </td>
                      <td className="px-4 py-3">
                        <code className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">{p.endpoint}</code>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${style.color}`}>
                          {style.method}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 text-sm">
          <span className="text-xs text-gray-500">
            Trang {page} / {totalPage}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page <= 1 || loading}
              onClick={() => {
                const p = Math.max(1, page - 1);
                setPage(p);
                fetchPermissions(p);
              }}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium disabled:opacity-40 hover:bg-gray-50"
            >
              Trước
            </button>
            <button
              disabled={page >= totalPage || loading}
              onClick={() => {
                const p = Math.min(totalPage, page + 1);
                setPage(p);
                fetchPermissions(p);
              }}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium disabled:opacity-40 hover:bg-gray-50"
            >
              Sau
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
