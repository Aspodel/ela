namespace ELA;

public interface IApplicationDbContext
{
    DbSet<Vocabulary> Vocabularies { get; }
    DbSet<Definition> Definitions { get; }
    DbSet<Example> Examples { get; }
    DbSet<Deck> Decks { get; }
    DbSet<Card> Cards { get; }
    DbSet<ReviewLog> ReviewLogs { get; }
    DbSet<RefreshToken> RefreshTokens { get; }
    DbSet<Quiz> Quizzes { get; }
    DbSet<Question> Questions { get; }
    DbSet<Answer> Answers { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
