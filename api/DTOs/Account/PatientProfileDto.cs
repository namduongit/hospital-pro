namespace api.DTOs.Account;

public class PatientProfileDto
{
    public Guid Uuid { get; set; }
    public string Image { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int Gender { get; set; }
    public string Address { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string MedicalCode { get; set; } = string.Empty;
}
