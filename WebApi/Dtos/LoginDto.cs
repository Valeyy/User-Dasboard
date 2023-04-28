using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Dtos;

public class LoginDto
{
    [EmailAddress]
    [Required]
    public string Email { get; set; }
    
    [Required]
    [PasswordPropertyText]
    public string Password { get; set; }
}