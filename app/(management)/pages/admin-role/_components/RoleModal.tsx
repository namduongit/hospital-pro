"use client";

import { useState, useEffect } from "react";
import { CreateRolePayload, UpdateRolePayload } from "@/lib/role/IRole";

interface RoleModalProps {
  open: boolean;
  mode: "create" | "edit";
  initial: Partial<CreateRolePayload>;
  onClose: () => void;
  onSubmit: (data: CreateRolePayload | UpdateRolePayload) => void;
  submitting: boolean;
}

export function RoleModal({
  open,
  mode,
  initial,
  onClose,
  onSubmit,
  submitting,
}: RoleModalProps) {
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
