namespace ELA;

public class ActivateCardCommandValidator : AbstractValidator<ActivateCardCommand>
{
    public ActivateCardCommandValidator()
    {
        RuleFor(c => c.CardId)
            .NotEmpty().WithMessage("Id is required.");
    }
}