using System.Net;
using System.Net.Mail;

public class EmailService
{
    private readonly string smtpServer = "sandbox.smtp.mailtrap.io";
    private readonly int smtpPort = 2525;
    private readonly string smtpUser = "772df6582d621f";
    private readonly string smtpPass = "b9119a82dd9e01";

    public void EnviarEmail(string destino, string cpf)
    {
        var mail = new MailMessage();
        mail.From = new MailAddress("boasvindas@corretora.com");
        mail.To.Add(destino);
        mail.Subject = "Kit de Boas-vindas";
        mail.Body = $"Olá! Seu CPF {cpf} foi cadastrado. Baixe o app e use o código de primeiro acesso: 123456";

        using var smtp = new SmtpClient(smtpServer, smtpPort)
        {
            Credentials = new NetworkCredential(smtpUser, smtpPass),
            EnableSsl = true
        };

        smtp.Send(mail);
    }
}
