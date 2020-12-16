using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _7hillsapp.EmailClasses
{
    public interface IEmailSenderInterface
    {
        Task SendEmailAsync(EmailMessage emailMessage);
    }
}
