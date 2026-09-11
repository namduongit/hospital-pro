using api.Enums;

namespace api.Models;

public class Account
{
    public Guid Uuid { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public AccountStatus Status { get; set; } = AccountStatus.Active;

    // Role
    public Guid RoleUuid { get; set; }
    public Role Role { get; set; } = null!;

    // Profile
    public PatientProfile PatientProfile { get; set; } = null!;
    public DoctorProfile DoctorProfile { get; set; } = null!;

    // ImportTickets
    public ICollection<ImportTicket> ImportTickets { get; set; } = new List<ImportTicket>();

    // ExportTickets
    public ICollection<ExportTicket> ExportTickets { get; set; } = new List<ExportTicket>();
}