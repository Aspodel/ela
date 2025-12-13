namespace ELA;

public class Answer : BaseAuditableEntity
{
    public string Text { get; private set; }
    public bool IsCorrect { get; private set; }

    public Answer(string text, bool isCorrect)
    {
        Text = text;
        IsCorrect = isCorrect;
    }

    public void Update(string text, bool isCorrect)
    {
        Text = text;
        IsCorrect = isCorrect;
    }
}