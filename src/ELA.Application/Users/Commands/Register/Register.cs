namespace ELA;

public record RegisterCommand(
    string UserName,
    string Password,
    string? Email,
    string? FirstName,
    string? LastName,
    DateOnly? DateOfBirth
) : IRequest<string>;

public class RegisterHandler : IRequestHandler<RegisterCommand, string>
{
    private readonly IIdentityService _identityService;
    private readonly ITokenService _tokenService;
    private readonly ICookieService _cookies;

    public RegisterHandler(IIdentityService identityService, ITokenService tokenService, ICookieService cookies)
    {
        _identityService = identityService;
        _tokenService = tokenService;
        _cookies = cookies;
    }

    public async Task<string> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var (result, userId) = await _identityService.CreateUserAsync(request.UserName, request.Password, request.Email, request.FirstName, request.LastName, request.DateOfBirth);
        result.ThrowIfFailed(nameof(RegisterCommand));
        
        var user = await _identityService.GetUserByIdAsync(userId);
        if (user == null)
            throw new Exception("User not found after registration");

        var accessToken = _tokenService.GenerateAccessToken(user);
        var refreshToken = await _tokenService.GenerateRefreshToken(user.Id);

        _cookies.SetRefreshTokenCookie(refreshToken);

        return accessToken;
    }
}
