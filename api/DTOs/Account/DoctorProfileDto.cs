namespace api.DTOs.Account;

public class DoctorProfileDto
{
    public Guid Uuid { get; set; }
    public string Image { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public int Gender { get; set; }
    public int AverageStar { get; set; }
    public int Visit { get; set; }
    public string ViewDepartment { get; set; } = string.Empty;
    public bool IsFeatured { get; set; }
    public string Markdown { get; set; } = string.Empty;
    public int ConsultationFee { get; set; }
    public Guid HospitalGuid { get; set; }
    public string HospitalName { get; set; } = string.Empty;
    public ICollection<DoctorDepartmentDto> Departments { get; set; } = new List<DoctorDepartmentDto>();
    public ICollection<DoctorScheduleDto> Schedules { get; set; } = new List<DoctorScheduleDto>();
    public ICollection<ReviewDoctorDto> Reviews { get; set; } = new List<ReviewDoctorDto>();
}

public class DoctorDepartmentDto
{
    public Guid Uuid { get; set; }
    public Guid DepartmentUuid { get; set; }
    public string DepartmentName { get; set; } = string.Empty;
}

public class DoctorScheduleDto
{
    public Guid Uuid { get; set; }
    public Guid TimeSlotUuid { get; set; }
    public string StartTime { get; set; } = string.Empty;
    public string EndTime { get; set; } = string.Empty;
}

public class ReviewDoctorDto
{
    public Guid Uuid { get; set; }
    public string Avatar { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public int NumberOfStar { get; set; }
    public bool IsFeatured { get; set; }
}
