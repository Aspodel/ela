namespace ELA.Vocabularies.Dtos;

public record ExampleDto(
    Guid Id,
    string Text,
    string? Translation
);

public record CreateExampleDto(
    string Text,
    string? Translation
);

public record UpdateExampleDto(
    Guid? Id,
    string Text,
    string? Translation
);