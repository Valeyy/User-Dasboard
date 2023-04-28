namespace WebApi.Dtos;

public class ApiUserDto
{
    public string Email { get; set; }
    public string Token { get; set; }
    public IEnumerable<string> Roles { get; set; }
    public DateTime SignedUp { get; set; }
}