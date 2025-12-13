namespace ELA.Flashcard.Dtos;

public record CardDto(
    Guid Id,
    string Front,
    string Back,
    DateTimeOffset NextReview,
    bool Suspended,
    DateTimeOffset Created
);

public record AddCardDto(
    string Front,
    string Back
);