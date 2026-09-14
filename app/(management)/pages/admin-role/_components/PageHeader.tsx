"use client";

interface PageHeaderProps {
  onCreate: () => void;
}

export function PageHeader({ onCreate }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Quản lý vai trò</h1>
        <p className="mt-1 text-sm text-gray-500">Thêm, sửa, xóa vai trò và xem phân bố tài khoản theo vai trò</p>
      </div>
      <button
        onClick={onCreate}
        className="inline-flex items-center gap-2 rounded-lg bg-[#07275A] px-4 py-2 text-sm font-medium text-white hover:bg-[#0a356f]"
      >
        <i className="fa-solid fa-plus text-xs" /> Thêm vai trò
      </button>
    </div>
  );
}
