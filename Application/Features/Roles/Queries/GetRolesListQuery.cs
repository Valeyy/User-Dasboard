using Application.Core.Common;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Features.Roles.Queries;

public class GetRolesListQuery
{
    public class Query : IRequest<Result<List<string>>> { }

    public class Handler : IRequestHandler<Query, Result<List<string>>>
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IMapper _mapper;

        public Handler(RoleManager<IdentityRole> roleManager, IMapper mapper)
        {
            _roleManager = roleManager;
            _mapper = mapper;
        }
        
        public async Task<Result<List<string>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var roles = await _roleManager.Roles
                .Select(x => x.Name)
                .ToListAsync(cancellationToken);
            
            return Result<List<string>>.Success(roles);
        }
    }
}