namespace api.DTOs.Account;

public class UpdateAccountDto
{
    public string? Email { get; set; }
    public string? Password { get; set; }
    public int? Status { get; set; }
    public Guid? RoleUuid { get; set; }
}
