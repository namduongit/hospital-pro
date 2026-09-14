"use client";

import { useEffect, useState } from "react";
import { Permission } from "@/lib/permission/Permission";
import { PermissionItem } from "@/lib/permission/IPermission";
import { PageHeader } from "./_components/PageHeader";
import { PermissionStats } from "./_components/PermissionStats";
import { PermissionTable } from "./_components/PermissionTable";

export default function AdminPermissionPage() {
  const [permissions, setPermissions] = useState<PermissionItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchPermissions = async (p = page) => {
    setLoading(true);
    setError(null);
    try {
      const permCls = new Permission();
      const data = await permCls.GetAll(p, pageSize);
      setPermissions(data.items);
      setTotalPage(data.totalPage || 1);
      setPage(data.page);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Không thể tải danh sách quyền hạn");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions(1);
  }, []);

  const filtered = search.trim()
    ? permissions.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.endpoint.toLowerCase().includes(search.toLowerCase()) ||
          p.desc.toLowerCase().includes(search.toLowerCase())
      )
    : permissions;

  return (
    <div className="space-y-6">
      <PageHeader onRefresh={() => fetchPermissions(page)} />

      <PermissionStats permissions={permissions} />

      <div className="relative max-w-sm">
        <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Tìm kiếm theo tên, endpoint, mô tả..."
          className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-[#07275A] focus:ring-2 focus:ring-[#07275A]/10"
        />
      </div>

      <PermissionTable
        filtered={filtered}
        loading={loading}
        error={error}
        page={page}
        pageSize={pageSize}
        totalPage={totalPage}
        search={search}
        onPageChange={(newPage: number) => {
          setPage(newPage);
          fetchPermissions(newPage);
        }}
      />
    </div>
  );
}
