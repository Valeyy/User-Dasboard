using System.Security.Claims;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Dtos;
using WebApi.Services;

namespace WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly TokenService _tokenService;

    public AccountController(
        UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager, 
        RoleManager<IdentityRole> roleManager,
        TokenService tokenService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _roleManager = roleManager;
        _tokenService = tokenService;
    }

    [AllowAnonymous]
    [HttpPost("register")]
    public async Task<ActionResult<ApiUserDto>> Register(RegisterDto registerDto)
    {
        if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
        {
            ModelState.AddModelError("email", "Email is already taken");
            return ValidationProblem(ModelState);
        }

        var user = new AppUser
        {
            Email = registerDto.Email,
            UserName = registerDto.Email
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (result.Succeeded)
            return await CreateUserObject(user);

        return BadRequest("Problem registering the user");
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<ActionResult<ApiUserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);

        if (user == null) return Unauthorized();

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (result.Succeeded)
            return await CreateUserObject(user);

        return Unauthorized();
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<ApiUserDto>> GetCurrentUser()
    {
        var user = await _userManager.Users
            .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

        return await CreateUserObject(user);
    }

    private async Task<ApiUserDto> CreateUserObject(AppUser user)
    {
        return new ApiUserDto
        {
            Email = user.Email,
            Token = await _tokenService.CreateToken(user),
            Roles = await _userManager.GetRolesAsync(user),
            SignedUp = user.SignedUp
        };
    }
}