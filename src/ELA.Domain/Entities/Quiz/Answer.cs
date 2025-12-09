namespace ELA;

public class Answer : BaseAuditableEntity
{
    public string Text { get; private set; }
    public bool IsCorrect { get; private set; }

    public Guid QuestionId { get; private set; }
    public Question Question { get; private set; } = null!;

    public Answer(string text, bool isCorrect, Guid questionId)
    {
        Text = text;
        IsCorrect = isCorrect;
        QuestionId = questionId;
    }

    public void Update(string text, bool isCorrect)
    {
        Text = text;
        IsCorrect = isCorrect;
    }
}