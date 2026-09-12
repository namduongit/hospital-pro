using System.ComponentModel.DataAnnotations;
using api.Enums;

namespace api.Models;

public class DoctorProfile
{
    [Key]
    public Guid Uuid { get; set; }
    public string Image { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public Gender Gender { get; set; } = Gender.Other;
    public int AverageStar { get; set; } = 5;
    public int Visit { get; set; } = 0;
    public string ViewDepartment { get; set; } = string.Empty;
    public bool IsFeatured { get; set; } = false;
    public string Markdown { get; set; } = string.Empty;
    public int ConsultationFee { get; set; } = 0;

    // Account 
    public Guid AccountUuid { get; set; }
    public Account Account { get; set; } = null!;

    // Hospital
    public Guid HospitalGuid { get; set; }
    public Hospital Hospital { get; set; } = null!;

    // DoctorDepartments
    public ICollection<DoctorDepartment> DoctorDepartments { get; set; } = new List<DoctorDepartment>();

    // DoctorSchedules
    public ICollection<DoctorSchedule> DoctorSchedules { get; set; } = new List<DoctorSchedule>();

    // ReviewDoctors
    public ICollection<ReviewDoctor> ReviewDoctors { get; set; } = new List<ReviewDoctor>();
    
    // Prescriptions
    public ICollection<Prescription> Prescriptions { get; set; } = new List<Prescription>();

    // Appointments
    public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}
