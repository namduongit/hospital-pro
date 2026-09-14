using api.DTOs;
using api.DTOs.Account;
using api.Exceptions;
using api.Libs;
using api.Enums;
using Microsoft.EntityFrameworkCore;

namespace api.Services.Account;

public interface IAccountService
{
    Task<Pagination<AccountResponseDto>> GetAllAccountsAsync(int page = 1, int pageSize = 10);
    Task<AccountDetailDto> GetAccountDetailAsync(Guid accountId);
    Task<AccountResponseDto> CreateAccountAsync(CreateAccountDto dto);
    Task<AccountResponseDto> UpdateAccountAsync(Guid accountId, UpdateAccountDto dto);
    Task DeleteAccountAsync(Guid accountId);
    Task<DoctorProfileDto> UpdateDoctorProfileAsync(Guid accountId, UpdateDoctorProfileDto dto);
}

public class AccountService : IAccountService
{
    private readonly DBConnection _db;

    public AccountService(DBConnection db) => _db = db;

    public async Task<Pagination<AccountResponseDto>> GetAllAccountsAsync(int page = 1, int pageSize = 10)
    {
        var totalCount = await _db.Accounts.CountAsync();
        var totalPage = (int)Math.Ceiling(totalCount / (double)pageSize);

        var items = await _db.Accounts
            .OrderByDescending(a => a.Uuid)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(a => new AccountResponseDto
            {
                Uuid = a.Uuid,
                Email = a.Email,
                Status = (int)a.Status,
                RoleUuid = a.RoleUuid,
                RoleName = a.Role.Name,
                RoleIsDefault = a.Role.IsDefault,
                PatientName = a.PatientProfile != null ? a.PatientProfile.Name : null,
                DoctorName = a.DoctorProfile != null ? a.DoctorProfile.Name : null,
            })
            .ToListAsync();

        return new Pagination<AccountResponseDto>
        {
            Page = page,
            PageSize = pageSize,
            TotalPage = totalPage,
            Items = items,
        };
    }

