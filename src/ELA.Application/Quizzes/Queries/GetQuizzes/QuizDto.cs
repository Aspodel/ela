namespace ELA;

public class QuizDto
{
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string? Description { get; init; }
    public int QuestionCount { get; init; }
}
