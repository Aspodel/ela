namespace ELA;

public class SuspendCardCommandValidator : AbstractValidator<SuspendCardCommand>
{
    public SuspendCardCommandValidator()
    {
        RuleFor(c => c.CardId)
            .NotEmpty().WithMessage("Card Id is required.");
    }
}