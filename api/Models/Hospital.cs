using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class Hospital
{
    [Key]
    public Guid Uuid { get; set; }
    public string Image { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Hotline { get; set; } = string.Empty;
    public string Markdown { get; set; } = string.Empty;

    public bool IsFeatured { get; set; } = false;

    // Doctors
    public ICollection<DoctorProfile> Doctors { get; set; } = new List<DoctorProfile>();

    // HospitalDepartments
    public ICollection<HospitalDepartment> HospitalDepartments { get; set; } = new List<HospitalDepartment>();
}