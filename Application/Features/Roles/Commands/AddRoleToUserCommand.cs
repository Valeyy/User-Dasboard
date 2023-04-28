using Application.Core.Common;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Features.Roles.Commands;

public class AddRoleToUserCommand
{
    public class Command : IRequest<Result<Unit>>
    {
        public string UserEmail { get; set; }
        public string Role { get; set; }
    }
    
    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<AppUser> _userManager;

        public Handler(RoleManager<IdentityRole> roleManager, UserManager<AppUser> userManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }
        
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _userManager
                .FindByEmailAsync(request.UserEmail);

            if (user == null) return null;

            var role = await _roleManager
                .FindByNameAsync(request.Role);

            if (role == null) return null;

            var result = await _userManager.AddToRoleAsync(user, request.Role);

            return result.Succeeded
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure(
                    $"Something went wrong while assigning the {request.Role} role to the user ${request.UserEmail}!");
        }
    }
}