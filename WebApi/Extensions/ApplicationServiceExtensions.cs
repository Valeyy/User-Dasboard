using Application.Core.Interfaces;
using Application.Core.Mapping;
using Application.Features.User.Queries;
using Infrastructure.Helpers;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace WebApi.Extensions;

public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServiceExtensions(
        this IServiceCollection services,
        IConfiguration config)
    {
        services.AddDbContext<DataContext>(options =>
        {
            options.UseSqlite(config.GetConnectionString("DefaultConnection"));
        });

        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy", policy =>
            {
                policy.AllowAnyMethod()
                    .AllowCredentials()
                    .AllowAnyHeader()
                    .WithOrigins("http://localhost:3000");
            });
        });
        
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(ListAllUsersQuery.Query).Assembly));
        services.AddAutoMapper(typeof(MappingProfiles).Assembly);
        services.AddScoped<IUserAccessor, UserAccessor>();
        
        return services;
    }
}