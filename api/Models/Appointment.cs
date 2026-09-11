using api.Enums;

namespace api.Models;

public class Appointment
{
    public Guid Uuid { get; set; }
    public string Name { get; set; } = string.Empty;
    public Gender Gender { get; set; } = Gender.Other;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string MedicalCode { get; set; } = string.Empty;
    public string Reason { get; set; } = string.Empty;
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public PaymentMethod PaymentMethod { get; set; } = PaymentMethod.Cash;
    public PaymentStatus PaymentStatus { get; set; } = PaymentStatus.UnPaid;
    public AppointmentStatus Status { get; set; } = AppointmentStatus.Pending;

    // Patient
    public Guid PatientUuid { get; set; }
    public PatientProfile Patient { get; set; } = null!;

    // Doctor
    public Guid DoctorUuid { get; set; } 
    public DoctorProfile Doctor { get; set; } = null!;
}