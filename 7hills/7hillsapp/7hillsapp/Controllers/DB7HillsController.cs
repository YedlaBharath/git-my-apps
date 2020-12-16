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
    public class DB7HillsController : ControllerBase
    {
        private readonly _7HillsDBContext _context;

        public DB7HillsController(_7HillsDBContext context)
        {
            _context = context;
        }

        // GET: api/DB7Hills
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DB7Hills>>> GetDB7Hills()
        {
            return await _context.DB7Hills.ToListAsync();
        }

        // GET: api/DB7Hills/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DB7Hills>> GetDB7Hills(int id)
        {
            var dB7Hills = await _context.DB7Hills.FindAsync(id);

            if (dB7Hills == null)
            {
                return NotFound();
            }

            return dB7Hills;
        }

        // PUT: api/DB7Hills/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDB7Hills(int id, DB7Hills dB7Hills)
        {
            dB7Hills.id = id;

            _context.Entry(dB7Hills).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DB7HillsExists(id))
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

        // POST: api/DB7Hills
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DB7Hills>> PostDB7Hills(DB7Hills dB7Hills)
        {
            _context.DB7Hills.Add(dB7Hills);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDB7Hills", new { id = dB7Hills.id }, dB7Hills);
        }

        // DELETE: api/DB7Hills/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DB7Hills>> DeleteDB7Hills(int id)
        {
            var dB7Hills = await _context.DB7Hills.FindAsync(id);
            if (dB7Hills == null)
            {
                return NotFound();
            }

            _context.DB7Hills.Remove(dB7Hills);
            await _context.SaveChangesAsync();

            return dB7Hills;
        }

        private bool DB7HillsExists(int id)
        {
            return _context.DB7Hills.Any(e => e.id == id);
        }
    }
}
