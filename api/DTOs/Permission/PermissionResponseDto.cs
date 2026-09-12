namespace api.DTOs.Permission;

public class PermissionResponseDto
{
    public Guid Uuid { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Desc { get; set; } = string.Empty;
    public string Endpoint { get; set; } = string.Empty;
}
