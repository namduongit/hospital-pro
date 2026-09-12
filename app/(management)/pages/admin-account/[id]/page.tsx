"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { accountsApi, AccountDetail, UpdateDoctorProfilePayload } from "@/lib/api";

const GENDER_LABEL = ["Khác", "Nam", "Nữ"];
const ACCOUNT_STATUS = ["Hoạt động", "Không hoạt động"];
const APPOINTMENT_STATUS = ["Chờ duyệt", "Đã chấp nhận", "Hoàn thành", "Đã hủy"];
const PAYMENT_STATUS = ["Chưa thanh toán", "Đã thanh toán"];
const PAYMENT_METHOD = ["Tiền mặt", "Momo", "QR Code"];
const PRESCRIPTION_STATUS = ["Chưa thanh toán", "Đã thanh toán", "Đã hủy"];

function MarkdownEditor({
  value,
  onChange,
  saving,
  onSave,
}: {
  value: string;
  onChange: (v: string) => void;
  saving: boolean;
  onSave: () => void;
}) {
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200">
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-4 py-2">
        <div className="flex gap-1">
          <button
            onClick={() => setTab("edit")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              tab === "edit" ? "bg-[#07275A] text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <i className="fa-solid fa-pen mr-1" /> Chỉnh sửa
          </button>
          <button
            onClick={() => setTab("preview")}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
              tab === "preview" ? "bg-[#07275A] text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <i className="fa-solid fa-eye mr-1" /> Xem trước
          </button>
        </div>
        <button
          onClick={onSave}
          disabled={saving}
          className="rounded-lg bg-[#00C491] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#00a87a] disabled:opacity-50"
        >
          {saving ? (
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-spinner fa-spin" /> Đang lưu...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-floppy-disk" /> Lưu
            </span>
          )}
        </button>
      </div>

      {tab === "edit" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={14}
          className="w-full resize-y bg-white px-4 py-3 font-mono text-sm leading-6 text-gray-800 outline-none"
          placeholder={"## Giới thiệu\n\nBác sĩ có hơn 10 năm kinh nghiệm..."}
        />
      ) : (
        <div className="prose prose-sm max-w-none bg-white px-4 py-3">
          {value.trim() ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
          ) : (
            <p className="py-8 text-center text-sm text-gray-400">Chưa có nội dung giới thiệu</p>
          )}
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-gray-50 py-2 text-sm">
      <span className="shrink-0 text-gray-500">{label}</span>
      <span className="text-right font-medium text-gray-900">{value || <span className="text-gray-300">--</span>}</span>
    </div>
  );
}

