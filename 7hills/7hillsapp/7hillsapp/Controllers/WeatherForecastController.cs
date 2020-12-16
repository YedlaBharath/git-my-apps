using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmailServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.VisualStudio.Web.CodeGeneration.Contracts.Messaging;

namespace _7hillsapp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        private readonly IEmailSender _emailSender;

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger ,IEmailSender emailSender)
        {
            _logger = logger;
            _emailSender = emailSender;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            //var message = new EmailServices.Message(new string[] { "null" }, "Test Email", "This is the content from our email",null);
            //await _emailSender.SendEmailAsync(message);
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }
        //[HttpPost]
        //public async Task<IEnumerable<WeatherForecast>> Post()
        //{
        //    var files = Request.Form.Files.Any() ? Request.Form.Files : new FormFileCollection();
        //    var message = new EmailServices.Message(IEnumerable<string> to, string subject, string content, files);
        //    var message = new EmailServices.Message(new string[] { "null" }, "Test Email", "This is the content from our email", files);
        //    await _emailSender.SendEmailAsync(message);
        //    var rng = new Random();
        //    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
        //    {
        //        Date = DateTime.Now.AddDays(index),
        //        TemperatureC = rng.Next(-20, 55),
        //        Summary = Summaries[rng.Next(Summaries.Length)]
        //    })
        //    .ToArray();

        //}
    }
}
