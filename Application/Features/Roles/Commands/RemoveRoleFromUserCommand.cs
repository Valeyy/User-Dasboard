using Application.Core.Common;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Features.Roles.Commands;

public class RemoveRoleFromUserCommand
{
    public class Command : IRequest<Result<Unit>>
    {
        public string UserEmail { get; set; }
        public string Role { get; set; }
    }
    
    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public Handler(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }
        
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _userManager
                .FindByEmailAsync(request.UserEmail);

            if (user == null) return null;

            var role = await _roleManager
                .FindByNameAsync(request.Role);

            if (role == null) return null;

            var result = await _userManager.RemoveFromRoleAsync(user, request.Role);

            return result.Succeeded
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure(
                    $"Something went wrong while removing the ${request.Role} role from the user ${request.UserEmail}");
        }
    }
}