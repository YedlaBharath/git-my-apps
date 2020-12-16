using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _7hillsapp.Models;
using _7hillsapp.EmailClasses;
using MimeKit;

namespace _7hillsapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignUpUserNewController : ControllerBase
    {
        private readonly _7HillsDBContext _context;
        private readonly IEmailSenderInterface _emailSenderInterface;
        //private readonly EmailConfig _emailConfig;

        public SignUpUserNewController(_7HillsDBContext context,IEmailSenderInterface emailSenderInterface)
        {
            _context = context;
            _emailSenderInterface = emailSenderInterface;
        }

        // GET: api/SignUpUserNew
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SignUpUserNewModel>>> GetsignUpUserNew()
        {
            return await _context.signUpUserNew.ToListAsync();
        }

        // GET: api/SignUpUserNew/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SignUpUserNewModel>> GetSignUpUserNewModel(int id)
        {
            var signUpUserNewModel = await _context.signUpUserNew.FindAsync(id);

            if (signUpUserNewModel == null)
            {
                return NotFound();
            }

            return signUpUserNewModel;
        }

        // PUT: api/SignUpUserNew/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSignUpUserNewModel(int id, SignUpUserNewModel signUpUserNewModel)
        {
            if (id != signUpUserNewModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(signUpUserNewModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SignUpUserNewModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/SignUpUserNew
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SignUpUserNewModel>> PostSignUpUserNewModel([FromForm]SignUpUserNewModel signUpUserNewModel)
        {
            await Send(signUpUserNewModel);
            _context.signUpUserNew.Add(signUpUserNewModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSignUpUserNewModel", new { id = signUpUserNewModel.Id }, signUpUserNewModel);
        }

        // DELETE: api/SignUpUserNew/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SignUpUserNewModel>> DeleteSignUpUserNewModel(int id)
        {
            var signUpUserNewModel = await _context.signUpUserNew.FindAsync(id);
            if (signUpUserNewModel == null)
            {
                return NotFound();
            }

            _context.signUpUserNew.Remove(signUpUserNewModel);
            await _context.SaveChangesAsync();

            return signUpUserNewModel;
        }

        private bool SignUpUserNewModelExists(int id)
        {
            return _context.signUpUserNew.Any(e => e.Id == id);
        }
        public async Task Send(SignUpUserNewModel signUpUserNewModel)
        {
            EmailMessage message = new EmailMessage();
            message.To = new MailboxAddress(signUpUserNewModel.Email);
            Console.WriteLine(signUpUserNewModel.Email);
            message.Subject = "Booking Order Details";
            message.Content = string.Format("Dear {0}." + Environment.NewLine+
                "Firstly, Thank You for placing an order by using 7 Hills Application." + Environment.NewLine+
                "Your Booking Order Id is : {1}." + Environment.NewLine+
                "But Currently we are not taking any order and this application is under Construction may be you can meet us in Future. " + Environment.NewLine+
                "If you find any problem with this application or if you have any suggestions for us, you can contact us here yedlabharathreddy143@gmail.com." + Environment.NewLine+
                "\n Thank You and Best Regards."+ Environment.NewLine+" Bharath", signUpUserNewModel.Name, signUpUserNewModel.UserId);
            await _emailSenderInterface.SendEmailAsync(message);
        }
    }
}
