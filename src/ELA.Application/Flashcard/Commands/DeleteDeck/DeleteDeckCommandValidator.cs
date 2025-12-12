namespace ELA;

public class DeleteDeckCommandValidator : AbstractValidator<DeleteDeckCommand>
{
    public DeleteDeckCommandValidator()
    {
        RuleFor(d => d.Id)
            .NotEmpty().WithMessage("Id is required.");
    }
}