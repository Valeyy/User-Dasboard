using Application.Features.User.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApi.Controllers.Base;

namespace WebApi.Controllers;

public class UsersController : ApiControllerBase
{
    [HttpGet("list")]
    [AllowAnonymous]
    public async Task<IActionResult> GetUserList()
    {
        return HandleResult(await Mediator.Send(new ListAllUsersQuery.Query()));
    }
}