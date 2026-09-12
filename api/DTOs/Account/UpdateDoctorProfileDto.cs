namespace api.DTOs.Account;

public class UpdateDoctorProfileDto
{
    public string? Image { get; set; }
    public string? Name { get; set; }
    public int? Gender { get; set; }
    public int? AverageStar { get; set; }
    public int? Visit { get; set; }
    public string? ViewDepartment { get; set; }
    public bool? IsFeatured { get; set; }
    public Guid? HospitalGuid { get; set; }
    public string? Markdown { get; set; }
    public int? ConsultationFee { get; set; }
}
