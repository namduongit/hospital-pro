using api.DTOs;
using api.DTOs.Role;
using api.Exceptions;
using api.Libs;
using Microsoft.EntityFrameworkCore;

namespace api.Services.Role;

public interface IRoleService
{
    Task<Pagination<RoleResponseDto>> GetAllRolesAsync(int page = 1, int pageSize = 10);
    Task<RoleResponseDto> CreateRoleAsync(CreateRoleDto createRoleDto);
    Task<RoleResponseDto> UpdateRoleAsync(Guid roleId, UpdateRoleDto updateRoleDto);
    Task DeleteRoleAsync(Guid roleId);
}

public class RoleService : IRoleService
{
    private readonly DBConnection _dbContext;

    public RoleService(DBConnection dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Pagination<RoleResponseDto>> GetAllRolesAsync(int page = 1, int pageSize = 10)
    {
        var query = _dbContext.Roles.AsQueryable();
        var totalCount = await query.CountAsync();
        var totalPage = (int)Math.Ceiling(totalCount / (double)pageSize);

        var roles = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(r => new RoleResponseDto
            {
                Uuid = r.Uuid,
                Name = r.Name,
                Desc = r.Desc,
                IsDefault = r.IsDefault,
                Status = (int)r.Status,
                AccountCount = r.Accounts.Count
            })
            .ToListAsync();

        return new Pagination<RoleResponseDto>
        {
            Page = page,
            PageSize = pageSize,
            TotalPage = totalPage,
            Items = roles
        };
    }

    public async Task<RoleResponseDto> CreateRoleAsync(CreateRoleDto createRoleDto)
    {
        // Validate: If IsDefault is true, check if there's already a default role
        if (createRoleDto.IsDefault)
        {
            var existingDefaultRole = await _dbContext.Roles
                .FirstOrDefaultAsync(r => r.IsDefault);

            if (existingDefaultRole != null)
            {
                throw new DefaultRoleAlreadyExistsException();
            }
        }

        // Map DTO to Model
        var role = new Models.Role
        {
            Uuid = Guid.NewGuid(),
            Name = createRoleDto.Name,
            Desc = createRoleDto.Desc,
            IsDefault = createRoleDto.IsDefault,
            Status = (Enums.RoleStatus)createRoleDto.Status
        };

        _dbContext.Roles.Add(role);
        await _dbContext.SaveChangesAsync();

        return new RoleResponseDto
        {
            Uuid = role.Uuid,
            Name = role.Name,
            Desc = role.Desc,
            IsDefault = role.IsDefault,
            Status = (int)role.Status,
            AccountCount = await _dbContext.Accounts.CountAsync(a => a.RoleUuid == role.Uuid)
        };
    }

    public async Task<RoleResponseDto> UpdateRoleAsync(Guid roleId, UpdateRoleDto updateRoleDto)
    {
        var role = await _dbContext.Roles.FindAsync(roleId);
        if (role == null)
        {
            throw new RoleNotFoundException(roleId);
        }

        // Validate: If setting IsDefault to true, check for existing default role
        if (updateRoleDto.IsDefault.HasValue && updateRoleDto.IsDefault.Value && !role.IsDefault)
        {
            var existingDefaultRole = await _dbContext.Roles
                .FirstOrDefaultAsync(r => r.IsDefault);

            if (existingDefaultRole != null)
            {
                throw new DefaultRoleAlreadyExistsException();
            }
        }

        // Update only provided fields
        if (!string.IsNullOrEmpty(updateRoleDto.Name))
            role.Name = updateRoleDto.Name;

        if (!string.IsNullOrEmpty(updateRoleDto.Desc))
            role.Desc = updateRoleDto.Desc;

        if (updateRoleDto.IsDefault.HasValue)
            role.IsDefault = updateRoleDto.IsDefault.Value;

        if (updateRoleDto.Status.HasValue)
            role.Status = (Enums.RoleStatus)updateRoleDto.Status.Value;

        _dbContext.Roles.Update(role);
        await _dbContext.SaveChangesAsync();

        return new RoleResponseDto
        {
            Uuid = role.Uuid,
            Name = role.Name,
            Desc = role.Desc,
            IsDefault = role.IsDefault,
            Status = (int)role.Status,
            AccountCount = await _dbContext.Accounts.CountAsync(a => a.RoleUuid == role.Uuid)
        };
    }

    public async Task DeleteRoleAsync(Guid roleId)
    {
        var role = await _dbContext.Roles.FindAsync(roleId);
        if (role == null)
        {
            throw new RoleNotFoundException(roleId);
        }

        var accountCount = await _dbContext.Accounts.CountAsync(a => a.RoleUuid == roleId);
        if (accountCount > 0)
        {
            throw new InvalidOperationException(
                $"Cannot delete role '{role.Name}' because it still has {accountCount} account(s) assigned.");
        }

        _dbContext.Roles.Remove(role);
        await _dbContext.SaveChangesAsync();
    }
}
