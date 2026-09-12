const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5264";

export interface Pagination<T> {
  page: number;
  pageSize: number;
  totalPage: number;
  items: T[];
}

export interface Role {
  uuid: string;
  name: string;
  desc: string;
  isDefault: boolean;
  status: number;
  accountCount: number;
}

export interface CreateRolePayload {
  name: string;
  desc: string;
  isDefault: boolean;
  status: number;
}

export interface UpdateRolePayload {
  name?: string;
  desc?: string;
  isDefault?: boolean;
  status?: number;
}

export interface Permission {
  uuid: string;
  name: string;
  desc: string;
  endpoint: string;
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message || `API error ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const rolesApi = {
  getAll: (page = 1, pageSize = 10) =>
    apiFetch<Pagination<Role>>(`/api/Role?page=${page}&pageSize=${pageSize}`),
  create: (data: CreateRolePayload) =>
    apiFetch<Role>("/api/Role", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: UpdateRolePayload) =>
    apiFetch<Role>(`/api/Role/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) =>
    apiFetch<void>(`/api/Role/${id}`, { method: "DELETE" }),
};

export const permissionsApi = {
  getAll: (page = 1, pageSize = 100) =>
    apiFetch<Pagination<Permission>>(`/api/permission?page=${page}&pageSize=${pageSize}`),
};

// ── Account ──────────────────────────────────────────

export interface AccountItem {
  uuid: string;
  email: string;
  status: number;
  roleUuid: string;
  roleName: string;
  roleIsDefault: boolean;
  patientName: string | null;
  doctorName: string | null;
}

export interface CreateAccountPayload {
  email: string;
  password: string;
  status: number;
  roleUuid: string;
  // Doctor fields (when role is default)
  doctorName?: string;
  doctorImage?: string;
  doctorGender?: number;
  doctorViewDepartment?: string;
  hospitalGuid?: string;
  markdown?: string;
  isFeatured?: boolean;
  consultationFee?: number;
  // Patient fields (when role is not default)
  patientName?: string;
  patientImage?: string;
  patientGender?: number;
  patientAddress?: string;
  patientPhone?: string;
  patientEmail?: string;
  patientMedicalCode?: string;
}

export interface UpdateAccountPayload {
  email?: string;
  password?: string;
  status?: number;
  roleUuid?: string;
}

export interface UpdateDoctorProfilePayload {
  image?: string;
  name?: string;
  gender?: number;
  averageStar?: number;
  visit?: number;
  viewDepartment?: string;
  isFeatured?: boolean;
  hospitalGuid?: string;
  markdown?: string;
  consultationFee?: number;
}

export interface PatientProfile {
  uuid: string;
  image: string;
  name: string;
  gender: number;
  address: string;
  phone: string;
  email: string;
  medicalCode: string;
}

export interface DoctorProfile {
  uuid: string;
  image: string;
  name: string;
  gender: number;
  averageStar: number;
  visit: number;
  viewDepartment: string;
  isFeatured: boolean;
  markdown: string;
  consultationFee: number;
  hospitalGuid: string;
  hospitalName: string;
  departments: { uuid: string; departmentUuid: string; departmentName: string }[];
  schedules: { uuid: string; timeSlotUuid: string; startTime: string; endTime: string }[];
  reviews: { uuid: string; avatar: string; name: string; address: string; content: string; numberOfStar: number; isFeatured: boolean }[];
}

export interface Appointment {
  uuid: string;
  name: string;
  gender: number;
  phone: string;
  email: string;
  address: string;
  medicalCode: string;
  reason: string;
  startTime: string;
  endTime: string;
  paymentMethod: number;
  paymentStatus: number;
  status: number;
  patientUuid: string;
  doctorUuid: string;
}

export interface PrescriptionItem {
  uuid: string;
  price: number;
  quantity: number;
  frequency: string;
  instruction: string;
  dosage: number;
  source: number;
  medicineName: string;
}

export interface Prescription {
  uuid: string;
  totalPrice: number;
  reason: string;
  note: string;
  status: number;
  createdDate: string;
  patientUuid: string;
  doctorUuid: string;
  items: PrescriptionItem[];
}

export interface AccountDetail {
  uuid: string;
  email: string;
  status: number;
  roleUuid: string;
  roleName: string;
  roleIsDefault: boolean;
  patientProfile: PatientProfile | null;
  doctorProfile: DoctorProfile | null;
  appointments: Appointment[];
  prescriptions: Prescription[];
}

export const accountsApi = {
  getAll: (page = 1, pageSize = 10) =>
    apiFetch<Pagination<AccountItem>>(`/api/Account?page=${page}&pageSize=${pageSize}`),
  getDetail: (id: string) =>
    apiFetch<AccountDetail>(`/api/Account/${id}`),
  create: (data: CreateAccountPayload) =>
    apiFetch<AccountItem>("/api/Account", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: UpdateAccountPayload) =>
    apiFetch<AccountItem>(`/api/Account/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  delete: (id: string) =>
    apiFetch<void>(`/api/Account/${id}`, { method: "DELETE" }),
  updateDoctorProfile: (id: string, data: UpdateDoctorProfilePayload) =>
    apiFetch<DoctorProfile>(`/api/Account/${id}/doctor-profile`, { method: "PUT", body: JSON.stringify(data) }),
};
