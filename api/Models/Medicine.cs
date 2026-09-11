using api.Enums;

namespace api.Models;

public class Medicine
{
    public Guid Uuid { get; set; }
    public string Name { get; set; } = string.Empty;
    public string BarCode { get; set; } = string.Empty;
    public string DefaultInstruction { get; set; } = string.Empty;
    public int Stock { get; set; } = 0;
    public int Price { get; set; } = 0;
    public MedicineUnit Unit { get; set; } = MedicineUnit.Other;
    public MedicineStatus Status { get; set; } = MedicineStatus.Active;

    // PrescriptionItems
    public ICollection<PrescriptionItem> PrescriptionItems { get; set; } = new List<PrescriptionItem>();

    // ImportTicketItems
    public ICollection<ImportTicketItem> ImportTicketItems { get; set; } = new List<ImportTicketItem>();

    // ExportTicketItems
    public ICollection<ExportTicketItem> ExportTicketItems { get; set; } = new List<ExportTicketItem>();

}