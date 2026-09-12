namespace api.Exceptions;

public class PermissionNotFoundException : Exception
{
    public PermissionNotFoundException(Guid permissionId) 
        : base($"Permission with ID '{permissionId}' not found.")
    {
    }
}
