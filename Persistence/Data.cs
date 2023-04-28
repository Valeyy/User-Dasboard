using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence;

public class Data
{
    public static async Task Seed(
        UserManager<AppUser> userManager,
        RoleManager<IdentityRole> roleManager)
    {
        if (!userManager.Users.Any() && !roleManager.Roles.Any())
        {
            //Create Roles
            var roles = new List<IdentityRole>
            {
                new IdentityRole {Name = "User"},
                new IdentityRole {Name = "Admin"}
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }
            
            //Create Users
            var users = new List<AppUser>
            {
                new AppUser {Email = "admin@example.com", UserName = "admin"},
                new AppUser {Email = "valey2@example.com", UserName = "valey2"},
                new AppUser {Email = "valey3@example.com", UserName = "valey3"},
                new AppUser {Email = "valey4@example.com", UserName = "valey4"},
                new AppUser {Email = "valey5@example.com", UserName = "valey5"},
                new AppUser {Email = "valey6@example.com", UserName = "valey6"},
            };

            foreach (var user in users)
            {
                await userManager.CreateAsync(user, "Pa$$w0rd");

                await userManager.AddToRoleAsync(user, "User");
                
                //Create an admin user
                if (user.UserName == "admin")
                    await userManager.AddToRoleAsync(user, "Admin");
            }
        }
    }
}