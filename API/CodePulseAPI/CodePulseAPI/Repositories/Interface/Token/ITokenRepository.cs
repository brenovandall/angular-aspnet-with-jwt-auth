using Microsoft.AspNetCore.Identity;

namespace CodePulseAPI.Repositories.Interface.Token;

public interface ITokenRepository
{
    string CreateToken(IdentityUser user, List<string> roles);
}
