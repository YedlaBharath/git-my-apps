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
    public class UserSignupModelsController : ControllerBase
    {
        private readonly _7HillsDBContext _context;

        public UserSignupModelsController(_7HillsDBContext context)
        {
            _context = context;
        }

        // GET: api/UserSignupModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserSignupModel>>> GetuserSignupModels()
        {
            return await _context.userSignupModels
                .Select(x=> new UserSignupModel()
                {
                    Id = x.Id,
                    UserName = x.UserName,
                    Email = x.Email,
                    Address = x.Address,
                    Mobile = x.Mobile
                })
                .ToListAsync();
        }

        // GET: api/UserSignupModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserSignupModel>> GetUserSignupModel(int id)
        {
            var userSignupModel = await _context.userSignupModels.FindAsync(id);

            if (userSignupModel == null)
            {
                return NotFound();
            }

            return userSignupModel;
        }

        // PUT: api/UserSignupModels/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserSignupModel(int id, UserSignupModel userSignupModel)
        {
            if (id != userSignupModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(userSignupModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserSignupModelExists(id))
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

        // POST: api/UserSignupModels
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<UserSignupModel>> PostUserSignupModel(UserSignupModel userSignupModel)
        {
            _context.userSignupModels.Add(userSignupModel);
            await _context.SaveChangesAsync();

            return StatusCode(201);
            // return CreatedAtAction("GetUserSignupModel", new { id = userSignupModel.Id }, userSignupModel);
        }

        // DELETE: api/UserSignupModels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserSignupModel>> DeleteUserSignupModel(int id)
        {
            var userSignupModel = await _context.userSignupModels.FindAsync(id);
            if (userSignupModel == null)
            {
                return NotFound();
            }

            _context.userSignupModels.Remove(userSignupModel);
            await _context.SaveChangesAsync();

            return userSignupModel;
        }

        private bool UserSignupModelExists(int id)
        {
            return _context.userSignupModels.Any(e => e.Id == id);
        }
    }
}
