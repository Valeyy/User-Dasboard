using Application.Features.User.Dtos;
using AutoMapper;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Application.Core.Mapping;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        string currentUsername = null;

        CreateMap<AppUser, UserDto>();
    }
}