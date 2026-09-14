"use client";

import { PermissionItem } from "@/lib/permission/IPermission";
import { ENDPOINT_METHOD, inferMethod } from "./helpers";

interface PermissionTableProps {
  filtered: PermissionItem[];
  loading: boolean;
  error: string | null;
  page: number;
  pageSize: number;
  totalPage: number;
  search: string;
  onPageChange: (newPage: number) => void;
}

export function PermissionTable({
  filtered,
  loading,
  error,
  page,
  pageSize,
  totalPage,
  search,
  onPageChange,
}: PermissionTableProps) {
  return (
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
                    <td className="px-4 py-3 text-xs tabular-nums text-gray-400">
                      {(page - 1) * pageSize + i + 1}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                    <td className="max-w-65 truncate px-4 py-3 text-gray-600" title={p.desc}>
                      {p.desc || <span className="text-gray-300">--</span>}
                    </td>
                    <td className="px-4 py-3">
                      <code className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">{p.endpoint}</code>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${style.color}`}
                      >
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

      <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 text-sm">
        <span className="text-xs text-gray-500">
          Trang {page} / {totalPage}
        </span>
        <div className="flex gap-2">
          <button
            disabled={page <= 1 || loading}
            onClick={() => onPageChange(Math.max(1, page - 1))}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium disabled:opacity-40 hover:bg-gray-50"
          >
            Trước
          </button>
          <button
            disabled={page >= totalPage || loading}
            onClick={() => onPageChange(Math.min(totalPage, page + 1))}
            className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium disabled:opacity-40 hover:bg-gray-50"
          >
            Sau
          </button>
        </div>
      </div>
    </div>
  );
}
