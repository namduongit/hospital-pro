"use client";

import { useEffect, useState } from "react";
import { rolesApi, Role, CreateRolePayload, UpdateRolePayload } from "@/lib/api";

const STATUS_LABEL: Record<number, { label: string; cls: string }> = {
  0: { label: "Hoạt động", cls: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  1: { label: "Không hoạt động", cls: "bg-gray-100 text-gray-600 ring-gray-200" },
};

const CHART_COLORS = ["#07275A", "#00C491", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#EC4899"];

function BarChart({ roles }: { roles: Role[] }) {
  const max = Math.max(1, ...roles.map((r) => r.accountCount));
  if (roles.length === 0) {
    return <p className="py-8 text-center text-sm text-gray-400">Chưa có dữ liệu vai trò</p>;
  }
  return (
    <div className="space-y-3">
      {roles.map((r, i) => (
        <div key={r.uuid} className="flex items-center gap-3">
          <span className="w-28 shrink-0 truncate text-right text-xs font-medium text-gray-600" title={r.name}>
            {r.name}
          </span>
          <div className="flex flex-1 items-center gap-2">
            <div className="h-6 flex-1 overflow-hidden rounded-full bg-gray-100">
              <div
                className="flex h-full items-center justify-end rounded-full pr-2 text-[11px] font-semibold text-white transition-all"
                style={{
                  width: `${Math.max(8, (r.accountCount / max) * 100)}%`,
                  background: CHART_COLORS[i % CHART_COLORS.length],
                  minWidth: r.accountCount > 0 ? 32 : undefined,
                }}
              >
                {r.accountCount > 0 ? r.accountCount : ""}
              </div>
            </div>
            <span className="w-8 text-xs tabular-nums text-gray-500">{r.accountCount}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function RoleModal({
  open,
  mode,
  initial,
  onClose,
  onSubmit,
  submitting,
}: {
  open: boolean;
  mode: "create" | "edit";
  initial: Partial<CreateRolePayload>;
  onClose: () => void;
  onSubmit: (data: CreateRolePayload | UpdateRolePayload) => void;
  submitting: boolean;
}) {
  const [name, setName] = useState(initial.name || "");
  const [desc, setDesc] = useState(initial.desc || "");
  const [isDefault, setIsDefault] = useState(initial.isDefault || false);
  const [status, setStatus] = useState<number>(initial.status ?? 0);

  useEffect(() => {
    setName(initial.name || "");
    setDesc(initial.desc || "");
    setIsDefault(initial.isDefault || false);
    setStatus(initial.status ?? 0);
  }, [initial.name, initial.desc, initial.isDefault, initial.status, open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">
            {mode === "create" ? "Thêm vai trò" : "Cập nhật vai trò"}
          </h3>
          <button onClick={onClose} className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-gray-600">Tên vai trò *</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: Admin, Doctor, Patient"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A] focus:ring-2 focus:ring-[#07275A]/10"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-gray-600">Mô tả</span>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              placeholder="Mô tả vai trò..."
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A] focus:ring-2 focus:ring-[#07275A]/10"
            />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-gray-600">Trạng thái</span>
              <select
                value={status}
                onChange={(e) => setStatus(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A]"
              >
                <option value={0}>Hoạt động</option>
                <option value={1}>Không hoạt động</option>
              </select>
            </label>
            <label className="flex items-end gap-2 pb-2">
              <input
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#07275A] focus:ring-[#07275A]"
              />
              <span className="text-sm font-medium text-gray-700">Mặc định (tạo profile Bác sĩ)</span>
            </label>
          </div>
          <p className="rounded-lg bg-[#07275A]/5 px-3 py-2 text-xs text-[#07275A]">
            <i className="fa-solid fa-circle-info mr-1.5" />
            Vai trò được đánh dấu mặc định: khi tạo tài khoản thuộc vai trò này, hệ thống sẽ tự động tạo profile Bác sĩ.
          </p>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            disabled={submitting || !name.trim()}
            onClick={() => onSubmit({ name: name.trim(), desc: desc.trim(), isDefault, status })}
            className="rounded-lg bg-[#07275A] px-5 py-2 text-sm font-medium text-white hover:bg-[#0a356f] disabled:opacity-50"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-spinner fa-spin" /> Đang lưu...
              </span>
            ) : mode === "create" ? (
              "Thêm mới"
            ) : (
              "Cập nhật"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminRolePage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Role | null>(null);

  const fetchRoles = async (p = page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await rolesApi.getAll(p, pageSize);
      setRoles(data.items);
      setTotalPage(data.totalPage || 1);
      setPage(data.page);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Không thể tải danh sách vai trò");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles(1);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleCreate = async (data: CreateRolePayload | UpdateRolePayload) => {
    setSubmitting(true);
    try {
      await rolesApi.create(data as CreateRolePayload);
      setModalOpen(false);
      showToast("Thêm vai trò thành công");
      fetchRoles(page);
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : "Thêm thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (data: CreateRolePayload | UpdateRolePayload) => {
    if (!editingRole) return;
    setSubmitting(true);
    try {
      await rolesApi.update(editingRole.uuid, data as UpdateRolePayload);
      setModalOpen(false);
      setEditingRole(null);
      showToast("Cập nhật vai trò thành công");
      fetchRoles(page);
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : "Cập nhật thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await rolesApi.delete(deleteTarget.uuid);
      setDeleteTarget(null);
      showToast("Đã xóa vai trò");
      fetchRoles(page);
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : "Xóa thất bại");
    }
  };

  const openCreate = () => {
    setModalMode("create");
    setEditingRole(null);
    setModalOpen(true);
  };
  const openEdit = (r: Role) => {
    setModalMode("edit");
    setEditingRole(r);
    setModalOpen(true);
  };

  const totalAccounts = roles.reduce((s, r) => s + r.accountCount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Quản lý vai trò</h1>
          <p className="mt-1 text-sm text-gray-500">Thêm, sửa, xóa vai trò và xem phân bố tài khoản theo vai trò</p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-[#07275A] px-4 py-2 text-sm font-medium text-white hover:bg-[#0a356f]"
        >
          <i className="fa-solid fa-plus text-xs" /> Thêm vai trò
        </button>
      </div>

      {/* Stats + Chart */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Tổng vai trò</p>
          <p className="mt-2 text-2xl font-bold text-[#07275A]">{roles.length}</p>
          <p className="mt-1 text-xs text-gray-400">Trên trang hiện tại</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Tổng tài khoản</p>
          <p className="mt-2 text-2xl font-bold text-[#00C491]">{totalAccounts}</p>
          <p className="mt-1 text-xs text-gray-400">Thuộc các vai trò hiển thị</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Vai trò Bác sĩ</p>
          <p className="mt-2 text-sm font-semibold text-gray-900">
            {roles.find((r) => r.isDefault)?.name || "Chưa đặt"}
          </p>
          <p className="mt-1 text-xs text-gray-400">Tài khoản thuộc vai trò này sẽ tự tạo profile Bác sĩ</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Phân bố tài khoản theo vai trò</h2>
          <span className="text-xs text-gray-400">Biểu đồ cột ngang</span>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-8 text-sm text-gray-400">
            <i className="fa-solid fa-spinner fa-spin mr-2" /> Đang tải...
          </div>
        ) : (
          <BarChart roles={roles} />
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-900">Danh sách vai trò</h2>
          <button
            onClick={() => fetchRoles(page)}
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
                      <span className="ml-2 hidden font-mono text-[11px] text-gray-400 lg:inline">{r.uuid.slice(0, 8)}...</span>
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
                          onClick={() => openEdit(r)}
                          className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#07275A] hover:bg-[#07275A]/10"
                          title="Sửa"
                        >
                          <i className="fa-solid fa-pen mr-1" /> Sửa
                        </button>
                        <button
                          onClick={() => setDeleteTarget(r)}
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
              onClick={() => {
                const p = Math.max(1, page - 1);
                setPage(p);
                fetchRoles(p);
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
                fetchRoles(p);
              }}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium disabled:opacity-40 hover:bg-gray-50"
            >
              Sau
            </button>
          </div>
        </div>
      </div>

      {/* Create/Edit modal */}
      <RoleModal
        open={modalOpen}
        mode={modalMode}
        initial={
          modalMode === "edit" && editingRole
            ? { name: editingRole.name, desc: editingRole.desc, isDefault: editingRole.isDefault, status: editingRole.status }
            : {}
        }
        onClose={() => {
          setModalOpen(false);
          setEditingRole(null);
        }}
        onSubmit={modalMode === "create" ? handleCreate : handleUpdate}
        submitting={submitting}
      />

      {/* Delete confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-sm font-semibold text-gray-900">Xác nhận xóa</h3>
            <p className="mt-2 text-sm text-gray-600">
              Bạn có chắc muốn xóa vai trò <span className="font-semibold text-gray-900">&quot;{deleteTarget.name}&quot;</span>?
              {deleteTarget.accountCount > 0 && (
                <span className="mt-2 block rounded bg-amber-50 px-3 py-2 text-xs text-amber-700">
                  Vai trò này đang có {deleteTarget.accountCount} tài khoản. Hệ thống sẽ chặn xóa nếu còn tài khoản liên kết.
                </span>
              )}
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
