using System.ComponentModel.DataAnnotations;

namespace api.Models;

public class Permission
{
    [Key]
    public Guid Uuid { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Desc { get; set; } = string.Empty;
    public string Endpoint { get; set; } = string.Empty;

    // RolePermissions
    public ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();
}