using System.ComponentModel.DataAnnotations;
using api.Enums;

namespace api.Models;

public class Prescription
{
    [Key]
    public Guid Uuid { get; set; }
    public int TotalPrice { get; set; } = 0;
    public string Reason { get; set; } = string.Empty;
    public string Note { get; set; } = string.Empty;
    public PrescriptionStatus Status { get; set; } = PrescriptionStatus.UnPaid;
    public DateOnly CreatedDate { get; set; }

    // Patient
    public Guid PatientUuid { get; set; }
    public PatientProfile Patient { get; set; } = null!;

    // Doctor
    public Guid DoctorUuid { get; set; }
    public DoctorProfile Doctor { get; set; } = null!;

    // PrescriptionItems
    public ICollection<PrescriptionItem> PrescriptionItems { get; set; } = new List<PrescriptionItem>();
}