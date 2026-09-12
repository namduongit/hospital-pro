using System.ComponentModel.DataAnnotations;
using api.Enums;

namespace api.Models;

public class Role
{
    [Key]
    public Guid Uuid { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Desc { get; set; } = string.Empty;
    public bool IsDefault { get; set; } = false;
    public RoleStatus Status { get; set; } = RoleStatus.Active;

    // RolePermission
    public ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();

    // Account
    public ICollection<Account> Accounts { get; set; } = new List<Account>();
}