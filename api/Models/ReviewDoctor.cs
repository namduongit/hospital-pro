using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class ReviewDoctor
{
    [Key]
    public Guid Uuid { get; set; }
    public string Avatar { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public int NumberOfStar { get; set; } = 5;
    public bool IsFeatured { get; set; } = false;

    // Patient
    public Guid PatientUuid { get; set; }
    public PatientProfile Patient { get; set; } = null!;
    
    // Doctor
    public Guid DoctorUuid { get; set; }
    public DoctorProfile Doctor { get; set; } = null!;
}