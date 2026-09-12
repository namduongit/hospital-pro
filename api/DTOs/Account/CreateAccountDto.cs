namespace api.DTOs.Account;

public class CreateAccountDto
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public int Status { get; set; } = 0;
    public Guid RoleUuid { get; set; }

    // Doctor profile fields (used when role.IsDefault == true)
    public string? DoctorName { get; set; }
    public string? DoctorImage { get; set; }
    public int? DoctorGender { get; set; }
    public string? DoctorViewDepartment { get; set; }
    public Guid? HospitalGuid { get; set; }
    public string? Markdown { get; set; }
    public bool? IsFeatured { get; set; }
    public int? ConsultationFee { get; set; }

    // Patient profile fields (used when role.IsDefault == false)
    public string? PatientName { get; set; }
    public string? PatientImage { get; set; }
    public int? PatientGender { get; set; }
    public string? PatientAddress { get; set; }
    public string? PatientPhone { get; set; }
    public string? PatientEmail { get; set; }
    public string? PatientMedicalCode { get; set; }
}
