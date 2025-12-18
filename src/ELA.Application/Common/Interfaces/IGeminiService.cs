namespace ELA;

public interface IGeminiService
{
    Task<string> GenerateContentAsync(string prompt, CancellationToken ct = default);
}
