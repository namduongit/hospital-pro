namespace api.DTOs.Account;

public class AppointmentDto
{
    public Guid Uuid { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Gender { get; set; }
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string MedicalCode { get; set; } = string.Empty;
    public string Reason { get; set; } = string.Empty;
    public string StartTime { get; set; } = string.Empty;
    public string EndTime { get; set; } = string.Empty;
    public int PaymentMethod { get; set; }
    public int PaymentStatus { get; set; }
    public int Status { get; set; }
    public Guid PatientUuid { get; set; }
    public Guid DoctorUuid { get; set; }
}
