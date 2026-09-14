"use client";

import { RoleItem } from "@/lib/role/IRole";

interface RoleStatsProps {
  roles: RoleItem[];
}

export function RoleStats({ roles }: RoleStatsProps) {
  const totalAccounts = roles.reduce((sum, r) => sum + r.accountCount, 0);
  const doctorRoleName = roles.find((r) => r.isDefault)?.name || "Chưa đặt";

  return (
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
        <p className="mt-2 text-sm font-semibold text-gray-900">{doctorRoleName}</p>
        <p className="mt-1 text-xs text-gray-400">Tài khoản thuộc vai trò này sẽ tự tạo profile Bác sĩ</p>
      </div>
    </div>
  );
}
