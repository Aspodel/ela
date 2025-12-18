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
}

public record AIRequest(string Prompt);
public record AIResponse(string Content);
