using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class ExportTicketItem
{
    [Key]
    public Guid Uuid { get; set; }
    public int Quantity { get; set; }

    // ExportTicket
    public Guid ExportTicketUuid { get; set; }
    public ExportTicket ExportTicket { get; set; } = null!;

    // Medicine
    public Guid MedicineUuid { get; set; }
    public Medicine Medicine { get; set; } = null!;
}