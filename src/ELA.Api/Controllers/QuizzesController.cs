namespace ELA.Api.Controllers;

using ELA.Application.Quizzes.Commands.SubmitQuiz;
using ELA.Application.Quizzes.Queries.GetQuizHistory;
using ELA.Application.Quizzes.Queries.GetQuizzes;
using ELA.Application.Quizzes.Queries.GetQuiz;
using ELA.Application.Quizzes.Commands.CreateQuiz;
using ELA.Application.Quizzes.Commands.UpdateQuiz;
using ELA.Application.Quizzes.Commands.DeleteQuiz;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
public class QuizzesController : BaseController
{
    [HttpGet]
    public async Task<ActionResult<List<QuizDto>>> Get()
    {
        return await Mediator.Send(new GetQuizzesQuery());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<QuizDetailDto>> Get(Guid id)
    {
        var result = await Mediator.Send(new GetQuizQuery(id));

        if (result == null) return NotFound();

        return result;
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> Create([FromBody] CreateQuizCommand command)
    {
        return await Mediator.Send(command);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> Update(Guid id, [FromBody] UpdateQuizCommand command)
    {
        if (id != command.Id) return BadRequest();

        await Mediator.Send(command);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete(Guid id)
    {
        await Mediator.Send(new DeleteQuizCommand(id));

        return NoContent();
    }

    [HttpPost("{id}/submit")]
    public async Task<ActionResult<Guid>> Submit(string id, [FromBody] SubmitQuizCommand command)
    {
        // NOTE: Frontend sends string ID, command expects Guid string or Guid. 
        // SubmitQuizCommand has QuizId as string.
        if (id != command.QuizId) return BadRequest();

        return await Mediator.Send(command);
    }

    [HttpGet("history")]
    public async Task<ActionResult<List<QuizHistoryDto>>> GetHistory()
    {
        return await Mediator.Send(new GetQuizHistoryQuery());
    }
}
