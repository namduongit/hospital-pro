using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Libs;

public class DBConnection : DbContext
{
    public DBConnection(DbContextOptions<DBConnection> options) : base(options)
    {
    }

    public DbSet<Account> Accounts { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Permission> Permissions { get; set; }
    public DbSet<RolePermission> RolePermissions { get; set; }
    public DbSet<PatientProfile> PatientProfiles { get; set; }
    public DbSet<DoctorProfile> DoctorProfiles { get; set; }
    public DbSet<Hospital> Hospitals { get; set; }
    public DbSet<Department> Departments { get; set; }
    public DbSet<HospitalDepartment> HospitalDepartments { get; set; }
    public DbSet<DoctorDepartment> DoctorDepartments { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<TimeSlot> TimeSlots { get; set; }
    public DbSet<DoctorSchedule> DoctorSchedules { get; set; }
    public DbSet<Medicine> Medicines { get; set; }
    public DbSet<Prescription> Prescriptions { get; set; }
    public DbSet<PrescriptionItem> PrescriptionItems { get; set; }
    public DbSet<ImportTicket> ImportTickets { get; set; }
    public DbSet<ImportTicketItem> ImportTicketItems { get; set; }
    public DbSet<ExportTicket> ExportTickets { get; set; }
    public DbSet<ExportTicketItem> ExportTicketItems { get; set; }
    public DbSet<Distributor> Distributors { get; set; }
    public DbSet<ReviewDoctor> ReviewDoctors { get; set; }
    public DbSet<ReviewHospital> ReviewHospitals { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        base.OnConfiguring(optionsBuilder);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Account>()
            .HasOne(a => a.Role)
            .WithMany(r => r.Accounts)
            .HasForeignKey(a => a.RoleUuid)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Account>()
            .HasOne(a => a.PatientProfile)
            .WithOne(p => p.Account)
            .HasForeignKey<PatientProfile>(p => p.AccountUuid)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Account>()
            .HasOne(a => a.DoctorProfile)
            .WithOne(d => d.Account)
            .HasForeignKey<DoctorProfile>(d => d.AccountUuid)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Account>()
            .HasMany(a => a.ImportTickets)
            .WithOne(it => it.Account)
            .HasForeignKey(it => it.AccountUuid)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Account>()
            .HasMany(a => a.ExportTickets)
            .WithOne(et => et.Account)
            .HasForeignKey(et => et.AccountUuid)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Role>()
            .HasMany(r => r.RolePermissions)
            .WithOne(rp => rp.Role)
            .HasForeignKey(rp => rp.RoleUuid)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Permission>()
            .HasMany(p => p.RolePermissions)
            .WithOne(rp => rp.Permission)
            .HasForeignKey(rp => rp.PermissionUuid)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<PatientProfile>()
            .HasMany(p => p.Appointments)
            .WithOne(a => a.Patient)
            .HasForeignKey(a => a.PatientUuid)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<PatientProfile>()
            .HasMany(p => p.Prescriptions)
            .WithOne(pr => pr.Patient)
            .HasForeignKey(pr => pr.PatientUuid)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<PatientProfile>()
            .HasMany(p => p.ReviewHospitals)
            .WithOne(rh => rh.Patient)
            .HasForeignKey(rh => rh.PatientUuid)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<PatientProfile>()
            .HasMany(p => p.ReviewDoctors)
            .WithOne(rd => rd.Patient)
            .HasForeignKey(rd => rd.PatientUuid)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<DoctorProfile>()
            .HasOne(d => d.Hospital)
            .WithMany(h => h.Doctors)
            .HasForeignKey(d => d.HospitalGuid)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<DoctorProfile>()
            .HasMany(d => d.DoctorDepartments)
            .WithOne(dd => dd.Doctor)
            .HasForeignKey(dd => dd.DoctorUuid)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<DoctorProfile>()
            .HasMany(d => d.DoctorSchedules)
            .WithOne(ds => ds.Doctor)
            .HasForeignKey(ds => ds.DoctorUuid)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<DoctorProfile>()
            .HasMany(d => d.Appointments)
            .WithOne(a => a.Doctor)
            .HasForeignKey(a => a.DoctorUuid)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<DoctorProfile>()
            .HasMany(d => d.Prescriptions)
            .WithOne(pr => pr.Doctor)
            .HasForeignKey(pr => pr.DoctorUuid)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<DoctorProfile>()
            .HasMany(d => d.ReviewDoctors)
            .WithOne(rd => rd.Doctor)
            .HasForeignKey(rd => rd.DoctorUuid)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Hospital>()
            .HasMany(h => h.HospitalDepartments)
            .WithOne(hd => hd.Hospital)
            .HasForeignKey(hd => hd.HospitalUuid)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Department>()
            .HasMany(d => d.HospitalDepartments)
            .WithOne(hd => hd.Department)
            .HasForeignKey(hd => hd.DepartmentUuid)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Department>()
            .HasMany(d => d.DoctorDepartments)
            .WithOne(dd => dd.Department)
            .HasForeignKey(dd => dd.DepartmentUuid)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<TimeSlot>()
            .HasMany(ts => ts.DoctorSchedules)
            .WithOne(ds => ds.TimeSlot)
            .HasForeignKey(ds => ds.TimeSlotUuid)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Medicine>()
            .HasMany(m => m.PrescriptionItems)
            .WithOne(pi => pi.Medicine)
            .HasForeignKey(pi => pi.MedicineUuid)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Prescription>()
            .HasMany(p => p.PrescriptionItems)
            .WithOne(pi => pi.Prescription)
            .HasForeignKey(pi => pi.PrescriptionUuid)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<ImportTicket>()
            .HasMany(it => it.ImportTicketItems)
            .WithOne(iti => iti.ImportTicket)
            .HasForeignKey(iti => iti.ImportTicketUuid)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Medicine>()
            .HasMany(m => m.ImportTicketItems)
            .WithOne(iti => iti.Medicine)
            .HasForeignKey(iti => iti.MedicineUuid)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Distributor>()
            .HasMany(d => d.ImportTicketItems)
            .WithOne(iti => iti.Distributor)
            .HasForeignKey(iti => iti.DistributorUuid)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<ExportTicket>()
            .HasMany(et => et.ExportTicketItems)
            .WithOne(eti => eti.ExportTicket)
            .HasForeignKey(eti => eti.ExportTicketUuid)
            .OnDelete(DeleteBehavior.Cascade);

        // Medicine -> ExportTicketItem
        modelBuilder.Entity<Medicine>()
            .HasMany(m => m.ExportTicketItems)
            .WithOne(eti => eti.Medicine)
            .HasForeignKey(eti => eti.MedicineUuid)
            .OnDelete(DeleteBehavior.Restrict);
    }
}