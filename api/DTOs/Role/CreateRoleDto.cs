namespace api.DTOs.Role;

public class CreateRoleDto
{
    public string Name { get; set; } = string.Empty;
    public string Desc { get; set; } = string.Empty;
    public bool IsDefault { get; set; } = false;
    public int Status { get; set; } = 1; // RoleStatus.Active
}
