namespace ELA.Vocabularies.Dtos;

public record DefinitionDto(
    Guid Id,
    string Meaning,
    string? Translation,
    string? PartOfSpeech,
    List<ExampleDto> Examples
);

public record CreateDefinitionDto(
    string Meaning,
    string? Translation,
    string? PartOfSpeech,
    List<CreateExampleDto>? Examples
);

public record UpdateDefinitionDto(
    Guid? Id,
    string Meaning,
    string? Translation,
    string? PartOfSpeech,
    List<UpdateExampleDto>? Examples
);