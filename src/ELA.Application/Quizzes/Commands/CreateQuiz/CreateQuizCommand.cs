namespace ELA.Application.Quizzes.Commands.CreateQuiz;

public record CreateQuizCommand(string Name, string? Description) : IRequest<Guid>;

public class CreateQuizCommandHandler : IRequestHandler<CreateQuizCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreateQuizCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateQuizCommand request, CancellationToken cancellationToken)
    {
        var entity = new Quiz(request.Name, request.Description);

        _context.Quizzes.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
