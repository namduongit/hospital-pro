namespace api.DTOs.Account;

public class PrescriptionDto
{
    public Guid Uuid { get; set; }
    public int TotalPrice { get; set; }
    public string Reason { get; set; } = string.Empty;
    public string Note { get; set; } = string.Empty;
    public int Status { get; set; }
    public string CreatedDate { get; set; } = string.Empty;
    public Guid PatientUuid { get; set; }
    public Guid DoctorUuid { get; set; }
    public ICollection<PrescriptionItemDto> Items { get; set; } = new List<PrescriptionItemDto>();
}

public class PrescriptionItemDto
{
    public Guid Uuid { get; set; }
    public int Price { get; set; }
    public int Quantity { get; set; }
    public string Frequency { get; set; } = string.Empty;
    public string Instruction { get; set; } = string.Empty;
    public int Dosage { get; set; }
    public int Source { get; set; }
    public string MedicineName { get; set; } = string.Empty;
}
