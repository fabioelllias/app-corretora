using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ClienteController : ControllerBase
{
    [HttpPost]
    public IActionResult Post([FromBody] Cliente cliente)
    {
        try
        {
            var emailService = new EmailService();
            emailService.EnviarEmail(cliente.Email, cliente.Cpf);

            return Ok(new { message = "E-mail de boas-vindas enviado com sucesso!" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao enviar e-mail: {ex.Message}");
        }
    }
}
