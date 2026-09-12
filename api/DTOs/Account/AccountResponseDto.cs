namespace api.DTOs.Account;

public class AccountResponseDto
{
    public Guid Uuid { get; set; }
    public string Email { get; set; } = string.Empty;
    public int Status { get; set; }
    public Guid RoleUuid { get; set; }
    public string RoleName { get; set; } = string.Empty;
    public bool RoleIsDefault { get; set; }
    public string? PatientName { get; set; }
    public string? DoctorName { get; set; }
}
