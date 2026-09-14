"use client";

import { useEffect, useState } from "react";
import { AccountItem, CreateAccountPayload, UpdateAccountPayload } from "@/lib/account/IAccount";
import { RoleItem } from "@/lib/role/IRole";
import { Account } from "@/lib/account/Account";
import { Role } from "@/lib/role/Role";

import { useToast } from "@/context/toast";
import { PageHeader } from "./_components/PageHeader";
import { AccountStats } from "./_components/AccountStats";
import { AccountTable } from "./_components/AccountTable";
import { AccountModal } from "./_components/AccountModal";
import { DeleteConfirmDialog } from "./_components/DeleteConfirmDialog";

export default function AdminAccountPage() {
  const toast = useToast();

  const [accounts, setAccounts] = useState<AccountItem[]>([]);
  const [roles, setRoles] = useState<RoleItem[]>([]);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [editingAccount, setEditingAccount] = useState<AccountItem | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [deleteTarget, setDeleteTarget] = useState<AccountItem | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchAccounts = async (p = page) => {
    setLoading(true);
    setError(null);
    try {
      const accountCls = new Account();
      const data = await accountCls.GetAll(p, pageSize);
      setAccounts(data.items);
      setTotalPage(data.totalPage || 1);
      setPage(data.page);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Không thể tải danh sách tài khoản");
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const roleCls = new Role();
      const data = await roleCls.GetAll(1, 100);
      setRoles(data.items);
    } catch {
      // roles are optional for the list page
    }
  };

  useEffect(() => {
    fetchAccounts(1);
    fetchRoles();
  }, []);

  const handleUpdate = async (data: CreateAccountPayload | UpdateAccountPayload) => {
    if (!editingAccount) return;
    setSubmitting(true);
    try {
      const accountCls = new Account();
      await accountCls.Update(editingAccount.uuid, data as UpdateAccountPayload);
      setModalOpen(false);
      setEditingAccount(null);

      toast?.ShowToast("Cập nhật tài khoản thành công");
      fetchAccounts(page);
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
      const accountCls = new Account();
      await accountCls.Delete(deleteTarget.uuid);
      setDeleteTarget(null);

      toast?.ShowToast("Đã xóa tài khoản");
      fetchAccounts(page);
    } catch (e: unknown) {

      toast?.ShowToast(e instanceof Error ? e.message : "Xóa thất bại");
    } finally {
      setDeleting(false);
    }
  };

  const openEdit = (a: AccountItem) => {
    setEditingAccount(a);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader />
      <AccountStats accounts={accounts} />
      <AccountTable
        accounts={accounts}
        loading={loading}
        error={error}
        page={page}
        totalPage={totalPage}
        onRefresh={() => fetchAccounts(page)}
        onEdit={openEdit}
        onDelete={(a: AccountItem) => setDeleteTarget(a)}
        onPageChange={(newPage: number) => {
          setPage(newPage);
          fetchAccounts(newPage);
        }}
      />

      <AccountModal
        open={modalOpen}
        roles={roles}
        initial={
          editingAccount
            ? {
                uuid: editingAccount.uuid,
                email: editingAccount.email,
                status: editingAccount.status,
                roleUuid: editingAccount.roleUuid,
              }
            : {}
        }
        onClose={() => {
          setModalOpen(false);
          setEditingAccount(null);
        }}
        onSubmit={handleUpdate}
        submitting={submitting}
      />

      <DeleteConfirmDialog account={deleteTarget} onConfirm={handleDelete} onCancel={() => setDeleteTarget(null)} loading={deleting} />
    </div>
  );
}
