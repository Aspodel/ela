using ELA;

namespace ELA.Application.Quizzes.Queries.GetQuiz;

public class QuizDetailDto
{
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty;
    public string? Description { get; init; }
    public List<QuestionDto> Questions { get; init; } = [];
}

public class QuestionDto
{
    public Guid Id { get; init; }
    public string Text { get; init; } = string.Empty;
    public string? Explanation { get; init; }
    public QuestionType Type { get; init; }
    public List<AnswerDto> Answers { get; init; } = [];
}

public class AnswerDto
{
    public Guid Id { get; init; }
    public string Text { get; init; } = string.Empty;
    public bool IsCorrect { get; init; }
}
