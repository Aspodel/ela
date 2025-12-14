using ELA;
using ELA.Infrastructure.Persistence.Seed;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ELA.Infrastructure.Persistence.Seed;

public class VocabularySeeder : ISeeder
{
    private readonly UserManager<ApplicationUser> _userManager;

    public VocabularySeeder(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task SeedAsync(ApplicationDbContext context)
    {
        if (await context.Vocabularies.AnyAsync())
        {
            return;
        }

        var user = await _userManager.FindByNameAsync("user");
        if (user == null) return;

        var vocab1 = new Vocabulary("apple", user.Id, "ˈæp.əl");
        vocab1.AddDefinition("a round fruit", "quả táo", PartOfSpeech.Noun)
              .AddExample("I ate an apple.", "Tôi đã ăn một quả táo.");

        var vocab2 = new Vocabulary("run", user.Id, "rʌn");
        vocab2.AddDefinition("to move quickly on foot", "chạy", PartOfSpeech.Verb)
              .AddExample("She runs every morning.", "Cô ấy chạy mỗi sáng.");

        var vocab3 = new Vocabulary("light", user.Id, "laɪt");
        vocab3.AddDefinition("the natural agent that makes things visible", "ánh sáng", PartOfSpeech.Noun)
              .AddExample("Light travels faster than sound.", "Ánh sáng di chuyển nhanh hơn âm thanh.");
        vocab3.AddDefinition("not heavy", "nhẹ", PartOfSpeech.Adjective)
              .AddExample("She wears light clothing in summer.", "Cô ấy mặc quần áo nhẹ vào mùa hè.");
        vocab3.AddDefinition("to set fire to something", "đốt, thắp", PartOfSpeech.Verb)
              .AddExample("They lit a fire in the fireplace.", "Họ nhóm lửa trong lò sưởi.");

        var vocab4 = new Vocabulary("bank", user.Id, "bæŋk");
        vocab4.AddDefinition("a financial institution", "ngân hàng", PartOfSpeech.Noun)
              .AddExample("I deposited money in the bank.", "Tôi gửi tiền vào ngân hàng.");
        vocab4.AddDefinition("the side of a river", "bờ sông", PartOfSpeech.Noun)
              .AddExample("They sat on the river bank.", "Họ ngồi trên bờ sông.");

        var vocab5 = new Vocabulary("play", user.Id, "pleɪ");
        vocab5.AddDefinition("to engage in a game or activity", "chơi", PartOfSpeech.Verb)
              .AddExample("The children are playing in the park.", "Bọn trẻ đang chơi trong công viên.");
        vocab5.AddDefinition("a theatrical performance", "vở kịch", PartOfSpeech.Noun)
              .AddExample("We watched a Shakespeare play.", "Chúng tôi xem một vở kịch của Shakespeare.");

        context.Vocabularies.AddRange(vocab1, vocab2, vocab3, vocab4, vocab5);
        await context.SaveChangesAsync();
    }
}
