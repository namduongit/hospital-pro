using System.ComponentModel.DataAnnotations;
using api.Enums;

namespace api.DTOs.TimeSlot;

public class CreateTimeSlotDto
{
    [Required(ErrorMessage = "Ten khong duoc de trong")]
    public string Name { get; set; } = string.Empty;

    [Required]
    public TimeOnly StartTime { get; set; }

    [Required]
    public TimeOnly EndTime { get; set; }

    public DayOfWeek DayOfWeek { get; set; } = DayOfWeek.Monday;
    public TimeSlotStatus Status { get; set; } = TimeSlotStatus.Active;
}
