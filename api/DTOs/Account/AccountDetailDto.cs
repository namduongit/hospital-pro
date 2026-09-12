namespace api.DTOs.Account;

public class AccountDetailDto
{
    public Guid Uuid { get; set; }
    public string Email { get; set; } = string.Empty;
    public int Status { get; set; }
    public Guid RoleUuid { get; set; }
    public string RoleName { get; set; } = string.Empty;
    public bool RoleIsDefault { get; set; }
    public PatientProfileDto? PatientProfile { get; set; }
    public DoctorProfileDto? DoctorProfile { get; set; }
    public ICollection<AppointmentDto> Appointments { get; set; } = new List<AppointmentDto>();
    public ICollection<PrescriptionDto> Prescriptions { get; set; } = new List<PrescriptionDto>();
}
