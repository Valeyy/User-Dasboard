﻿using Application.Core.Common;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers.Base;

[ApiController]
[Route("api/[controller]")]
public class ApiControllerBase : ControllerBase
{
    private IMediator? _mediator;

    protected IMediator Mediator => _mediator ??= HttpContext.RequestServices
        .GetService<IMediator>();

    protected ActionResult HandleResult<T>(Result<T> result)
    {
        if (result == null) return NotFound();
        if (result.IsSuccess && result.Value != null)
            return Ok(result.Value);
        if (result.IsSuccess && result.Value == null)
            return NotFound();
        return BadRequest();
    }
    
    
}