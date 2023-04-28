using Application.Core.Common;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Features.Roles.Commands;

public class DeleteRoleCommand
{
    public class Command : IRequest<Result<Unit>>
    {
        public string Name { get; set; }
    }
    
    public class Handler : IRequestHandler<Command, Result<Unit>>
    {
        private readonly RoleManager<IdentityRole> _roleManager;

        public Handler(RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
        }
        
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var role = await _roleManager
                .FindByNameAsync(request.Name);

            if (role == null) return null;

            var result = await _roleManager
                .DeleteAsync(role);

            return result.Succeeded
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Something went wrong while deleting the role!");
        }
    }
}