using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class DoctorSchedule
{
    [Key]
    public Guid Uuid { get; set; }

    // Doctor
    public Guid DoctorUuid { get; set; }
    public DoctorProfile Doctor { get; set; } = null!;

    // TimeSlot
    public Guid TimeSlotUuid { get; set; }
    public TimeSlot TimeSlot { get; set; } = null!;
}