using api.Enums;

namespace api.Models;

public class Distributor
{
    public Guid Uuid { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public int ImportQuantity { get; set; } = 0;
    public DistributorStatus Status { get; set; } = DistributorStatus.Active;

    // ImportTicketItems
    public ICollection<ImportTicketItem> ImportTicketItems { get; set; } = new List<ImportTicketItem>();
}