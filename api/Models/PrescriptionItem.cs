using api.Enums;

namespace api.Models;

public class PrescriptionItem
{
    public Guid Uuid { get; set; }
    public int Price { get; set; } = 0;
    public int Quantity { get; set; } = 0;
    public string Frequency { get; set; } = string.Empty;
    public string Instruction { get; set; } = string.Empty;
    public DosageType Dosage { get; set; } = DosageType.Oral;
    public MedicineSource Source { get; set; } = MedicineSource.InHouse;

    // Prescription
    public Guid PrescriptionUuid { get; set; }
    public Prescription Prescription { get; set; } = null!;

    // Medicine
    public Guid MedicineUuid { get; set; }
    public Medicine Medicine { get; set; } = null!;
}