namespace ELA;

public class Quiz : BaseAuditableEntity
{
    public string Name { get; private set; }
    public string? Description { get; private set; }
    
    private readonly List<Question> _questions = [];
    public IReadOnlyCollection<Question> Questions => _questions.AsReadOnly();

    public Quiz(string name, string? description)
    {
        Name = name;
        Description = description;
    }

    public Question AddQuestion(string text, QuestionType questionType = QuestionType.MultipleChoice, string? explanation = null)
    {
        var question = new Question(text, questionType, explanation);
        _questions.Add(question);
        return question;
    }

    public void RemoveQuestion(Guid questionId)
    {
        var index = _questions.FindIndex(q => q.Id == questionId);
        if (index < 0)
            throw new ArgumentException($"Question with Id {questionId} not found.", nameof(questionId));
        _questions.RemoveAt(index);
    }

    public void UpdateQuestion(Guid questionId, string newText, string newExplanation)
    {
        var question = _questions.FirstOrDefault(q => q.Id == questionId)
            ?? throw new ArgumentException($"Question with Id {questionId} not found.", nameof(questionId));
        question.UpdateText(newText);
        question.UpdateExplanation(newExplanation);
    }

    public void UpdateText(string newText)
    {
        Name = newText;
    }

    public void UpdateDescription(string newDescription)
    {
        Description = newDescription;
    }
}