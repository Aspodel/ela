namespace ELA;

public record CreateDeckCommand(string Name, string? Description) : IRequest<Guid>;

public class CreateDeckCommandHandler : IRequestHandler<CreateDeckCommand, Guid>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUser _currentUser;

    public CreateDeckCommandHandler(IApplicationDbContext context, ICurrentUser currentUser)
    {
        _context = context;
        _currentUser = currentUser;
    }

    public async Task<Guid> Handle(CreateDeckCommand request, CancellationToken cancellationToken)
    {
        Guard.Against.NullOrEmpty(_currentUser.Id, nameof(_currentUser.Id));

        var deck = new Deck(request.Name, _currentUser.Id, request.Description);

        _context.Decks.Add(deck);
        await _context.SaveChangesAsync(cancellationToken);

        return deck.Id;
    }
}