using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class HospitalDepartment
{
    [Key]
    public Guid Uuid { get; set; }

    // Hospital
    public Guid HospitalUuid { get; set; }
    public Hospital Hospital { get; set; } = null!;

    // Department
    public Guid DepartmentUuid { get; set; }
    public Department Department { get; set; } = null!;
}