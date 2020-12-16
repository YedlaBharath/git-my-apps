using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _7hillsapp.EmailClasses
{
    public class EmailConfig
    {
        public string From { get; set; }
        public string SmtpServer { get; set; }
        public int Port { get; set; }
        public string Name { get; set; }
        public string Pass { get; set; }
    }
}
