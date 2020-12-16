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
    public class SignupController : ControllerBase
    {
        private readonly _7HillsDBContext _context;

        public SignupController(_7HillsDBContext context)
        {
            _context = context;
        }

        // GET: api/Signup
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SignupModel>>> GetsignupModels()
        {
            return await _context.signupModels.ToListAsync();
        }

        // GET: api/Signup/5
        [HttpGet("{id}")]
        public async Task<ActionResult<SignupModel>> GetSignupModel(int id)
        {
            var signupModel = await _context.signupModels.FindAsync(id);

            if (signupModel == null)
            {
                return NotFound();
            }

            return signupModel;
        }

        // PUT: api/Signup/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSignupModel(int id, SignupModel signupModel)
        {
            if (id != signupModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(signupModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SignupModelExists(id))
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

        // POST: api/Signup
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<SignupModel>> PostSignupModel(SignupModel signupModel)
        {
            try
            {
                _context.signupModels.Add(signupModel);
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                Console.Write(ex.Message);
            }
            
            return CreatedAtAction("GetSignupModel", new { id = signupModel.Id }, signupModel);
        }

        // DELETE: api/Signup/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<SignupModel>> DeleteSignupModel(int id)
        {
            var signupModel = await _context.signupModels.FindAsync(id);
            if (signupModel == null)
            {
                return NotFound();
            }

            _context.signupModels.Remove(signupModel);
            await _context.SaveChangesAsync();

            return signupModel;
        }

        private bool SignupModelExists(int id)
        {
            return _context.signupModels.Any(e => e.Id == id);
        }
    }
}
