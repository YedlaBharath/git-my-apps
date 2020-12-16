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
    public class NewUserSignUpController : ControllerBase
    {
        private readonly _7HillsDBContext _context;
        private readonly IEmailSenderInterface _emailSenderInterface;

        public NewUserSignUpController(_7HillsDBContext context, IEmailSenderInterface emailSenderInterface)
        {
            _context = context;
            _emailSenderInterface = emailSenderInterface;
        }

        // GET: api/NewUserSignUp
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NewUserSignUpModel>>> GetnewUserSignUps()
        {
            //try
            //{
            //    NewUserSignUpModel newUserSignUpModel = new NewUserSignUpModel();
            //    EmailMessage message = new EmailMessage();
            //    message.To = new MailboxAddress(newUserSignUpModel.Email);
            //    message.Subject = "Welcome";
            //    message.Content = "This is from our own email content";
            //    await _emailSenderInterface.SendEmailAsync(message);
            //}
            //catch
            //{
            //    throw;
            //}
            return await _context.newUserSignUps
                .Select(x => new NewUserSignUpModel()
                {
                    Id = x.Id,
                    UserName = x.UserName,
                    Email = x.Email,
                    Address = x.Address,
                    Mobile = x.Mobile
                })
                .ToListAsync();
        }

        // GET: api/NewUserSignUp/5
        [HttpGet("{id}")]
        public async Task<ActionResult<NewUserSignUpModel>> GetNewUserSignUpModel(int id)
        {
            var newUserSignUpModel = await _context.newUserSignUps.FindAsync(id);

            if (newUserSignUpModel == null)
            {
                return NotFound();
            }

            return newUserSignUpModel;
        }

        // PUT: api/NewUserSignUp/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutNewUserSignUpModel(int id, NewUserSignUpModel newUserSignUpModel)
        {
            if (id != newUserSignUpModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(newUserSignUpModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NewUserSignUpModelExists(id))
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

        // POST: api/NewUserSignUp
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<NewUserSignUpModel>> PostNewUserSignUpModel([FromForm]NewUserSignUpModel newUserSignUpModel)
        {
            try
            {
                //NewUserSignUpModel newUserSignUpModel = new NewUserSignUpModel();
                await Send(newUserSignUpModel);
                Console.WriteLine(newUserSignUpModel);
                _context.newUserSignUps.Add(newUserSignUpModel);
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return StatusCode(201);
            //return CreatedAtAction("GetNewUserSignUpModel", new { id = newUserSignUpModel.Id }, newUserSignUpModel);
        }

        // DELETE: api/NewUserSignUp/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<NewUserSignUpModel>> DeleteNewUserSignUpModel(int id)
        {
            var newUserSignUpModel = await _context.newUserSignUps.FindAsync(id);
            if (newUserSignUpModel == null)
            {
                return NotFound();
            }

            _context.newUserSignUps.Remove(newUserSignUpModel);
            await _context.SaveChangesAsync();

            return newUserSignUpModel;
        }

        private bool NewUserSignUpModelExists(int id)
        {
            return _context.newUserSignUps.Any(e => e.Id == id);
        }
        public async Task Send(NewUserSignUpModel newUserSignUpModel)
        {
            EmailMessage message = new EmailMessage();
            message.To = new MailboxAddress(newUserSignUpModel.Email);
            // Console.WriteLine(newUserSignUpModel.Email);
            message.Subject = "Booking Order Details";
            message.Content = string.Format("Dear {0}.\n " +
                "Firstly, Thank You for placing an order by using 7 Hills Application. \n" +
                "Your Booking Order Id is : {1}. \n" +
                "But Currently we are not taking any order and this application is under contruction may be you can meet us in Future.\n " +
                "If you find any problem with this application or if you any suggestions for us you are contact us by yedlabharathreddy143@gmail.com.\n" +
                "\n Thank You and Best Regards.\n Bharath" ,newUserSignUpModel.UserName, newUserSignUpModel.Id);
            await _emailSenderInterface.SendEmailAsync(message);
        }
    }
}
