namespace api.DTOs.TimeSlot;

public class TimeSlotRequestDto
{
    public Guid Uuid { get; set; }
    public string Name { get; set; } = string.Empty;
    public string StartTime { get; set; } = string.Empty;
    public string EndTime { get; set; } = string.Empty;
    public int DayOfWeek { get; set; }
    public int Status { get; set; }
    public int DoctorCount { get; set; }
}
