using Application.Features.Roles.Commands;
using Application.Features.Roles.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controllers.Base;

namespace WebApi.Controllers;

public class RolesController : ApiControllerBase
{
    [HttpGet("list")]
    [AllowAnonymous]
    public async Task<IActionResult> GetRolesList()
    {
        return HandleResult(await Mediator.Send(new GetRolesListQuery.Query()));
    }

    [HttpPost("add")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> AddRoleToUser(string email, string role)
    {
        return HandleResult(await Mediator.Send(new AddRoleToUserCommand.Command 
            { Role = role, UserEmail = email }));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost("remove")]
    public async Task<IActionResult> RemoveRoleFromUser(string email, string role)
    {
        return HandleResult(await Mediator.Send(new RemoveRoleFromUserCommand.Command
            {Role = role, UserEmail = email}));
    }
    
    //Add + delete roles
}