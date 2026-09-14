"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { RoleItem } from "@/lib/role/IRole";
import { Role } from "@/lib/role/Role";
import { Account } from "@/lib/account/Account";

const GENDER_LABEL = ["Khác", "Nam", "Nữ"];

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function CreateAccountPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [roles, setRoles] = useState<RoleItem[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(0);
  const [roleUuid, setRoleUuid] = useState("");

  // Doctor fields
  const [doctorName, setDoctorName] = useState("");
  const [doctorGender, setDoctorGender] = useState(1);
  const [doctorViewDepartment, setDoctorViewDepartment] = useState("");
  const [hospitalGuid, setHospitalGuid] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [consultationFee, setConsultationFee] = useState(0);
  const [doctorImageBase64, setDoctorImageBase64] = useState("");
  const [doctorImageName, setDoctorImageName] = useState("");

  // Patient fields
  const [patientName, setPatientName] = useState("");
  const [patientGender, setPatientGender] = useState(1);
  const [patientAddress, setPatientAddress] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientMedicalCode, setPatientMedicalCode] = useState("");
  const [patientImageBase64, setPatientImageBase64] = useState("");
  const [patientImageName, setPatientImageName] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const roleCls = new Role();
    roleCls.GetAll(1, 100).then((d) => setRoles(d.items)).catch(() => {});
  }, []);

  const selectedRole = roles.find((r) => r.uuid === roleUuid);
  const isDoctorRole = selectedRole?.isDefault ?? false;

  const handleDoctorFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    setDoctorImageBase64(base64);
    setDoctorImageName(file.name);
  };

  const handlePatientFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    setPatientImageBase64(base64);
    setPatientImageName(file.name);
  };

  const handleSubmit = async () => {
    setError(null);
    if (!email.trim() || !password || !roleUuid) {
      setError("Vui lòng điền đầy đủ Email, Mật khẩu và Nhóm quyền.");
      return;
    }
    setSubmitting(true);
    try {
      const accountCls = new Account();
      await accountCls.Create({
        email: email.trim(),
        password,
        status,
        roleUuid,
        ...(isDoctorRole
          ? {
              doctorName: doctorName.trim() || email.trim(),
              doctorImage: doctorImageBase64 || "",
              doctorGender,
              doctorViewDepartment: doctorViewDepartment.trim(),
              hospitalGuid: hospitalGuid || undefined,
              markdown,
              isFeatured,
              consultationFee,
            }
          : {
              patientName: patientName.trim() || email.trim(),
              patientImage: patientImageBase64 || "",
              patientGender,
              patientAddress: patientAddress.trim(),
              patientPhone: patientPhone.trim(),
              patientEmail: patientEmail.trim() || email.trim(),
              patientMedicalCode: patientMedicalCode.trim(),
            }),
      });
      router.push("/pages/admin-account");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Tạo tài khoản thất bại");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link href="/pages/admin-account" className="text-xs text-gray-400 hover:text-[#07275A]">
            ← Quay lại danh sách
          </Link>
          <h1 className="mt-1 text-xl font-semibold text-gray-900">Thêm tài khoản</h1>
          <p className="mt-1 text-sm text-gray-500">
            Tạo tài khoản mới. Nếu chọn nhóm quyền Bác sĩ, hệ thống sẽ tự tạo profile Bác sĩ.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          <i className="fa-solid fa-triangle-exclamation mr-2" />
          {error}
        </div>
      )}

      {/* Account info */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-gray-900">Thông tin tài khoản</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-gray-600">Email *</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A] focus:ring-2 focus:ring-[#07275A]/10"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-gray-600">Mật khẩu *</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A] focus:ring-2 focus:ring-[#07275A]/10"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-gray-600">Nhóm quyền *</span>
            <select
              value={roleUuid}
              onChange={(e) => setRoleUuid(e.target.value)}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A]"
            >
              <option value="">-- Chọn nhóm quyền --</option>
              {roles.map((r) => (
                <option key={r.uuid} value={r.uuid}>
                  {r.name}
                  {r.isDefault ? " (Bác sĩ)" : ""}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-gray-600">Trạng thái</span>
            <select
              value={status}
              onChange={(e) => setStatus(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A]"
            >
              <option value={0}>Hoạt động</option>
              <option value={1}>Không hoạt động</option>
            </select>
          </label>
        </div>
      </div>

      {/* Doctor profile section */}
      {isDoctorRole && (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#07275A]">
            <i className="fa-solid fa-user-doctor" />
            Thông tin Bác sĩ
          </div>

          {/* Avatar upload */}
          <div className="mb-4">
            <span className="mb-1 block text-xs font-medium text-gray-600">Ảnh đại diện</span>
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                {doctorImageBase64 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={doctorImageBase64} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <i className="fa-solid fa-user-doctor text-2xl text-gray-300" />
                )}
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  <i className="fa-solid fa-upload mr-1.5" /> Chọn ảnh
                </button>
                {doctorImageName && <p className="mt-1 text-xs text-gray-400">{doctorImageName}</p>}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleDoctorFile}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-gray-600">Tên bác sĩ</span>
              <input
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                placeholder="VD: BS. Nguyễn Văn A"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A]"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-gray-600">Giới tính</span>
              <select
                value={doctorGender}
                onChange={(e) => setDoctorGender(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A]"
              >
                {GENDER_LABEL.map((g, i) => (
                  <option key={i} value={i}>{g}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-gray-600">Chuyên khoa</span>
              <input
                value={doctorViewDepartment}
                onChange={(e) => setDoctorViewDepartment(e.target.value)}
                placeholder="VD: Tim mạch"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A]"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-gray-600">Bệnh viện (UUID)</span>
              <input
                value={hospitalGuid}
                onChange={(e) => setHospitalGuid(e.target.value)}
                placeholder="GUID bệnh viện"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A]"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-gray-600">Giá khám (VNĐ)</span>
              <input
                type="number"
                min={0}
                value={consultationFee}
                onChange={(e) => setConsultationFee(Number(e.target.value))}
                placeholder="VD: 300000"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A]"
              />
            </label>
            <label className="flex items-end gap-2 pb-2">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-[#07275A] focus:ring-[#07275A]"
              />
              <span className="text-sm font-medium text-gray-700">Bác sĩ nổi bật</span>
            </label>
          </div>

          {/* Markdown editor - 2 columns side by side */}
          <div className="mt-6">
            <span className="mb-2 block text-xs font-medium text-gray-600">Giới thiệu (Markdown)</span>
            <div className="grid gap-0 overflow-hidden rounded-xl border border-gray-200 lg:grid-cols-2">
              <div className="flex flex-col border-b border-gray-200 lg:border-b-0 lg:border-r">
                <div className="border-b border-gray-100 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-500">
                  <i className="fa-solid fa-pen mr-1" /> Markdown
                </div>
                <textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  rows={16}
                  className="w-full flex-1 resize-none bg-white px-3 py-3 font-mono text-sm leading-6 text-gray-800 outline-none"
                  placeholder={"## Giới thiệu\n\nBác sĩ có hơn 10 năm kinh nghiệm..."}
                />
              </div>
              <div className="flex flex-col">
                <div className="border-b border-gray-100 bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-500">
                  <i className="fa-solid fa-eye mr-1" /> Xem trước
                </div>
                <div className="prose prose-sm max-w-none flex-1 overflow-y-auto bg-white px-4 py-3">
                  {markdown.trim() ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
                  ) : (
                    <p className="py-8 text-center text-sm text-gray-400">Chưa có nội dung</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Patient profile section */}
      {!isDoctorRole && roleUuid && (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-[#07275A]">
            <i className="fa-solid fa-user" />
            Thông tin Bệnh nhân
          </div>

          {/* Avatar upload */}
          <div className="mb-4">
            <span className="mb-1 block text-xs font-medium text-gray-600">Ảnh đại diện</span>
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                {patientImageBase64 ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={patientImageBase64} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <i className="fa-solid fa-user text-2xl text-gray-300" />
                )}
              </div>
              <div>
                <label className="cursor-pointer rounded-lg border border-gray-200 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50">
                  <i className="fa-solid fa-upload mr-1.5" /> Chọn ảnh
                  <input type="file" accept="image/*" onChange={handlePatientFile} className="hidden" />
                </label>
                {patientImageName && <p className="mt-1 text-xs text-gray-400">{patientImageName}</p>}
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-gray-600">Tên bệnh nhân</span>
              <input
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="VD: Nguyễn Văn A"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A]"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-gray-600">Giới tính</span>
              <select
                value={patientGender}
                onChange={(e) => setPatientGender(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A]"
              >
                {GENDER_LABEL.map((g, i) => (
                  <option key={i} value={i}>{g}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-gray-600">Số điện thoại</span>
              <input
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                placeholder="VD: 0901234567"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A]"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-gray-600">Email bệnh nhân</span>
              <input
                type="email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                placeholder="patient@example.com"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A]"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-gray-600">Địa chỉ</span>
              <input
                value={patientAddress}
                onChange={(e) => setPatientAddress(e.target.value)}
                placeholder="VD: 123 Đường ABC, Hà Nội"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A]"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-gray-600">Mã bệnh nhân</span>
              <input
                value={patientMedicalCode}
                onChange={(e) => setPatientMedicalCode(e.target.value)}
                placeholder="VD: BN001"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A]"
              />
            </label>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Link
          href="/pages/admin-account"
          className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          Hủy
        </Link>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="rounded-lg bg-[#07275A] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#0a356f] disabled:opacity-50"
        >
          {submitting ? (
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-spinner fa-spin" /> Đang tạo...
            </span>
          ) : (
            "Tạo tài khoản"
          )}
        </button>
      </div>
    </div>
  );
}
