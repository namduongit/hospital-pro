"use client";

import Link from "next/link";
import { AccountItem } from "@/lib/account/IAccount";

const STATUS_LABEL: Record<number, { label: string; cls: string }> = {
  0: { label: "Hoạt động", cls: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  1: { label: "Không hoạt động", cls: "bg-gray-100 text-gray-600 ring-gray-200" },
};

interface AccountTableProps {
  accounts: AccountItem[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPage: number;
  onRefresh: () => void;
  onEdit: (account: AccountItem) => void;
  onDelete: (account: AccountItem) => void;
  onPageChange: (newPage: number) => void;
}

export function AccountTable({
  accounts,
  loading,
  error,
  page,
  totalPage,
  onRefresh,
  onEdit,
  onDelete,
  onPageChange,
}: AccountTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Table Header */}
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-gray-900">Danh sách tài khoản</h2>
        <button
          onClick={onRefresh}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
        >
          <i className="fa-solid fa-rotate mr-1" /> Làm mới
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mx-4 mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          <i className="fa-solid fa-triangle-exclamation mr-2" />
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Nhóm quyền</th>
              <th className="px-4 py-3 font-medium">Hồ sơ</th>
              <th className="px-4 py-3 font-medium">Trạng thái</th>
              <th className="px-4 py-3 font-medium text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-gray-400">
                  <i className="fa-solid fa-spinner fa-spin mr-2" /> Đang tải dữ liệu...
                </td>
              </tr>
            ) : accounts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-gray-400">
                  Chưa có tài khoản nào. Nhấn &quot;Thêm tài khoản&quot; để tạo mới.
                </td>
              </tr>
            ) : (
              accounts.map((a) => (
                <tr key={a.uuid} className="hover:bg-gray-50/60">
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-900">{a.email}</span>
                    <span className="ml-2 hidden font-mono text-[11px] text-gray-400 lg:inline">{a.uuid.slice(0, 8)}...</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1.5">
                      {a.roleIsDefault && (
                        <i className="fa-solid fa-user-doctor text-[#00C491]" title="Vai trò Bác sĩ" />
                      )}
                      <span className="text-gray-700">{a.roleName}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {a.doctorName ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#00C491]/10 px-2.5 py-1 text-xs font-medium text-[#007a5c]">
                        <i className="fa-solid fa-user-doctor text-[10px]" /> {a.doctorName}
                      </span>
                    ) : a.patientName ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                        <i className="fa-solid fa-user text-[10px]" /> {a.patientName}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">Chưa có hồ sơ</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${STATUS_LABEL[a.status]?.cls || STATUS_LABEL[0].cls}`}
                    >
                      {STATUS_LABEL[a.status]?.label || "Không xác định"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Link
                        href={`/pages/admin-account/${a.uuid}`}
                        className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
                        title="Xem chi tiết"
                      >
                        <i className="fa-solid fa-eye mr-1" /> Chi tiết
                      </Link>
                      <button
                        onClick={() => onEdit(a)}
                        className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#07275A] hover:bg-[#07275A]/10"
                        title="Sửa"
                      >
                        <i className="fa-solid fa-pen mr-1" /> Sửa
                      </button>
                      <button
                        onClick={() => onDelete(a)}
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

      {/* Pagination */}
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
