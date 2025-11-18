namespace ELA;

public record LoginCommand(string UserName, string Password) : IRequest<string>;

public class LoginHandler : IRequestHandler<LoginCommand, string>
{
    private readonly IIdentityService _identityService;
    private readonly ITokenService _tokenService;
    private readonly ICookieService _cookies;

    public LoginHandler(IIdentityService identityService, ITokenService tokenService, ICookieService cookies)
    {
        _identityService = identityService;
        _tokenService = tokenService;
        _cookies = cookies;
    }

    public async Task<string> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await _identityService.ValidateUserAsync(request.UserName, request.Password);
        if (user == null)
            throw new UnauthorizedAccessException("Invalid credentials");

        var accessToken = _tokenService.GenerateAccessToken(user);
        var refreshToken = await _tokenService.GenerateRefreshToken(user.Id);

        _cookies.SetRefreshTokenCookie(refreshToken);

        return accessToken;
    }
}