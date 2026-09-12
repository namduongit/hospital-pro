using System.ComponentModel.DataAnnotations;
using api.Enums;

namespace api.Models;

public class ImportTicket
{
    [Key]
    public Guid Uuid { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Note { get; set; } = string.Empty;
    public int TotalPrice { get; set; } = 0;
    public int TotalQuantity { get; set; } = 0;
    public ImportTicketStatus Status { get; set; } = ImportTicketStatus.Pending;
    public DateOnly CreatedDate { get; set; }
    
    // Account
    public Guid AccountUuid { get; set; }
    public Account Account { get; set; } = null!;

    // ImportTicketItems
    public ICollection<ImportTicketItem> ImportTicketItems { get; set; } = new List<ImportTicketItem>();
}