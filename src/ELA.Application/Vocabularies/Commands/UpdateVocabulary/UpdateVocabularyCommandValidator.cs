using ELA.Vocabularies.Dtos;

namespace ELA;

public class UpdateVocabularyCommandValidator : AbstractValidator<UpdateVocabularyCommand>
{
    public UpdateVocabularyCommandValidator()
    {
        RuleFor(v => v.Id)
            .NotEqual(Guid.Empty).WithMessage("Vocabulary Id is required.");

        RuleFor(v => v.Text)
            .NotEmpty().WithMessage("Vocabulary is required.")
            .MaximumLength(200).WithMessage("Vocabulary must not exceed 200 characters.");

        RuleFor(v => v.IPA)
            .MaximumLength(200).WithMessage("IPA must not exceed 200 characters.");

        RuleForEach(v => v.Definitions)
            .SetValidator(new UpdateDefinitionInputValidator());
    }
}

public class UpdateDefinitionInputValidator : AbstractValidator<UpdateDefinitionDto>
{
    public UpdateDefinitionInputValidator()
    {
        RuleFor(d => d.Id)
            .Must(id => id == null || id != Guid.Empty)
            .WithMessage("Definition Id must be null or a valid Guid.");

        RuleFor(d => d.Meaning)
            .NotEmpty().WithMessage("Meaning is required.")
            .MaximumLength(500).WithMessage("Meaning must not exceed 500 characters.");

        RuleFor(d => d.Translation)
            .MaximumLength(500).WithMessage("Definition translation must not exceed 500 characters.");

        RuleFor(d => d.PartOfSpeech)
            .MaximumLength(50).WithMessage("Part of speech must not exceed 50 characters.");

        RuleFor(d => d.PartOfSpeech)
            .Must(pos => pos.IsValidPartOfSpeech())
            .WithMessage("Invalid part of speech.")
            .When(d => !string.IsNullOrWhiteSpace(d.PartOfSpeech));

        RuleForEach(d => d.Examples)
            .SetValidator(new UpdateExampleInputValidator());
    }
}

public class UpdateExampleInputValidator : AbstractValidator<UpdateExampleDto>
{
    public UpdateExampleInputValidator()
    {
        RuleFor(e => e.Id)
            .Must(id => id == null || id != Guid.Empty)
            .WithMessage("Example Id must be null or a valid Guid.");

        RuleFor(e => e.Text)
            .NotEmpty().WithMessage("Example is required.")
            .MaximumLength(500).WithMessage("Example must not exceed 500 characters.");

        RuleFor(e => e.Translation)
            .MaximumLength(500).WithMessage("Example translation must not exceed 500 characters.");
    }
}
