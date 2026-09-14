"use client";

import { AccountItem } from "@/lib/account/IAccount";

interface AccountStatsProps {
  accounts: AccountItem[];
}

export function AccountStats({ accounts }: AccountStatsProps) {
  const doctorCount = accounts.filter((a) => a.roleIsDefault).length;
  const activeCount = accounts.filter((a) => a.status === 0).length;

  return (
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
  );
}
