using Microsoft.AspNetCore.Identity;

namespace Domain;

public class AppUser : IdentityUser
{
    public DateTime SignedUp { get; set; } = DateTime.UtcNow;
}