using System.ComponentModel.DataAnnotations;
using api.Enums;

namespace api.Models;

public class TimeSlot
{
    [Key]
    public Guid Uuid { get; set; }
    public string Name { get; set; } = string.Empty;
    public TimeOnly StartTime { get; set; }
    public TimeOnly EndTime { get; set; }
    public WeekDay DayOfWeek { get; set; } = WeekDay.Monday;
    public TimeSlotStatus Status { get; set; } = TimeSlotStatus.Active;

    // DoctorSchedule
    public ICollection<DoctorSchedule> DoctorSchedules { get; set; } = new List<DoctorSchedule>();
}
