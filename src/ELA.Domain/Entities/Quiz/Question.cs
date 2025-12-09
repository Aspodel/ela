namespace ELA;

public class Question : BaseAuditableEntity
{
    public string Text { get; private set; }
    public string? Explanation { get; private set; }
    public QuestionType QuestionType { get; private set; }

    private readonly List<Answer> _answers = [];
    public IReadOnlyCollection<Answer> Answers => _answers.AsReadOnly();

    public Question(string text, QuestionType questionType)
    {
        Text = text;
        QuestionType = questionType;
    }

    public void UpdateText(string newText)
    {
        Text = newText;
    }

    public void UpdateExplanation(string newExplanation)
    {
        Explanation = newExplanation;
    }

    public void UpdateQuestionType(QuestionType newQuestionType)
    {
        QuestionType = newQuestionType;
    }

    public Answer AddAnswer(string text, bool isCorrect)
    {
        var answer = new Answer(text, isCorrect, Id);
        _answers.Add(answer);
        return answer;
    }

    public void RemoveAnswer(Guid answerId)
    {
        var index = _answers.FindIndex(a => a.Id == answerId);
        if (index < 0)
            throw new ArgumentException($"Answer with Id {answerId} not found.", nameof(answerId));
        _answers.RemoveAt(index);
    }

    public void UpdateAnswer(Guid answerId, string newText, bool newIsCorrect)
    {
        var answer = _answers.FirstOrDefault(a => a.Id == answerId)
            ?? throw new ArgumentException($"Answer with Id {answerId} not found.", nameof(answerId));
        answer.Update(newText, newIsCorrect);
    }
}

public enum QuestionType
{
    MultipleChoice,
    TrueFalse,
    FillInTheBlank,
    Listening,
}

public class ListeningQuestion : Question
{
    public string? AudioUrl { get; private set; }
    public string? Script { get; private set; }
    public ListeningQuestion(
        string text,
        string? audioUrl,
        string? script)
        : base(text, QuestionType.Listening)
    {
        AudioUrl = audioUrl;
        Script = script;
    }
}