export default function AdminAccountDetailPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [detail, setDetail] = useState<AccountDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Doctor markdown editing state
  const [markdown, setMarkdown] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [doctorImage, setDoctorImage] = useState("");
  const [doctorGender, setDoctorGender] = useState(0);
  const [doctorViewDepartment, setDoctorViewDepartment] = useState("");
  const [doctorIsFeatured, setDoctorIsFeatured] = useState(false);
  const [consultationFee, setConsultationFee] = useState(0);
  const [savingDoctor, setSavingDoctor] = useState(false);

  const fetchDetail = async () => {
    if (!params.id) return;
    setLoading(true);
    setError(null);
    try {
      const data = await accountsApi.getDetail(params.id);
      setDetail(data);
      if (data.doctorProfile) {
        setMarkdown(data.doctorProfile.markdown);
        setDoctorName(data.doctorProfile.name);
        setDoctorImage(data.doctorProfile.image);
        setDoctorGender(data.doctorProfile.gender);
        setDoctorViewDepartment(data.doctorProfile.viewDepartment);
        setDoctorIsFeatured(data.doctorProfile.isFeatured);
        setConsultationFee(data.doctorProfile.consultationFee);
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Không thể tải chi tiết tài khoản");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [params.id]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const saveDoctorProfile = async () => {
    if (!params.id) return;
    setSavingDoctor(true);
    try {
      const payload: UpdateDoctorProfilePayload = {
        name: doctorName,
        image: doctorImage,
        gender: doctorGender,
        viewDepartment: doctorViewDepartment,
        isFeatured: doctorIsFeatured,
        markdown,
        consultationFee,
      };
      await accountsApi.updateDoctorProfile(params.id, payload);
      showToast("Đã lưu thông tin bác sĩ");
      fetchDetail();
    } catch (e: unknown) {
      showToast(e instanceof Error ? e.message : "Lưu thất bại");
    } finally {
      setSavingDoctor(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-gray-400">
        <i className="fa-solid fa-spinner fa-spin mr-2" /> Đang tải chi tiết tài khoản...
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        <i className="fa-solid fa-triangle-exclamation mr-2" />
        {error || "Không tìm thấy tài khoản"}
        <div className="mt-4">
          <Link href="/pages/admin-account" className="text-[#07275A] hover:underline">
            ← Quay lại danh sách
          </Link>
        </div>
      </div>
    );
  }

  const isDoctor = detail.roleIsDefault || !!detail.doctorProfile;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href="/pages/admin-account" className="text-xs text-gray-400 hover:text-[#07275A]">
            ← Quay lại danh sách
          </Link>
          <h1 className="mt-1 text-xl font-semibold text-gray-900">Chi tiết tài khoản</h1>
          <p className="mt-1 text-sm text-gray-500">{detail.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ring-1 ${
              detail.status === 0
                ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                : "bg-gray-100 text-gray-600 ring-gray-200"
            }`}
          >
            {ACCOUNT_STATUS[detail.status] || "Không xác định"}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#07275A]/10 px-3 py-1 text-xs font-medium text-[#07275A]">
            {isDoctor && <i className="fa-solid fa-user-doctor" />}
            {detail.roleName}
          </span>
        </div>
      </div>

      {/* Account + Profile */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Account info */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">Thông tin tài khoản</h2>
          <InfoRow label="Email" value={detail.email} />
          <InfoRow label="Nhóm quyền" value={detail.roleName} />
          <InfoRow label="Loại tài khoản" value={isDoctor ? "Bác sĩ" : "Bệnh nhân"} />
          <InfoRow label="Trạng thái" value={ACCOUNT_STATUS[detail.status] || "--"} />
          <InfoRow label="UUID" value={detail.uuid.slice(0, 18) + "..."} />
        </div>

        {/* Patient profile */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">
            <i className="fa-solid fa-user mr-1.5 text-blue-500" /> Hồ sơ bệnh nhân
          </h2>
          {detail.patientProfile ? (
            <>
              <div className="mb-3 flex items-center gap-3">
                {detail.patientProfile.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={detail.patientProfile.image}
                    alt={detail.patientProfile.name}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-600">
                    {detail.patientProfile.name.charAt(0)}
                  </span>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{detail.patientProfile.name}</p>
                  <p className="text-xs text-gray-500">{GENDER_LABEL[detail.patientProfile.gender] || "Khác"}</p>
                </div>
              </div>
              <InfoRow label="Mã bệnh nhân" value={detail.patientProfile.medicalCode} />
              <InfoRow label="Số điện thoại" value={detail.patientProfile.phone} />
              <InfoRow label="Email" value={detail.patientProfile.email} />
              <InfoRow label="Địa chỉ" value={detail.patientProfile.address} />
            </>
          ) : (
            <p className="py-6 text-center text-sm text-gray-400">Tài khoản này chưa có hồ sơ bệnh nhân</p>
          )}
        </div>

        {/* Doctor profile */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">
            <i className="fa-solid fa-user-doctor mr-1.5 text-[#00C491]" /> Hồ sơ bác sĩ
          </h2>
          {detail.doctorProfile ? (
            <>
              <div className="mb-3 flex items-center gap-3">
                {detail.doctorProfile.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={detail.doctorProfile.image}
                    alt={detail.doctorProfile.name}
                    className="h-14 w-14 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00C491]/20 text-lg font-semibold text-[#007a5c]">
                    {detail.doctorProfile.name.charAt(0)}
                  </span>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{detail.doctorProfile.name}</p>
                  <p className="text-xs text-gray-500">
                    {GENDER_LABEL[detail.doctorProfile.gender] || "Khác"} · {detail.doctorProfile.viewDepartment || "Chưa có chuyên khoa"}
                  </p>
                </div>
              </div>
              <InfoRow label="Bệnh viện" value={detail.doctorProfile.hospitalName} />
              <InfoRow label="Giá khám" value={`${detail.doctorProfile.consultationFee.toLocaleString("vi-VN")} đ`} />
              <InfoRow label="Đánh giá" value={`${detail.doctorProfile.averageStar} ★`} />
              <InfoRow label="Lượt khám" value={String(detail.doctorProfile.visit)} />
              <InfoRow label="Nổi bật" value={detail.doctorProfile.isFeatured ? "Có" : "Không"} />
              <InfoRow
                label="Chuyên khoa"
                value={detail.doctorProfile.departments.map((d) => d.departmentName).join(", ")}
              />
              <InfoRow
                label="Lịch khám"
                value={detail.doctorProfile.schedules.map((s) => `${s.startTime}-${s.endTime}`).join(", ")}
              />
            </>
          ) : (
            <p className="py-6 text-center text-sm text-gray-400">Tài khoản này chưa có hồ sơ bác sĩ</p>
          )}
        </div>
      </div>

      {/* Doctor markdown editor */}
      {detail.doctorProfile && (
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-900">
              <i className="fa-solid fa-file-lines mr-1.5 text-[#07275A]" /> Giới thiệu bác sĩ (Markdown)
            </h2>
            <span className="text-xs text-gray-400">Hỗ trợ cú pháp Markdown + GFM</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-gray-600">Tên bác sĩ</span>
              <input
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A]"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-gray-600">Ảnh đại diện (URL)</span>
              <input
                value={doctorImage}
                onChange={(e) => setDoctorImage(e.target.value)}
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
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-[#07275A]"
              />
            </label>
          </div>
          <label className="mt-4 flex items-center gap-2">
            <input
              type="checkbox"
              checked={doctorIsFeatured}
              onChange={(e) => setDoctorIsFeatured(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-[#07275A] focus:ring-[#07275A]"
            />
            <span className="text-sm font-medium text-gray-700">Bác sĩ nổi bật</span>
          </label>

          <div className="mt-4">
            <MarkdownEditor
              value={markdown}
              onChange={setMarkdown}
              saving={savingDoctor}
              onSave={saveDoctorProfile}
            />
          </div>
        </div>
      )}

      {/* Appointments (lịch sử) */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-900">
            <i className="fa-solid fa-calendar-check mr-1.5 text-[#07275A]" /> Lịch sử khám ({detail.appointments.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3 font-medium">Bệnh nhân</th>
                <th className="px-4 py-3 font-medium">Lý do</th>
                <th className="px-4 py-3 font-medium">Giờ</th>
                <th className="px-4 py-3 font-medium">Thanh toán</th>
                <th className="px-4 py-3 font-medium">Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {detail.appointments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-gray-400">
                    Chưa có lịch khám nào
                  </td>
                </tr>
              ) : (
                detail.appointments.map((ap) => (
                  <tr key={ap.uuid} className="hover:bg-gray-50/60">
                    <td className="px-4 py-3 font-medium text-gray-900">{ap.name}</td>
                    <td className="max-w-[200px] truncate px-4 py-3 text-gray-600" title={ap.reason}>
                      {ap.reason || "--"}
                    </td>
                    <td className="px-4 py-3 text-gray-600">{ap.startTime} - {ap.endTime}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-gray-600">
                        {PAYMENT_METHOD[ap.paymentMethod] || "--"} · {PAYMENT_STATUS[ap.paymentStatus] || "--"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${
                          ap.status === 2
                            ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                            : ap.status === 3
                              ? "bg-red-50 text-red-700 ring-red-200"
                              : "bg-amber-50 text-amber-700 ring-amber-200"
                        }`}
                      >
                        {APPOINTMENT_STATUS[ap.status] || "Không xác định"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Prescriptions (bệnh án) */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-gray-900">
            <i className="fa-solid fa-file-prescription mr-1.5 text-[#00C491]" /> Bệnh án / Đơn thuốc ({detail.prescriptions.length})
          </h2>
        </div>
        <div className="divide-y divide-gray-100">
          {detail.prescriptions.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-gray-400">Chưa có bệnh án nào</p>
          ) : (
            detail.prescriptions.map((p) => (
              <div key={p.uuid} className="px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{p.reason || "Đơn thuốc"}</p>
                    <p className="mt-0.5 text-xs text-gray-500">Ngày: {p.createdDate}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#07275A]">
                      {p.totalPrice.toLocaleString("vi-VN")} đ
                    </span>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${
                        p.status === 1
                          ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                          : p.status === 2
                            ? "bg-red-50 text-red-700 ring-red-200"
                            : "bg-amber-50 text-amber-700 ring-amber-200"
                      }`}
                    >
                      {PRESCRIPTION_STATUS[p.status] || "Không xác định"}
                    </span>
                  </div>
                </div>
                {p.note && <p className="mt-2 text-xs text-gray-500">Ghi chú: {p.note}</p>}
                {p.items.length > 0 && (
                  <div className="mt-3 overflow-x-auto rounded-lg bg-gray-50">
                    <table className="w-full text-left text-xs">
                      <thead className="text-gray-500">
                        <tr>
                          <th className="px-3 py-2 font-medium">Thuốc</th>
                          <th className="px-3 py-2 font-medium">SL</th>
                          <th className="px-3 py-2 font-medium">Giá</th>
                          <th className="px-3 py-2 font-medium">Liều dùng</th>
                          <th className="px-3 py-2 font-medium">Hướng dẫn</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {p.items.map((item) => (
                          <tr key={item.uuid}>
                            <td className="px-3 py-2 font-medium text-gray-800">{item.medicineName}</td>
                            <td className="px-3 py-2 text-gray-600">{item.quantity}</td>
                            <td className="px-3 py-2 text-gray-600">{item.price.toLocaleString("vi-VN")} đ</td>
                            <td className="px-3 py-2 text-gray-600">{item.frequency}</td>
                            <td className="max-w-[200px] truncate px-3 py-2 text-gray-600" title={item.instruction}>
                              {item.instruction}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg bg-gray-900 px-4 py-3 text-sm text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
