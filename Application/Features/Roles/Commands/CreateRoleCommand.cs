using Application.Core.Common;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Features.Roles.Commands;

public class CreateRoleCommand
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
            var result = await _roleManager
                .CreateAsync(new IdentityRole {Name = request.Name});

            return result.Succeeded
                ? Result<Unit>.Success(Unit.Value)
                : Result<Unit>.Failure("Something went wrong while creating the role!");
        }
    }
}