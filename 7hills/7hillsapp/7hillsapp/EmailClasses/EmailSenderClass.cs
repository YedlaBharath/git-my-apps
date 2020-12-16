using MailKit.Net.Smtp;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _7hillsapp.EmailClasses
{
    public class EmailSenderClass:IEmailSenderInterface
    {
        private readonly EmailConfig _emailConfig;
        public EmailSenderClass(EmailConfig emailConfig)
        {
            _emailConfig = emailConfig;
        }
        public async Task SendEmailAsync(EmailMessage emailMessage)
        {
            var message = CreateEmailMessage(emailMessage);
            await SendAsync(message);
        }
        public MimeMessage CreateEmailMessage(EmailMessage emailMessage)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_emailConfig.From));
            message.To.Add(emailMessage.To);
            message.Subject = emailMessage.Subject;
            message.Body = new TextPart(MimeKit.Text.TextFormat.Html) { Text = string.Format("<h3 style='font-size:1.3rem,font-weight:400'>{0}</h3>", emailMessage.Content) };
            return message;
        }
        public async Task SendAsync(MimeMessage mimeMessage)
        {
            using (var client = new SmtpClient())
            {
                try
                {
                    await client.ConnectAsync(_emailConfig.SmtpServer, _emailConfig.Port, true);
                    client.AuthenticationMechanisms.Remove("XOAUTH2");
                    await client.AuthenticateAsync(_emailConfig.Name, _emailConfig.Pass);

                    await client.SendAsync(mimeMessage);
                }
                catch
                {
                    throw;
                }
                finally
                {
                    await client.DisconnectAsync(true);
                    client.Dispose();
                }
            }
        }
    }
}
