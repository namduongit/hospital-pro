"use client";

import { PermissionItem } from "@/lib/permission/IPermission";
import { inferMethod } from "./helpers";

interface PermissionStatsProps {
  permissions: PermissionItem[];
}

export function PermissionStats({ permissions }: PermissionStatsProps) {
  const readCount = permissions.filter((p) => inferMethod(p.endpoint) === "get").length;
  const writeCount = permissions.filter((p) => inferMethod(p.endpoint) !== "get").length;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Tổng quyền hạn</p>
        <p className="mt-2 text-2xl font-bold text-[#07275A]">{permissions.length}</p>
        <p className="mt-1 text-xs text-gray-400">Trang hiện tại</p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Endpoint đọc</p>
        <p className="mt-2 text-2xl font-bold text-emerald-600">{readCount}</p>
        <p className="mt-1 text-xs text-gray-400">Phương thức GET</p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">Endpoint ghi</p>
        <p className="mt-2 text-2xl font-bold text-blue-600">{writeCount}</p>
        <p className="mt-1 text-xs text-gray-400">POST / PUT / DELETE</p>
      </div>
    </div>
  );
}
