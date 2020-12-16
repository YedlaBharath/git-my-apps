using MimeKit;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace _7hillsapp.EmailClasses
{
    public class EmailMessage
    {
        [NotMapped]
        public MailboxAddress To { get; set; }
        [NotMapped]
        public string Subject { get; set; }
        [NotMapped]
        public string Content { get; set; }

        //public EmailMessage(IEnumerable<string> to ,string subject, string content)
        //{
        //    To = new List<MailboxAddress>();
        //    To.AddRange(to.Select(x => new MailboxAddress(x)));

        //    Subject = subject;
        //    Content = content;
        //}
    }
}
