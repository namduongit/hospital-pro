"use client";

import { RoleItem } from "@/lib/role/IRole";

const CHART_COLORS = ["#07275A", "#00C491", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4", "#EC4899"];

interface RoleBarChartProps {
  roles: RoleItem[];
  loading: boolean;
}

export function RoleBarChart({ roles, loading }: RoleBarChartProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 text-sm text-gray-400">
        <i className="fa-solid fa-spinner fa-spin mr-2" /> Đang tải...
      </div>
    );
  }

  if (roles.length === 0) {
    return <p className="py-8 text-center text-sm text-gray-400">Chưa có dữ liệu vai trò</p>;
  }

  const max = Math.max(1, ...roles.map((r) => r.accountCount));

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900">Phân bố tài khoản theo vai trò</h2>
        <span className="text-xs text-gray-400">Biểu đồ cột ngang</span>
      </div>
      <div className="space-y-3">
        {roles.map((r, i) => (
          <div key={r.uuid} className="flex items-center gap-3">
            <span className="w-28 shrink-0 truncate text-right text-xs font-medium text-gray-600" title={r.name}>
              {r.name}
            </span>
            <div className="flex flex-1 items-center gap-2">
              <div className="h-6 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="flex h-full items-center justify-end rounded-full pr-2 text-[11px] font-semibold text-white transition-all"
                  style={{
                    width: `${Math.max(8, (r.accountCount / max) * 100)}%`,
                    background: CHART_COLORS[i % CHART_COLORS.length],
                    minWidth: r.accountCount > 0 ? 32 : undefined,
                  }}
                >
                  {r.accountCount > 0 ? r.accountCount : ""}
                </div>
              </div>
              <span className="w-8 text-xs tabular-nums text-gray-500">{r.accountCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
