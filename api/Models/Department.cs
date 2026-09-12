using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class Department
{
    [Key]
    public Guid Uuid { get; set; }
    public string Icon { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Desc { get; set; } = string.Empty;
    public bool IsFeatured { get; set; } = false;

    // HospitalDepartments
    public ICollection<HospitalDepartment> HospitalDepartments { get; set; } = new List<HospitalDepartment>();

    // DoctorDepartments
    public ICollection<DoctorDepartment> DoctorDepartments { get; set; } = new List<DoctorDepartment>();
}