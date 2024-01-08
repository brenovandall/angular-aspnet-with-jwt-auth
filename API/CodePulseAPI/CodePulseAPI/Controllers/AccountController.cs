using CodePulseAPI.Data.Dtos;
using CodePulseAPI.Repositories.Interface.Token;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CodePulseAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AccountController : ControllerBase
{
    private UserManager<IdentityUser> _userManager;
    private ITokenRepository _tokenRepository;
    public AccountController(UserManager<IdentityUser> userManager, ITokenRepository tokenRepository)
    {
        _userManager = userManager;
        _tokenRepository = tokenRepository;
    }

    [HttpPost]
    [Route("register")]
    public async Task<IActionResult> Register([FromBody] RegisterDto dto)
    {
        var user = new IdentityUser { UserName = dto.UserName };

        var response = await _userManager.CreateAsync(user, dto.Password);

        if( response.Succeeded )
        {
            response = await _userManager.AddToRoleAsync(user, "reader");

            if( response.Succeeded )
            {
                return Ok();
            }

            else
            {
                if (response.Errors.Any())
                {
                    foreach (var err in response.Errors)
                    {
                        ModelState.AddModelError("", err.Description);
                    }
                }
            }
        }

        else
        {
            if(response.Errors.Any())
            {
                foreach(var err in response.Errors)
                {
                    ModelState.AddModelError("", err.Description);
                }
            }
        }

        return ValidationProblem(ModelState);
    }

    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await _userManager.FindByNameAsync(dto.Username);

        if( user != null)
        {
            var checking = await _userManager.CheckPasswordAsync(user, dto.Password);
            
            if (checking)
            {
                var roles = await _userManager.GetRolesAsync(user);

                var jwtToken = _tokenRepository.CreateToken(user, roles.ToList());

                var response = new ReadLoginDto()
                {
                    Username = user.UserName,
                    Roles = roles.ToList(),
                    Token = jwtToken
                };

                return Ok(response);
            }
        }

        ModelState.AddModelError("", "something wrong");

        return ValidationProblem(ModelState);
    }
}
