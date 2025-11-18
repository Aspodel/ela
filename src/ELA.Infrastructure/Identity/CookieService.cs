using Microsoft.AspNetCore.Http;

namespace ELA;

public class CookieService : ICookieService
{
    private readonly IHttpContextAccessor _context;

    public CookieService(IHttpContextAccessor context) => _context = context;

    public void SetRefreshTokenCookie(string token)
    {
        _context.HttpContext!.Response.Cookies.Append("refreshToken", token, new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTime.UtcNow.AddDays(7),
            Path = "/api/auth/refresh"
        });
    }

    public string? GetRefreshTokenCookie()
    {
        return _context.HttpContext!.Request.Cookies["refreshToken"];
    }

    public void ClearRefreshTokenCookie()
    {
        _context.HttpContext!.Response.Cookies.Delete("refreshToken");
    }
}
