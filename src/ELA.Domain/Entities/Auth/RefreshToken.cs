namespace ELA;

public class RefreshToken : BaseAuditableEntity<Guid>
{
    public string UserId { get; set; } = null!;
    public string Token { get; set; } = null!;
    public DateTimeOffset ExpiresAt { get; set; }
    public bool IsRevoked { get; set; }
}
