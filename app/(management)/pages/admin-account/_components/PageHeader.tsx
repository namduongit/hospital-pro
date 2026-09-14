"use client";

import Link from "next/link";

export function PageHeader() {
  return (
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
  );
}
