using System.Text.Json;
using ELA.Vocabularies.Dtos;

namespace ELA.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class AIController : ControllerBase
{
    private readonly IGeminiService _geminiService;

    public AIController(IGeminiService geminiService)
    {
        _geminiService = geminiService;
    }

    [HttpPost("generate")]
    public async Task<ActionResult<AIResponse>> GenerateContent([FromBody] AIRequest request, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(request.Prompt))
        {
            return BadRequest("Prompt is required.");
        }

        try
        {
            var result = await _geminiService.GenerateContentAsync(request.Prompt, ct);
            return Ok(new AIResponse(result));
        }
        catch (Exception ex)
        {
            // In a real-world app, you'd log this exception
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }

    [HttpGet("topics")]
    public async Task<ActionResult<List<string>>> GetSuggestedTopics(CancellationToken ct)
    {
        var prompt = "Suggest 10 interesting and diverse topics for English English learning vocabulary. Examples: 'Space Exploration', 'Ancient Rome', 'Sustainable Living'. Return ONLY a JSON array of strings.";

        try
        {
            var result = await _geminiService.GenerateContentAsync(prompt, ct);
            // Basic cleanup in case Gemini adds markdown blocks
            var json = result.Replace("```json", "").Replace("```", "").Trim();
            var topics = JsonSerializer.Deserialize<List<string>>(json);
            return Ok(topics);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }

    [HttpPost("vocabularies")]
    public async Task<ActionResult<List<CreateVocabularyCommand>>> GenerateVocabularies([FromBody] GenerateVocabulariesRequest request, CancellationToken ct)
    {
        if (string.IsNullOrWhiteSpace(request.Topic))
        {
            return BadRequest("Topic is required.");
        }

        var count = request.Count > 0 ? request.Count : 5;
        if (count > 20) count = 20;

        var prompt = $@"Generate {count} English vocabulary words related to the topic '{request.Topic}'.
For each word, provide:
1. The word text.
2. IPA pronunciation.
3. 1 definition including meaning, vietnamese translation, and part of speech (from: noun, verb, adjective, adverb, pronoun, preposition, conjunction, interjection).
4. 2 example sentences for the definition with vietnamese translation.

Return ONLY a JSON array matching this structure:
[
  {{
    ""text"": ""word"",
    ""ipa"": ""pronunciation"",
    ""definitions"": [
      {{
        ""meaning"": ""meaning in english"",
        ""translation"": ""meaning in vietnamese"",
        ""partOfSpeech"": ""noun"",
        ""examples"": [
          {{ ""text"": ""example 1"", ""translation"": ""translation 1"" }},
          {{ ""text"": ""example 2"", ""translation"": ""translation 2"" }}
        ]
      }}
    ]
  }}
]";

        try
        {
            var result = await _geminiService.GenerateContentAsync(prompt, ct);
            var json = result.Replace("```json", "").Replace("```", "").Trim();
            var vocabularies = JsonSerializer.Deserialize<List<CreateVocabularyCommand>>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });
            return Ok(vocabularies);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }
}

public record AIRequest(string Prompt);
public record AIResponse(string Content);
public record GenerateVocabulariesRequest(string Topic, int Count);
