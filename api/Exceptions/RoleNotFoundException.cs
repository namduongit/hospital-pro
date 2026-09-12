namespace api.Exceptions;

public class RoleNotFoundException : Exception
{
    public RoleNotFoundException(Guid roleId) 
        : base($"Role with ID '{roleId}' not found.")
    {
    }
}
