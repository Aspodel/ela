public class QuizHistoryDto
{
    public Guid Id { get; set; }
    public Guid QuizId { get; set; }
    public int Score { get; set; }
    public int TotalQuestions { get; set; }
    public double TimeSpent { get; set; }
    public DateTimeOffset Date { get; set; }
    public Dictionary<string, int>? UserAnswers { get; set; }
}