    public async Task<AccountDetailDto> GetAccountDetailAsync(Guid accountId)
    {
        // 1. Account — simple query, no Include
        var a = await _db.Accounts
            .FirstOrDefaultAsync(x => x.Uuid == accountId)
            ?? throw new Exception($"Account '{accountId}' not found.");

        var role = await _db.Roles.FirstOrDefaultAsync(r => r.Uuid == a.RoleUuid);

        var dto = new AccountDetailDto
        {
            Uuid = a.Uuid,
            Email = a.Email,
            Status = (int)a.Status,
            RoleUuid = a.RoleUuid,
            RoleName = role?.Name ?? string.Empty,
            RoleIsDefault = role?.IsDefault ?? false,
        };

        // 2. Patient profile
        var pp = await _db.PatientProfiles.FirstOrDefaultAsync(p => p.AccountUuid == accountId);
        if (pp != null)
        {
            dto.PatientProfile = new PatientProfileDto
            {
                Uuid = pp.Uuid,
                Image = pp.Image,
                Name = pp.Name,
                Gender = (int)pp.Gender,
                Address = pp.Address,
                Phone = pp.Phone,
                Email = pp.Email,
                MedicalCode = pp.MedicalCode,
            };
        }

        // 3. Doctor profile — single query, no Include
        var dp = await _db.DoctorProfiles.FirstOrDefaultAsync(d => d.AccountUuid == accountId);

        if (dp != null)
        {
            var hospital = await _db.Hospitals.FirstOrDefaultAsync(h => h.Uuid == dp.HospitalGuid);

            var departments = await (
                from dd in _db.DoctorDepartments
                join dept in _db.Departments on dd.DepartmentUuid equals dept.Uuid
                where dd.DoctorUuid == dp.Uuid
                select new DoctorDepartmentDto
                {
                    Uuid = dd.Uuid,
                    DepartmentUuid = dd.DepartmentUuid,
                    DepartmentName = dept.Name,
                }).ToListAsync();

            var schedules = await (
                from ds in _db.DoctorSchedules
                join ts in _db.TimeSlots on ds.TimeSlotUuid equals ts.Uuid
                where ds.DoctorUuid == dp.Uuid
                select new DoctorScheduleDto
                {
                    Uuid = ds.Uuid,
                    TimeSlotUuid = ds.TimeSlotUuid,
                    StartTime = ts.StartTime.ToString("HH:mm"),
                    EndTime = ts.EndTime.ToString("HH:mm"),
                }).ToListAsync();

            var reviews = await _db.ReviewDoctors
                .Where(r => r.DoctorUuid == dp.Uuid)
                .Select(r => new ReviewDoctorDto
                {
                    Uuid = r.Uuid,
                    Avatar = r.Avatar,
                    Name = r.Name,
                    Address = r.Address,
                    Content = r.Content,
                    NumberOfStar = r.NumberOfStar,
                    IsFeatured = r.IsFeatured,
                }).ToListAsync();

            dto.DoctorProfile = new DoctorProfileDto
            {
                Uuid = dp.Uuid,
                Image = dp.Image,
                Name = dp.Name,
                Gender = (int)dp.Gender,
                AverageStar = dp.AverageStar,
                Visit = dp.Visit,
                ViewDepartment = dp.ViewDepartment,
                IsFeatured = dp.IsFeatured,
                Markdown = dp.Markdown,
                ConsultationFee = dp.ConsultationFee,
                HospitalGuid = dp.HospitalGuid,
                HospitalName = hospital?.Name ?? string.Empty,
                Departments = departments,
                Schedules = schedules,
                Reviews = reviews,
            };
        }

        // 4. Appointments
        var patientUuid = pp?.Uuid;
        var doctorUuid = dp?.Uuid;

        dto.Appointments = await _db.Appointments
            .Where(ap =>
                (patientUuid.HasValue && ap.PatientUuid == patientUuid.Value) ||
                (doctorUuid.HasValue && ap.DoctorUuid == doctorUuid.Value))
            .OrderByDescending(ap => ap.Uuid)
            .Take(50)
            .Select(ap => new AppointmentDto
            {
                Uuid = ap.Uuid,
                Name = ap.Name,
                Gender = (int)ap.Gender,
                Phone = ap.Phone,
                Email = ap.Email,
                Address = ap.Address,
                MedicalCode = ap.MedicalCode,
                Reason = ap.Reason,
                StartTime = ap.StartTime.ToString("HH:mm"),
                EndTime = ap.EndTime.ToString("HH:mm"),
                PaymentMethod = (int)ap.PaymentMethod,
                PaymentStatus = (int)ap.PaymentStatus,
                Status = (int)ap.Status,
                PatientUuid = ap.PatientUuid,
                DoctorUuid = ap.DoctorUuid,
            })
            .ToListAsync();

        // 5. Prescriptions
        dto.Prescriptions = await _db.Prescriptions
            .Where(p =>
                (patientUuid.HasValue && p.PatientUuid == patientUuid.Value) ||
                (doctorUuid.HasValue && p.DoctorUuid == doctorUuid.Value))
            .OrderByDescending(p => p.Uuid)
            .Take(50)
            .Select(p => new PrescriptionDto
            {
                Uuid = p.Uuid,
                TotalPrice = p.TotalPrice,
                Reason = p.Reason,
                Note = p.Note,
                Status = (int)p.Status,
                CreatedDate = p.CreatedDate.ToString("dd/MM/yyyy"),
                PatientUuid = p.PatientUuid,
                DoctorUuid = p.DoctorUuid,
                Items = p.PrescriptionItems.Select(pi => new PrescriptionItemDto
                {
                    Uuid = pi.Uuid,
                    Price = pi.Price,
                    Quantity = pi.Quantity,
                    Frequency = pi.Frequency,
                    Instruction = pi.Instruction,
                    Dosage = (int)pi.Dosage,
                    Source = (int)pi.Source,
                    MedicineName = pi.Medicine.Name,
                }).ToList(),
            })
            .ToListAsync();

        return dto;
    }

