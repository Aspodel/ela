namespace ELA;

public record LogoutCommand() : IRequest<Unit>;

public class LogoutHandler : IRequestHandler<LogoutCommand, Unit>
{
    private readonly ITokenService _tokenService;
    private readonly ICookieService _cookies;

    public LogoutHandler(ITokenService tokenService, ICookieService cookies)
    {
        _tokenService = tokenService;
        _cookies = cookies;
    }

    public async Task<Unit> Handle(LogoutCommand request, CancellationToken cancellationToken)
    {
        var refreshToken = _cookies.GetRefreshTokenCookie();
        if (!string.IsNullOrWhiteSpace(refreshToken))
        {
            var token = await _tokenService.GetRefreshTokenAsync(refreshToken);
            if (token != null)
            {
                await _tokenService.RevokeRefreshTokenAsync(token);
            }
        }

        _cookies.ClearRefreshTokenCookie();

        return Unit.Value;
    }
}