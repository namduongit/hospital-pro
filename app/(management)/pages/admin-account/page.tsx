"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  accountsApi,
  rolesApi,
  AccountItem,
  Role,
  CreateAccountPayload,
  UpdateAccountPayload,
} from "@/lib/api";

const STATUS_LABEL: Record<number, { label: string; cls: string }> = {
  0: { label: "Hoạt động", cls: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  1: { label: "Không hoạt động", cls: "bg-gray-100 text-gray-600 ring-gray-200" },
};

function AccountModal({
  open,
  initial,
  roles,
  onClose,
  onSubmit,
  submitting,
}: {
  open: boolean;
  initial: Partial<CreateAccountPayload> & { uuid?: string };
  roles: Role[];
  onClose: () => void;
  onSubmit: (data: CreateAccountPayload | UpdateAccountPayload) => void;
  submitting: boolean;
}) {
  const [email, setEmail] = useState(initial.email || "");
  const [password, setPassword] = useState(initial.password || "");
  const [status, setStatus] = useState<number>(initial.status ?? 0);
  const [roleUuid, setRoleUuid] = useState(initial.roleUuid || "");

  useEffect(() => {
    setEmail(initial.email || "");
    setPassword(initial.password || "");
    setStatus(initial.status ?? 0);
    setRoleUuid(initial.roleUuid || "");
  }, [initial, open]);

  if (!open) return null;

  const handleSubmit = () => {
    onSubmit({
      email: email.trim() || undefined,
      password: password || undefined,
      status,
      roleUuid: roleUuid || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">Cập nhật tài khoản</h3>
          <button onClick={onClose} className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-gray-600">Email *</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A] focus:ring-2 focus:ring-[#07275A]/10"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-gray-600">
                Mật khẩu mới (để trống nếu không đổi)
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A] focus:ring-2 focus:ring-[#07275A]/10"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-gray-600">Nhóm quyền *</span>
              <select
                value={roleUuid}
                onChange={(e) => setRoleUuid(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A]"
              >
                <option value="">-- Chọn nhóm quyền --</option>
                {roles.map((r) => (
                  <option key={r.uuid} value={r.uuid}>
                    {r.name}
                    {r.isDefault ? " (Bác sĩ)" : ""}
                  </option>
                ))}
              </select>
            </label>
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
          </div>

        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            Hủy
          </button>
          <button
            disabled={submitting || !email.trim() || !roleUuid}
            onClick={handleSubmit}
            className="rounded-lg bg-[#07275A] px-5 py-2 text-sm font-medium text-white hover:bg-[#0a356f] disabled:opacity-50"
          >
            {submitting ? (
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-spinner fa-spin" /> Đang lưu...
              </span>
            ) : (
              "Cập nhật"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminAccountPage() {
  const [accounts, setAccounts] = useState<AccountItem[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<AccountItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AccountItem | null>(null);

  const fetchAccounts = async (p = page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await accountsApi.getAll(p, pageSize);
      setAccounts(data.items);
      setTotalPage(data.totalPage || 1);
      setPage(data.page);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Không thể tải danh sách tài khoản");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const data = await rolesApi.getAll(1, 100);
      setRoles(data.items);
    } catch {
      // roles are optional for the list page
    }
  };

  useEffect(() => {
    fetchAccounts(1);
    fetchRoles();
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleUpdate = async (data: CreateAccountPayload | UpdateAccountPayload) => {
    if (!editingAccount) return;
    setSubmitting(true);
    try {
      await accountsApi.update(editingAccount.uuid, data as UpdateAccountPayload);
      setModalOpen(false);
      setEditingAccount(null);
      showToast("Cập nhật tài khoản thành công");
      fetchAccounts(page);
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : "Cập nhật thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await accountsApi.delete(deleteTarget.uuid);
      setDeleteTarget(null);
      showToast("Đã xóa tài khoản");
      fetchAccounts(page);
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : "Xóa thất bại");
    }
  };

  const openEdit = (a: AccountItem) => {
    setEditingAccount(a);
    setModalOpen(true);
  };

  const doctorCount = accounts.filter((a) => a.roleIsDefault).length;
  const activeCount = accounts.filter((a) => a.status === 0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Quản lý tài khoản</h1>
          <p className="mt-1 text-sm text-gray-500">Thêm, sửa, xóa tài khoản và xem chi tiết hồ sơ</p>
        </div>
        <Link
          href="/pages/admin-account/create"
          className="inline-flex items-center gap-2 rounded-lg bg-[#07275A] px-4 py-2 text-sm font-medium text-white hover:bg-[#0a356f]"
        >
          <i className="fa-solid fa-plus text-xs" /> Thêm tài khoản
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Tổng tài khoản</p>
          <p className="mt-2 text-2xl font-bold text-[#07275A]">{accounts.length}</p>
          <p className="mt-1 text-xs text-gray-400">Trên trang hiện tại</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Tài khoản Bác sĩ</p>
          <p className="mt-2 text-2xl font-bold text-[#00C491]">{doctorCount}</p>
          <p className="mt-1 text-xs text-gray-400">Thuộc vai trò mặc định</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Đang hoạt động</p>
          <p className="mt-2 text-2xl font-bold text-emerald-600">{activeCount}</p>
          <p className="mt-1 text-xs text-gray-400">Trên trang hiện tại</p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-900">Danh sách tài khoản</h2>
          <button
            onClick={() => fetchAccounts(page)}
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
                          onClick={() => openEdit(a)}
                          className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-[#07275A] hover:bg-[#07275A]/10"
                          title="Sửa"
                        >
                          <i className="fa-solid fa-pen mr-1" /> Sửa
                        </button>
                        <button
                          onClick={() => setDeleteTarget(a)}
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
                fetchAccounts(p);
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
                fetchAccounts(p);
              }}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium disabled:opacity-40 hover:bg-gray-50"
            >
              Sau
            </button>
          </div>
        </div>
      </div>

      {/* Create/Edit modal */}
      <AccountModal
        open={modalOpen}
        roles={roles}
        initial={
          editingAccount
            ? {
                uuid: editingAccount.uuid,
                email: editingAccount.email,
                status: editingAccount.status,
                roleUuid: editingAccount.roleUuid,
              }
            : {}
        }
        onClose={() => {
          setModalOpen(false);
          setEditingAccount(null);
        }}
        onSubmit={handleUpdate}
        submitting={submitting}
      />

      {/* Delete confirm */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h3 className="text-sm font-semibold text-gray-900">Xác nhận xóa</h3>
            <p className="mt-2 text-sm text-gray-600">
              Bạn có chắc muốn xóa tài khoản <span className="font-semibold text-gray-900">&quot;{deleteTarget.email}&quot;</span>?
              Hồ sơ liên quan (bệnh nhân/bác sĩ) cũng sẽ bị xóa.
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