    public async Task<AccountResponseDto> CreateAccountAsync(CreateAccountDto dto)
    {
        var role = await _db.Roles.FindAsync(dto.RoleUuid)
            ?? throw new Exception($"Role '{dto.RoleUuid}' not found.");

        var account = new Models.Account
        {
            Uuid = Guid.NewGuid(),
            Email = dto.Email,
            Password = dto.Password, // TODO: hash in production
            Status = (AccountStatus)dto.Status,
            RoleUuid = dto.RoleUuid,
        };

        _db.Accounts.Add(account);
        await _db.SaveChangesAsync();

        if (role.IsDefault)
        {
            var doctorProfile = new Models.DoctorProfile
            {
                Uuid = Guid.NewGuid(),
                Image = dto.DoctorImage ?? string.Empty,
                Name = dto.DoctorName ?? dto.Email,
                Gender = (Gender)(dto.DoctorGender ?? 0),
                AverageStar = 5,
                Visit = 0,
                ViewDepartment = dto.DoctorViewDepartment ?? string.Empty,
                IsFeatured = dto.IsFeatured ?? false,
                Markdown = dto.Markdown ?? string.Empty,
                ConsultationFee = dto.ConsultationFee ?? 0,
                AccountUuid = account.Uuid,
                HospitalGuid = dto.HospitalGuid ?? _db.Hospitals.FirstOrDefault()?.Uuid
                    ?? throw new Exception("No hospital found. Create a hospital first."),
            };
            _db.DoctorProfiles.Add(doctorProfile);
            await _db.SaveChangesAsync();
        }
        else
        {
            var patientProfile = new Models.PatientProfile
            {
                Uuid = Guid.NewGuid(),
                Image = dto.PatientImage ?? string.Empty,
                Name = dto.PatientName ?? dto.Email,
                Gender = (Gender)(dto.PatientGender ?? 0),
                Address = dto.PatientAddress ?? string.Empty,
                Phone = dto.PatientPhone ?? string.Empty,
                Email = dto.PatientEmail ?? dto.Email,
                MedicalCode = dto.PatientMedicalCode ?? string.Empty,
                AccountUuid = account.Uuid,
            };
            _db.PatientProfiles.Add(patientProfile);
            await _db.SaveChangesAsync();
        }

        return await GetAccountResponseAsync(account.Uuid);
    }

    public async Task<AccountResponseDto> UpdateAccountAsync(Guid accountId, UpdateAccountDto dto)
    {
        var account = await _db.Accounts.FindAsync(accountId)
            ?? throw new Exception($"Account '{accountId}' not found.");

        if (!string.IsNullOrEmpty(dto.Email)) account.Email = dto.Email;
        if (!string.IsNullOrEmpty(dto.Password)) account.Password = dto.Password;
        if (dto.Status.HasValue) account.Status = (AccountStatus)dto.Status.Value;
        if (dto.RoleUuid.HasValue) account.RoleUuid = dto.RoleUuid.Value;

        _db.Accounts.Update(account);
        await _db.SaveChangesAsync();

        return await GetAccountResponseAsync(accountId);
    }

    public async Task DeleteAccountAsync(Guid accountId)
    {
        var account = await _db.Accounts
            .FirstOrDefaultAsync(a => a.Uuid == accountId)
            ?? throw new Exception($"Account '{accountId}' not found.");

        var pp = await _db.PatientProfiles.FirstOrDefaultAsync(p => p.AccountUuid == accountId);
        if (pp != null)
            _db.PatientProfiles.Remove(pp);

        var dp = await _db.DoctorProfiles.FirstOrDefaultAsync(d => d.AccountUuid == accountId);
        if (dp != null)
        {
            var doctorDepartments = await _db.DoctorDepartments.Where(dd => dd.DoctorUuid == dp.Uuid).ToListAsync();
            var doctorSchedules = await _db.DoctorSchedules.Where(ds => ds.DoctorUuid == dp.Uuid).ToListAsync();
            _db.DoctorDepartments.RemoveRange(doctorDepartments);
            _db.DoctorSchedules.RemoveRange(doctorSchedules);
            _db.DoctorProfiles.Remove(dp);
        }

        _db.Accounts.Remove(account);
        await _db.SaveChangesAsync();
    }

