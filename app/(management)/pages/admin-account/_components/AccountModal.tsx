"use client";

import { useState, useEffect } from "react";
import { CreateAccountPayload, UpdateAccountPayload } from "@/lib/account/IAccount";
import { RoleItem } from "@/lib/role/IRole";

interface AccountModalProps {
  open: boolean;
  initial: Partial<CreateAccountPayload> & { uuid?: string };
  roles: RoleItem[];
  onClose: () => void;
  onSubmit: (data: CreateAccountPayload | UpdateAccountPayload) => void;
  submitting: boolean;
}

export function AccountModal({
  open,
  initial,
  roles,
  onClose,
  onSubmit,
  submitting,
}: AccountModalProps) {
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
