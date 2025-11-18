using Microsoft.AspNetCore.Authorization;

namespace ELA;

[AllowAnonymous]
public class AuthController : BaseController
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterCommand command)
    {
        var token = await Mediator.Send(command);
        return Ok(new { AccessToken = token });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginCommand command)
    {
        var token = await Mediator.Send(command);
        return Ok(new { AccessToken = token });
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        var token = await Mediator.Send(new RefreshTokenCommand());
        return Ok(new { AccessToken = token });
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await Mediator.Send(new LogoutCommand());
        return NoContent();
    }
}
