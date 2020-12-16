using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _7hillsapp.Models;

namespace _7hillsapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SignUpUserController : ControllerBase
    {
        private readonly _7HillsDBContext _context;

        public SignUpUserController(_7HillsDBContext context)
        {
            _context = context;
        }

        // GET: api/SignUpUser
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SignUpUserModel>>> GetsignUpUsers()
        {
            return await _context.signUpUsers
                .Select(x => new SignUpUserModel()
                {
                    Id = x.Id,
                    UserName = x.UserName,
                    Email = x.Email,
                    Address = x.Address,
                    Mobile = x.Mobile
                }).ToListAsync();
        }

        // GET: api/SignUpUser/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SignUpUserModel>> GetSignUpUserModel(int id)
        {
            var signUpUserModel = await _context.signUpUsers.FindAsync(id);

            if (signUpUserModel == null)
            {
                return NotFound();
            }

            return signUpUserModel;
        }

        // PUT: api/SignUpUser/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSignUpUserModel(int id, SignUpUserModel signUpUserModel)
        {
            if (id != signUpUserModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(signUpUserModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SignUpUserModelExists(id))
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

        // POST: api/SignUpUser
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SignUpUserModel>> PostSignUpUserModel([FromForm]SignUpUserModel signUpUserModel)
        {
            try
            {
                _context.signUpUsers.Add(signUpUserModel);
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return StatusCode(201);
            //return CreatedAtAction("GetSignUpUserModel", new { id = signUpUserModel.Id }, signUpUserModel);
        }

        // DELETE: api/SignUpUser/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SignUpUserModel>> DeleteSignUpUserModel(int id)
        {
            var signUpUserModel = await _context.signUpUsers.FindAsync(id);
            if (signUpUserModel == null)
            {
                return NotFound();
            }

            _context.signUpUsers.Remove(signUpUserModel);
            await _context.SaveChangesAsync();

            return signUpUserModel;
        }

        private bool SignUpUserModelExists(int id)
        {
            return _context.signUpUsers.Any(e => e.Id == id);
        }
    }
}
