namespace ELA.Application.Quizzes.Queries.GetQuizzes;

public record GetQuizzesQuery : IRequest<List<QuizDto>>;

public class GetQuizzesQueryHandler : IRequestHandler<GetQuizzesQuery, List<QuizDto>>
{
    private readonly IApplicationDbContext _context;

    public GetQuizzesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<QuizDto>> Handle(GetQuizzesQuery request, CancellationToken cancellationToken)
    {
        return await _context.Quizzes
            .AsNoTracking()
            .Select(q => new QuizDto
            {
                Id = q.Id,
                Name = q.Name,
                Description = q.Description,
                QuestionCount = q.Questions.Count
            })
            .ToListAsync(cancellationToken);
    }
}
