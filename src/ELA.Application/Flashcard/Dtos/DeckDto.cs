namespace ELA.Decks.Dtos;

public record DeckDto(
    Guid Id,
    string Name,
    string? Description,
    DateTimeOffset Created,
    List<CardDto> Cards
);

public record DeckListItemDto(
    Guid Id,
    string Name,
    string? Description,
    DateTimeOffset Created,
    int CardCount,
    int DueCardsCount = 0
);