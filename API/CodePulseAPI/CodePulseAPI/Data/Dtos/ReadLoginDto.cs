namespace CodePulseAPI.Data.Dtos;

public class ReadLoginDto
{
    public string Username { get; set; }
    public string Token { get; set; }
    public List<string> Roles { get; set; }
}
