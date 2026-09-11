using api.Enums;

namespace api.Models;

public class TimeSlot
{
    public Guid Uuid { get; set; }
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public TimeSlotStatus Status { get; set; } = TimeSlotStatus.Active;

    // DoctorSchedule
    public ICollection<DoctorSchedule> DoctorSchedules { get; set; } = new List<DoctorSchedule>();
}