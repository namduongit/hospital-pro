using api.Libs;
using api.Services.Role;
using api.Services.Permission;
using api.Services.Account;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddDbContext<DBConnection>(
    options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Allow the Next.js client to call the API during development
builder.Services.AddCors(options =>
{
    options.AddPolicy("ClientApp", policy =>
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod());
});

// Register Services
builder.Services.AddScoped<IRoleService, RoleService>();
builder.Services.AddScoped<IPermissionService, PermissionService>();
builder.Services.AddScoped<IAccountService, AccountService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors("ClientApp");
app.MapControllers();

app.Run();

