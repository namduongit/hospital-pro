"use client";

import { AccountItem } from "@/lib/account/IAccount";

interface DeleteConfirmDialogProps {
  account: AccountItem | null;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

export function DeleteConfirmDialog({ account, onConfirm, onCancel, loading = false }: DeleteConfirmDialogProps) {
  if (!account) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h3 className="text-sm font-semibold text-gray-900">Xác nhận xóa</h3>
        <p className="mt-2 text-sm text-gray-600">
          Bạn có chắc muốn xóa tài khoản <span className="font-semibold text-gray-900">&quot;{account.email}&quot;</span>?
          Hồ sơ liên quan (bệnh nhân/bác sĩ) cũng sẽ bị xóa.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <i className="fa-solid fa-spinner fa-spin" /> Đang xóa...
              </span>
            ) : (
              "Xóa"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
