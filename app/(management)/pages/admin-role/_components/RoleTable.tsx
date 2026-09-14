"use client";

import { RoleItem } from "@/lib/role/IRole";

const STATUS_LABEL: Record<number, { label: string; cls: string }> = {
  0: { label: "Hoạt động", cls: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  1: { label: "Không hoạt động", cls: "bg-gray-100 text-gray-600 ring-gray-200" },
};

interface RoleTableProps {
  roles: RoleItem[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPage: number;
  onRefresh: () => void;
  onEdit: (role: RoleItem) => void;
  onDelete: (role: RoleItem) => void;
  onPageChange: (newPage: number) => void;
}

export function RoleTable({
  roles,
  loading,
  error,
  page,
  totalPage,
  onRefresh,
  onEdit,
  onDelete,
  onPageChange,
}: RoleTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-900">Danh sách vai trò</h2>
        <button
          onClick={onRefresh}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
        >
          <i className="fa-solid fa-rotate mr-1" /> Làm mới
        </button>
      </div>

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
              <th className="px-4 py-3 font-medium">Tên</th>
              <th className="px-4 py-3 font-medium">Mô tả</th>
              <th className="px-4 py-3 font-medium">Bác sĩ</th>
              <th className="px-4 py-3 font-medium">Trạng thái</th>
              <th className="px-4 py-3 font-medium text-right">Tài khoản</th>
              <th className="px-4 py-3 font-medium text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-gray-400">
                  <i className="fa-solid fa-spinner fa-spin mr-2" /> Đang tải dữ liệu...
                </td>
              </tr>
            ) : roles.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-sm text-gray-400">
                  Chưa có vai trò nào. Nhấn &quot;Thêm vai trò&quot; để tạo mới.
                </td>
              </tr>
            ) : (
              roles.map((r) => (
                <tr key={r.uuid} className="hover:bg-gray-50/60">
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-900">{r.name}</span>
                    <span className="ml-2 hidden font-mono text-[11px] text-gray-400 lg:inline">
                      {r.uuid.slice(0, 8)}...
                    </span>
                  </td>
                  <td className="max-w-55 truncate px-4 py-3 text-gray-600" title={r.desc}>
                    {r.desc || <span className="text-gray-300">--</span>}
                  </td>
                  <td className="px-4 py-3">
                    {r.isDefault ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 ring-1 ring-amber-200">
                        <i className="fa-solid fa-user-doctor text-[10px]" /> Tạo profile Bác sĩ
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">--</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${STATUS_LABEL[r.status]?.cls || STATUS_LABEL[0].cls}`}
                    >
                      {STATUS_LABEL[r.status]?.label || "Không xác định"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="inline-flex min-w-8 justify-center rounded-full bg-[#07275A] px-2.5 py-1 text-xs font-semibold text-white">
                      {r.accountCount}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => onEdit(r)}
                        className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#07275A] hover:bg-[#07275A]/10"
                        title="Sửa"
                      >
                        <i className="fa-solid fa-pen mr-1" /> Sửa
                      </button>
                      <button
                        onClick={() => onDelete(r)}
                        className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                        title="Xóa"
                      >
                        <i className="fa-solid fa-trash mr-1" /> Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
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
