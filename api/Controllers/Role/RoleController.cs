using api.DTOs;
using api.DTOs.Role;
using api.Exceptions;
using api.Services.Role;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RoleController : ControllerBase
{
    private readonly IRoleService _roleService;

    public RoleController(IRoleService roleService)
    {
        _roleService = roleService;
    }

    /// <summary>
    /// Get all roles with pagination
    /// </summary>
    /// <param name="page">Page number (default: 1)</param>
    /// <param name="pageSize">Page size (default: 10)</param>
    /// <returns>Paginated list of roles</returns>
    [HttpGet]
    public async Task<ActionResult<Pagination<RoleResponseDto>>> GetAllRoles([FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        try
        {
            var result = await _roleService.GetAllRolesAsync(page, pageSize);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Create a new role
    /// </summary>
    /// <param name="createRoleDto">Role creation data: Name, Desc, IsDefault, Status</param>
    /// <returns>Created role</returns>
    [HttpPost]
    public async Task<ActionResult<RoleResponseDto>> CreateRole([FromBody] CreateRoleDto createRoleDto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _roleService.CreateRoleAsync(createRoleDto);
            return CreatedAtAction(nameof(CreateRole), new { id = result.Uuid }, result);
        }
        catch (DefaultRoleAlreadyExistsException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Update an existing role
    /// </summary>
    /// <param name="id">Role UUID</param>
    /// <param name="updateRoleDto">Fields to update: Name (optional), Desc (optional), IsDefault (optional), Status (optional)</param>
    /// <returns>Updated role</returns>
    [HttpPut("{id}")]
    public async Task<ActionResult<RoleResponseDto>> UpdateRole(Guid id, [FromBody] UpdateRoleDto updateRoleDto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _roleService.UpdateRoleAsync(id, updateRoleDto);
            return Ok(result);
        }
        catch (RoleNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (DefaultRoleAlreadyExistsException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Delete an existing role
    /// </summary>
    /// <param name="id">Role UUID</param>
    /// <returns>No content</returns>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteRole(Guid id)
    {
        try
        {
            await _roleService.DeleteRoleAsync(id);
            return NoContent();
        }
        catch (RoleNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
        }
    }
}
