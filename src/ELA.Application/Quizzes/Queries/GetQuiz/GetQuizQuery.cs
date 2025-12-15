namespace ELA.Application.Quizzes.Queries.GetQuiz;

public record GetQuizQuery(Guid Id) : IRequest<QuizDetailDto?>;

public class GetQuizQueryHandler : IRequestHandler<GetQuizQuery, QuizDetailDto?>
{
    private readonly IApplicationDbContext _context;

    public GetQuizQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<QuizDetailDto?> Handle(GetQuizQuery request, CancellationToken cancellationToken)
    {
        return await _context.Quizzes
            .AsNoTracking()
            .Where(q => q.Id == request.Id)
            .Select(q => new QuizDetailDto
            {
                Id = q.Id,
                Name = q.Name,
                Description = q.Description,
                Questions = q.Questions.Select(qm => new QuestionDto
                {
                    Id = qm.Id,
                    Text = qm.Text,
                    Explanation = qm.Explanation,
                    Type = qm.QuestionType,
                    Answers = qm.Answers.Select(a => new AnswerDto
                    {
                        Id = a.Id,
                        Text = a.Text,
                        IsCorrect = a.IsCorrect
                    }).ToList()
                }).ToList()
            })
            .FirstOrDefaultAsync(cancellationToken);
    }
}
