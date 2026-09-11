namespace api.Models;

public class ImportTicketItem
{
    public Guid Uuid { get; set; }
    public int Quantity { get; set; } = 0;
    public int Price { get; set; } = 0;

    // ImportTicket
    public Guid ImportTicketUuid { get; set; }
    public ImportTicket ImportTicket { get; set; } = null!;

    // Medicine
    public Guid MedicineUuid { get; set; }
    public Medicine Medicine { get; set; } = null!;

    // Distributor
    public Guid DistributorUuid { get; set; }
    public Distributor Distributor { get; set; } = null!;
}