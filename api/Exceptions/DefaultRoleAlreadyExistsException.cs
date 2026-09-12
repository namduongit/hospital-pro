namespace api.Exceptions;

public class DefaultRoleAlreadyExistsException : Exception
{
    public DefaultRoleAlreadyExistsException() 
        : base("A default role already exists. Only one role can be set as default.")
    {
    }
}
