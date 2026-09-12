using api.DTOs;
using api.DTOs.Account;
using api.Services.Account;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers.Account;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly IAccountService _accountService;

    public AccountController(IAccountService accountService)
    {
        _accountService = accountService;
    }

    /// <summary>
    /// Get all accounts with pagination
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<Pagination<AccountResponseDto>>> GetAllAccounts(
        [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
    {
        try
        {
            var result = await _accountService.GetAllAccountsAsync(page, pageSize);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = ex.Message });
        }
    }

    /// <summary>
    /// Get account detail with profile, appointments, prescriptions
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<AccountDetailDto>> GetAccountDetail(Guid id)
    {
        try
        {
            var result = await _accountService.GetAccountDetailAsync(id);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    /// <summary>
    /// Create account. If role.IsDefault, auto-create DoctorProfile.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<AccountResponseDto>> CreateAccount([FromBody] CreateAccountDto dto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _accountService.CreateAccountAsync(dto);
            return CreatedAtAction(nameof(GetAccountDetail), new { id = result.Uuid }, result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    /// <summary>
    /// Update account info
    /// </summary>
    [HttpPut("{id}")]
    public async Task<ActionResult<AccountResponseDto>> UpdateAccount(Guid id, [FromBody] UpdateAccountDto dto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _accountService.UpdateAccountAsync(id, dto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    /// <summary>
    /// Delete account
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAccount(Guid id)
    {
        try
        {
            await _accountService.DeleteAccountAsync(id);
            return NoContent();
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }

    /// <summary>
    /// Update doctor profile (including markdown)
    /// </summary>
    [HttpPut("{id}/doctor-profile")]
    public async Task<ActionResult<DoctorProfileDto>> UpdateDoctorProfile(Guid id, [FromBody] UpdateDoctorProfileDto dto)
    {
        try
        {
            var result = await _accountService.UpdateDoctorProfileAsync(id, dto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return NotFound(new { message = ex.Message });
        }
    }
}
