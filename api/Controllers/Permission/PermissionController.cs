using api.DTOs;
using api.DTOs.Permission;
using api.Services.Permission;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Permission;

[ApiController]
[Route("api/permission")]
public class PermissionController : ControllerBase
{
    private readonly IPermissionService _permissionService;

    public PermissionController(IPermissionService permissionService)
    {
        _permissionService = permissionService;
    }

    /// <summary>
    /// Get all permissions with pagination
    /// </summary>
    /// <param name="page">Page number (default: 1)</param>
    /// <param name="pageSize">Page size (default: 10)</param>
    /// <returns>Paginated list of permissions</returns>
    [HttpGet]
    public async Task<ActionResult<Pagination<PermissionResponseDto>>> GetAllPermissions([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        try
        {
            var result = await _permissionService.GetAllPermissionsAsync(page, pageSize);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
        }
    }
}
