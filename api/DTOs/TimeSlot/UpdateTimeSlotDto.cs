using api.Enums;

namespace api.DTOs.TimeSlot;

public class UpdateTimeSlotDto
{
    public string? Name { get; set; }
    public TimeOnly? StartTime { get; set; }
    public TimeOnly? EndTime { get; set; }
    public DayOfWeek? DayOfWeek { get; set; }
    public TimeSlotStatus? Status { get; set; }
}
