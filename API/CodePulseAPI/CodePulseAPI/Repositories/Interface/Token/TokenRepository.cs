using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace CodePulseAPI.Repositories.Interface.Token;

public class TokenRepository : ITokenRepository
{
    private IConfiguration _configuration;
    public TokenRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    public string CreateToken(IdentityUser user, List<string> roles)
    {
        var claims = new List<Claim>()
        {
            new Claim(ClaimTypes.Name, user.NormalizedUserName)
        };

        claims.AddRange(roles.Select(x => new Claim(ClaimTypes.Role, x)));


        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials
            );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
