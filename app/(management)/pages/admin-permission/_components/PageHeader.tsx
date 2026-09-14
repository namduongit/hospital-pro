"use client";

interface PageHeaderProps {
  onRefresh: () => void;
}

export function PageHeader({ onRefresh }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Quyền hạn (Permissions)</h1>
        <p className="mt-1 text-sm text-gray-500">Danh sách các endpoint quyền hạn trong hệ thống</p>
      </div>
      <button
        onClick={onRefresh}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
      >
        <i className="fa-solid fa-rotate text-xs" /> Làm mới
      </button>
    </div>
  );
}
