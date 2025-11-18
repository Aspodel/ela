namespace ELA;

public interface ITokenService
{
    string GenerateAccessToken(UserDto user);
    Task<string> GenerateRefreshToken(string userId);
    Task<RefreshToken?> GetRefreshTokenAsync(string token);
    Task RevokeRefreshTokenAsync(RefreshToken token);
}
