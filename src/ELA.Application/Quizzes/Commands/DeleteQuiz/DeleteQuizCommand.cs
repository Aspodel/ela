namespace ELA.Application.Quizzes.Commands.DeleteQuiz;

public record DeleteQuizCommand(Guid Id) : IRequest;

public class DeleteQuizCommandHandler : IRequestHandler<DeleteQuizCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteQuizCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(DeleteQuizCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Quizzes
            .FindAsync(new object[] { request.Id }, cancellationToken);

        if (entity == null)
        {
            // Throw NotFoundException (assuming it exists in standard template, otherwise just return or throw generic)
            // Checking standard Clean Architecture template usually has NotFoundException.
            throw new Exception($"Quiz with ID {request.Id} not found."); // Using generic for now to be safe or I'll check common exceptions later.
        }

        _context.Quizzes.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
