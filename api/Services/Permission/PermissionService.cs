using api.DTOs;
using api.DTOs.Permission;
using api.Libs;
using Microsoft.EntityFrameworkCore;

namespace api.Services.Permission;

public interface IPermissionService
{
    Task<Pagination<PermissionResponseDto>> GetAllPermissionsAsync(int page = 1, int pageSize = 10);
}

public class PermissionService : IPermissionService
{
    private readonly DBConnection _dbContext;

    public PermissionService(DBConnection dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Pagination<PermissionResponseDto>> GetAllPermissionsAsync(int page = 1, int pageSize = 10)
    {
        var query = _dbContext.Permissions.AsQueryable();
        var totalCount = await query.CountAsync();
        var totalPage = (int)Math.Ceiling(totalCount / (double)pageSize);

        var permissions = await query
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(p => new PermissionResponseDto
            {
                Uuid = p.Uuid,
                Name = p.Name,
                Desc = p.Desc,
                Endpoint = p.Endpoint
            })
            .ToListAsync();

        return new Pagination<PermissionResponseDto>
        {
            Page = page,
            PageSize = pageSize,
            TotalPage = totalPage,
            Items = permissions
        };
    }
}
