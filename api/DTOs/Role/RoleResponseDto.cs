namespace api.DTOs.Role;

public class RoleResponseDto
{
    public Guid Uuid { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Desc { get; set; } = string.Empty;
    public bool IsDefault { get; set; }
    public int Status { get; set; }
    public int AccountCount { get; set; }
}
