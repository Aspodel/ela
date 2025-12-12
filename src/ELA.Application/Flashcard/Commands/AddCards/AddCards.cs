using ELA.Decks.Dtos;

namespace ELA;

public record AddCardsCommand(Guid DeckId, List<AddCardDto> Cards) : IRequest<List<Guid>>;

public class AddCardsCommandHandler : IRequestHandler<AddCardsCommand, List<Guid>>
{
    private readonly IApplicationDbContext _context;

    public AddCardsCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Guid>> Handle(AddCardsCommand request, CancellationToken cancellationToken)
    {
        var deck = await _context.Decks
            .Include(d => d.Cards)
            .FirstOrDefaultAsync(d => d.Id == request.DeckId, cancellationToken);

        Guard.Against.NotFound(request.DeckId, deck);
        
        var newCards = request.Cards.Select(c => (c.Front, c.Back));
        var addedCards = deck.AddCards(newCards);

        await _context.SaveChangesAsync(cancellationToken);

        return addedCards.Select(c => c.Id).ToList();
    }
}
