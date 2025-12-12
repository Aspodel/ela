namespace ELA;

public class RemoveCardCommandValidator : AbstractValidator<RemoveCardCommand>
{
    public RemoveCardCommandValidator()
    {
        RuleFor(c => c.DeckId)
            .NotEmpty().WithMessage("Deck Id is required.");

        RuleFor(c => c.CardId)
            .NotEmpty().WithMessage("Card Id is required.");
    }
}