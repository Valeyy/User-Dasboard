using Application.Core.Common;
using Application.Features.User.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Features.User.Queries;

public class ListAllUsersQuery 
{
    public class Query : IRequest<Result<List<UserDto>>> { }

    public class Handler : IRequestHandler<Query, Result<List<UserDto>>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        public async Task<Result<List<UserDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var users = await _context.Users
                .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);
            
            return Result<List<UserDto>>.Success(users);
        }
    }
}