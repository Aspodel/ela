namespace ELA.Application.Quizzes.Commands.UpdateQuiz;

public record UpdateQuizCommand(Guid Id, string Name, string? Description) : IRequest;

public class UpdateQuizCommandHandler : IRequestHandler<UpdateQuizCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateQuizCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(UpdateQuizCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Quizzes
            .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            throw new Exception($"Quiz with ID {request.Id} not found.");
        }

        entity.UpdateText(request.Name);
        entity.UpdateDescription(request.Description ?? string.Empty);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
