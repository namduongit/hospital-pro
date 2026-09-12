namespace api.DTOs.Role;

public class UpdateRoleDto
{
    public string? Name { get; set; }
    public string? Desc { get; set; }
    public bool? IsDefault { get; set; }
    public int? Status { get; set; }
}
