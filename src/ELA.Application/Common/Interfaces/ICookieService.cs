namespace ELA;

public interface ICookieService
{
    void SetRefreshTokenCookie(string token);
    string? GetRefreshTokenCookie();
    void ClearRefreshTokenCookie();
}
