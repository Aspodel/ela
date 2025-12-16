using Microsoft.AspNetCore.Identity;

namespace ELA;

public class DeckSeeder : IDataSeeder
{
    private readonly UserManager<ApplicationUser> _userManager;

    public DeckSeeder(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task SeedAsync(ApplicationDbContext context)
    {
        if (await context.Decks.AnyAsync())
        {
            return;
        }

        var user = await _userManager.FindByNameAsync("user");
        if (user == null) return;

        var deck = new Deck("English Basics", user.Id, "Basic English vocabulary and phrases");
        var card1 = deck.AddCard("Hello", "Xin chào");
        var card2 = deck.AddCard("Goodbye", "Tạm biệt");

        card1.AddReviewResult(5, DateTimeOffset.UtcNow, 1, 2.6, 1, DateTimeOffset.UtcNow.AddDays(1));
        card2.AddReviewResult(4, DateTimeOffset.UtcNow, 1, 2.5, 1, DateTimeOffset.UtcNow.AddDays(1));

        context.Decks.Add(deck);
        await context.SaveChangesAsync();
    }
}