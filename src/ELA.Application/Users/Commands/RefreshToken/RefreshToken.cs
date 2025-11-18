namespace ELA;

public record RefreshTokenCommand() : IRequest<string>;

public class RefreshTokenHandler : IRequestHandler<RefreshTokenCommand, string>
{
    private readonly ITokenService _tokenService;
    private readonly ICookieService _cookies;
    private readonly IIdentityService _identityService;

    public RefreshTokenHandler(ITokenService tokenService, ICookieService cookies, IIdentityService identityService)
    {
        _tokenService = tokenService;
        _cookies = cookies;
        _identityService = identityService;
    }

    public async Task<string> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var refreshToken = _cookies.GetRefreshTokenCookie();
        if (string.IsNullOrEmpty(refreshToken))
            throw new UnauthorizedAccessException("No refresh token provided");

        var storedToken = await _tokenService.GetRefreshTokenAsync(refreshToken);
        if (storedToken == null)
            throw new UnauthorizedAccessException("Invalid refresh token");

        var user = await _identityService.GetUserByIdAsync(storedToken.UserId);
        if (user == null)
            throw new UnauthorizedAccessException("User not found");
            
        var newAccessToken = _tokenService.GenerateAccessToken(user);
        var newRefreshToken = await _tokenService.GenerateRefreshToken(user.Id);

        await _tokenService.RevokeRefreshTokenAsync(storedToken);

        _cookies.SetRefreshTokenCookie(newRefreshToken);

        return newAccessToken;
    }
}   