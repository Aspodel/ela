namespace ELA.Api.Controllers;

using ELA.Application.Quizzes.Commands.SubmitQuiz;
using ELA.Application.Quizzes.Queries.GetQuizHistory;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
public class QuizzesController : BaseController
{
    [HttpPost("{id}/submit")]
    public async Task<ActionResult<Guid>> Submit(string id, [FromBody] SubmitQuizCommand command)
    {
        if (id != command.QuizId) return BadRequest();

        return await Mediator.Send(command);
    }

    [HttpGet("history")]
    public async Task<ActionResult<List<QuizHistoryDto>>> GetHistory()
    {
        return await Mediator.Send(new GetQuizHistoryQuery());
    }
}
