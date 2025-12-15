namespace ELA;

public class QuizSubmission : BaseAuditableEntity
{
    public Guid QuizId { get; set; }
    public int Score { get; set; }
    public int TotalQuestions { get; set; }
    public double TimeSpent { get; set; } // In seconds
    public DateTimeOffset Date { get; set; }
    public string UserAnswers { get; set; } = string.Empty; // JSON stored key-value pairs

    public Quiz Quiz { get; set; } = null!;
}
