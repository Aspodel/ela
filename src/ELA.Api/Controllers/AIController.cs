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
    [HttpPost("mock-test")]
    public async Task<ActionResult<object>> GenerateMockTestQuestions([FromBody] MockTestRequest request, CancellationToken ct)
    {
        var prompt = GetPromptForQuestionType(request.Type, request.Count);

        try
        {
            var result = await _geminiService.GenerateContentAsync(prompt, ct);
            var json = result.Replace("```json", "").Replace("```", "").Trim();

            // We return the raw object so the frontend can handle the specific type
            var questions = JsonSerializer.Deserialize<JsonElement>(json);
            return Ok(questions);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred during mock test generation: {ex.Message}");
        }
    }

    private string GetPromptForQuestionType(string type, int count)
    {
        count = count > 0 ? count : 2;
        if (count > 10) count = 10;

        return type.ToLower() switch
        {
            "listening" => $@"Generate {count} English listening questions.
Each question should have:
1. id (string, e.g., 'L1')
2. type ('listening')
3. instruction (e.g., 'Listen to the audio and choose the best description of the picture.')
4. audioUrl (a placeholder string like 'https://example.com/audio.mp3' since we don't have real audio)
5. imageUrl (optional, use a placeholder from Unsplash or null)
6. options (array of 4 strings)
7. correctAnswer (index 0-3)

Return ONLY a JSON array.",

            "reading" => $@"Generate {count} English reading questions.
Each question should have:
1. id (string, e.g., 'R1')
2. type ('reading')
3. instruction (e.g., 'Read the passage and answer the question.')
4. passage (a short English text)
5. questionText (the question about the passage)
6. options (array of 4 strings)
7. correctAnswer (index 0-3)

Return ONLY a JSON array.",

            "speaking" => $@"Generate {count} English speaking questions.
Each question should have:
1. id (string, e.g., 'S1')
2. type ('speaking')
3. instruction (e.g., 'Read the text aloud.' or 'Describe the picture.')
4. prompt (the text to read or the prompt for description)
5. imageUrl (optional, for 'Describe the picture' tasks)
6. preparationTimeSeconds (integer, e.g., 45)
7. responseTimeSeconds (integer, e.g., 45)

Return ONLY a JSON array.",

            "writing" => $@"Generate {count} English writing questions.
Each question should have:
1. id (string, e.g., 'W1')
2. type ('writing')
3. instruction (e.g., 'Write a sentence based on the picture.')
4. prompt (the topic or specific instruction)
5. imageUrl (optional, for 'Write based on picture' tasks)
6. minWords (optional integer)
7. timeLimitSeconds (integer, e.g., 300)

Return ONLY a JSON array.",

            _ => throw new ArgumentException("Invalid question type")
        };
    }
}

public record AIRequest(string Prompt);
public record AIResponse(string Content);
public record GenerateVocabulariesRequest(string Topic, int Count);
public record MockTestRequest(string Type, int Count);
