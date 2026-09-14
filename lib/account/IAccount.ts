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

