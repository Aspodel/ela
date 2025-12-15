namespace ELA.Application.Quizzes.Queries.GetQuizHistory;

using ELA;
using MediatR;
using Microsoft.EntityFrameworkCore;

public record GetQuizHistoryQuery : IRequest<List<QuizHistoryDto>>;

public class GetQuizHistoryQueryHandler : IRequestHandler<GetQuizHistoryQuery, List<QuizHistoryDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public GetQuizHistoryQueryHandler(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<List<QuizHistoryDto>> Handle(GetQuizHistoryQuery request, CancellationToken cancellationToken)
    {
        var userId = _currentUser.Id;
        if (userId == null) return new List<QuizHistoryDto>();

        var submissions = await _context.QuizSubmissions
            .Where(x => x.CreatedBy == userId)
            .OrderByDescending(x => x.Date)
            .ToListAsync(cancellationToken);

        return submissions.Select(s => new QuizHistoryDto
        {
            Id = s.Id,
            QuizId = s.QuizId,
            Score = s.Score,
            TotalQuestions = s.TotalQuestions,
            TimeSpent = s.TimeSpent,
            Date = s.Date,
            UserAnswers = string.IsNullOrEmpty(s.UserAnswers)
                ? null
                : System.Text.Json.JsonSerializer.Deserialize<Dictionary<string, int>>(s.UserAnswers, System.Text.Json.JsonSerializerOptions.Default)
        }).ToList();
    }
}
