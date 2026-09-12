using System.ComponentModel.DataAnnotations;
using api.Enums;

namespace api.Models;

public class RolePermission
{
    [Key]
    public Guid Uuid { get; set; }
    public PermissionAction Action { get; set; } = PermissionAction.View;

    // Role
    public Guid RoleUuid { get; set; }
    public Role Role { get; set; } = null!;

    // Permission
    public Guid PermissionUuid { get; set; }
    public Permission Permission { get; set; } = null!;
}