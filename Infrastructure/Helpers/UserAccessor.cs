using System.Security.Claims;
using Application.Core.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Helpers;

public class UserAccessor : IUserAccessor
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public UserAccessor(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }
    
    public string GettUserId()
    {
        return _httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
    }
}