    public async Task<DoctorProfileDto> UpdateDoctorProfileAsync(Guid accountId, UpdateDoctorProfileDto dto)
    {
        var dp = await _db.DoctorProfiles.FirstOrDefaultAsync(d => d.AccountUuid == accountId)
            ?? throw new Exception($"Doctor profile for account '{accountId}' not found.");

        if (dto.Image != null) dp.Image = dto.Image;
        if (dto.Name != null) dp.Name = dto.Name;
        if (dto.Gender.HasValue) dp.Gender = (Gender)dto.Gender.Value;
        if (dto.AverageStar.HasValue) dp.AverageStar = dto.AverageStar.Value;
        if (dto.Visit.HasValue) dp.Visit = dto.Visit.Value;
        if (dto.ViewDepartment != null) dp.ViewDepartment = dto.ViewDepartment;
        if (dto.IsFeatured.HasValue) dp.IsFeatured = dto.IsFeatured.Value;
        if (dto.HospitalGuid.HasValue) dp.HospitalGuid = dto.HospitalGuid.Value;
        if (dto.Markdown != null) dp.Markdown = dto.Markdown;
        if (dto.ConsultationFee.HasValue) dp.ConsultationFee = dto.ConsultationFee.Value;

        _db.DoctorProfiles.Update(dp);
        await _db.SaveChangesAsync();

        var hospital = await _db.Hospitals.FirstOrDefaultAsync(h => h.Uuid == dp.HospitalGuid);

        var departments = await (
            from dd in _db.DoctorDepartments
            join dept in _db.Departments on dd.DepartmentUuid equals dept.Uuid
            where dd.DoctorUuid == dp.Uuid
            select new DoctorDepartmentDto
            {
                Uuid = dd.Uuid,
                DepartmentUuid = dd.DepartmentUuid,
                DepartmentName = dept.Name,
            }).ToListAsync();

        var schedules = await (
            from ds in _db.DoctorSchedules
            join ts in _db.TimeSlots on ds.TimeSlotUuid equals ts.Uuid
            where ds.DoctorUuid == dp.Uuid
            select new DoctorScheduleDto
            {
                Uuid = ds.Uuid,
                TimeSlotUuid = ds.TimeSlotUuid,
                StartTime = ts.StartTime.ToString("HH:mm"),
                EndTime = ts.EndTime.ToString("HH:mm"),
            }).ToListAsync();

        var reviews = await _db.ReviewDoctors
            .Where(r => r.DoctorUuid == dp.Uuid)
            .Select(r => new ReviewDoctorDto
            {
                Uuid = r.Uuid,
                Avatar = r.Avatar,
                Name = r.Name,
                Address = r.Address,
                Content = r.Content,
                NumberOfStar = r.NumberOfStar,
                IsFeatured = r.IsFeatured,
            }).ToListAsync();

        return new DoctorProfileDto
        {
            Uuid = dp.Uuid,
            Image = dp.Image,
            Name = dp.Name,
            Gender = (int)dp.Gender,
            AverageStar = dp.AverageStar,
            Visit = dp.Visit,
            ViewDepartment = dp.ViewDepartment,
            IsFeatured = dp.IsFeatured,
            Markdown = dp.Markdown,
            ConsultationFee = dp.ConsultationFee,
            HospitalGuid = dp.HospitalGuid,
            HospitalName = hospital?.Name ?? string.Empty,
            Departments = departments,
            Schedules = schedules,
            Reviews = reviews,
        };
    }

    private async Task<AccountResponseDto> GetAccountResponseAsync(Guid accountId)
    {
        return await _db.Accounts
            .Where(a => a.Uuid == accountId)
            .Select(a => new AccountResponseDto
            {
                Uuid = a.Uuid,
                Email = a.Email,
                Status = (int)a.Status,
                RoleUuid = a.RoleUuid,
                RoleName = a.Role.Name,
                RoleIsDefault = a.Role.IsDefault,
                PatientName = a.PatientProfile != null ? a.PatientProfile.Name : null,
                DoctorName = a.DoctorProfile != null ? a.DoctorProfile.Name : null,
            })
            .FirstAsync();
    }
}
