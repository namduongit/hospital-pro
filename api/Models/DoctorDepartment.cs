namespace api.Models;

public class DoctorDepartment
{
    public Guid Uuid { get; set; }

    // Doctor
    public Guid DoctorUuid { get; set; }
    public DoctorProfile Doctor { get; set; } = null!;

    // Department
    public Guid DepartmentUuid { get; set; }
    public Department Department { get; set; } = null!;
}