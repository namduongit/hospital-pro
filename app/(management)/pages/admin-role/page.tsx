"use client";

import { useEffect, useState } from "react";
import { Role } from "@/lib/role/Role";
import { RoleItem, CreateRolePayload, UpdateRolePayload } from "@/lib/role/IRole";
import { useToast } from "@/context/toast";
import { PageHeader } from "./_components/PageHeader";
import { RoleStats } from "./_components/RoleStats";
import { RoleBarChart } from "./_components/RoleBarChart";
import { RoleTable } from "./_components/RoleTable";
import { RoleModal } from "./_components/RoleModal";
import { DeleteConfirmDialog } from "./_components/DeleteConfirmDialog";

export default function AdminRolePage() {
  const toast = useToast();
  const [roles, setRoles] = useState<RoleItem[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingRole, setEditingRole] = useState<RoleItem | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<RoleItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchRoles = async (p = page) => {
    setLoading(true);
    setError(null);
    try {
      const roleCls = new Role();
      const data = await roleCls.GetAll(p, pageSize);
      setRoles(data.items);
      setTotalPage(data.totalPage || 1);
      setPage(data.page);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Không thể tải danh sách vai trò");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles(1);
  }, []);

  const handleCreate = async (data: CreateRolePayload | UpdateRolePayload) => {
    setSubmitting(true);
    try {
      const roleCls = new Role();
      await roleCls.Create(data as CreateRolePayload);
      setModalOpen(false);
      toast?.ShowToast("Thêm vai trò thành công");
      fetchRoles(page);
    } catch (e: unknown) {
      toast?.ShowToast(e instanceof Error ? e.message : "Thêm thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (data: CreateRolePayload | UpdateRolePayload) => {
    if (!editingRole) return;
    setSubmitting(true);
    try {
      const roleCls = new Role();
      await roleCls.Update(editingRole.uuid, data as UpdateRolePayload);
      setModalOpen(false);
      setEditingRole(null);
      toast?.ShowToast("Cập nhật vai trò thành công");
      fetchRoles(page);
    } catch (e: unknown) {
      toast?.ShowToast(e instanceof Error ? e.message : "Cập nhật thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const roleCls = new Role();
      await roleCls.Delete(deleteTarget.uuid);
      setDeleteTarget(null);
      toast?.ShowToast("Đã xóa vai trò");
      fetchRoles(page);
    } catch (e: unknown) {
      toast?.ShowToast(e instanceof Error ? e.message : "Xóa thất bại");
    } finally {
      setDeleting(false);
    }
  };

  const openCreate = () => {
    setModalMode("create");
    setEditingRole(null);
    setModalOpen(true);
  };

  const openEdit = (r: RoleItem) => {
    setModalMode("edit");
    setEditingRole(r);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader onCreate={openCreate} />

      <RoleStats roles={roles} />

      <RoleBarChart roles={roles} loading={loading} />

      <RoleTable
        roles={roles}
        loading={loading}
        error={error}
        page={page}
        totalPage={totalPage}
        onRefresh={() => fetchRoles(page)}
        onEdit={openEdit}
        onDelete={(r: RoleItem) => setDeleteTarget(r)}
        onPageChange={(newPage: number) => {
          setPage(newPage);
          fetchRoles(newPage);
        }}
      />

      <RoleModal
        open={modalOpen}
        mode={modalMode}
        initial={
          modalMode === "edit" && editingRole
            ? { name: editingRole.name, desc: editingRole.desc, isDefault: editingRole.isDefault, status: editingRole.status }
            : {}
        }
        onClose={() => {
          setModalOpen(false);
          setEditingRole(null);
        }}
        onSubmit={modalMode === "create" ? handleCreate : handleUpdate}
        submitting={submitting}
      />

      <DeleteConfirmDialog
        role={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
        loading={deleting}
      />
    </div>
  );
}
