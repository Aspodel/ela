namespace ELA;

public class AddCardCommandValidator : AbstractValidator<AddCardCommand>
{
    public AddCardCommandValidator()
    {
        RuleFor(c => c.DeckId)
            .NotEmpty().WithMessage("Id is required.");

        RuleFor(c => c.Front)
            .NotEmpty().WithMessage("Front card text is required.")
            .MaximumLength(250).WithMessage("Front card text must not exceed 250 characters.");

        RuleFor(c => c.Back)
            .NotEmpty().WithMessage("Back card text is required.")
            .MaximumLength(500).WithMessage("Back card text must not exceed 500 characters.");
    }
}