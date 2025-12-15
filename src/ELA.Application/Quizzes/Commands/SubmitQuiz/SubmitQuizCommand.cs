namespace ELA.Application.Quizzes.Commands.SubmitQuiz;

using System.Text.Json;
using ELA;

public record SubmitQuizCommand(string QuizId, int Score, int TotalQuestions, double TimeSpent, Dictionary<string, int> UserAnswers) : IRequest<Guid>;

public class SubmitQuizCommandHandler : IRequestHandler<SubmitQuizCommand, Guid>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public SubmitQuizCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<Guid> Handle(SubmitQuizCommand request, CancellationToken cancellationToken)
    {
        // Convert string QuizId to Guid? No, backend usually uses Guid. Frontend sends string.
        // If frontend sends Guid string, we can parse it.
        // Assuming request.QuizId is a valid Guid string.

        var submission = new QuizSubmission
        {
            QuizId = Guid.Parse(request.QuizId),
            Score = request.Score,
            TotalQuestions = request.TotalQuestions,
            TimeSpent = request.TimeSpent,
            Date = DateTimeOffset.UtcNow,
            UserAnswers = JsonSerializer.Serialize(request.UserAnswers),
            // UserId is handled by BaseAuditableEntity (CreatedBy) logic usually, 
            // but if we need it explicitly we could set it. 
            // For now, reliance on AuditableEntity is sufficient for history if we query by CreatedBy.
        };

        _context.QuizSubmissions.Add(submission);
        await _context.SaveChangesAsync(cancellationToken);

        return submission.Id;
    }
}
