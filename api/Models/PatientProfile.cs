using System.ComponentModel.DataAnnotations;
using api.Enums;

namespace api.Models;

public class PatientProfile
{
    [Key]
    public Guid Uuid { get; set; }
    public string Image { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public Gender Gender { get; set; } = Gender.Other;
    public string Address { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string MedicalCode { get; set; } = string.Empty;

    // Account 
    public Guid AccountUuid { get; set; }
    public Account Account { get; set; } = null!;

    // ReviewHospitals
    public ICollection<ReviewHospital> ReviewHospitals { get; set; } = new List<ReviewHospital>();

    // ReviewDoctors
    public ICollection<ReviewDoctor> ReviewDoctors { get; set; } = new List<ReviewDoctor>();

    // Prescriptions
    public ICollection<Prescription> Prescriptions { get; set; } = new List<Prescription>();

    // Appointments
    public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}