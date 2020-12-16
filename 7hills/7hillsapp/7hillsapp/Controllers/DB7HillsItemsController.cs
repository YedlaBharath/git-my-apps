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
    public class DB7HillsItemsController : ControllerBase
    {
        private readonly _7HillsDBContext _context;

        public DB7HillsItemsController(_7HillsDBContext context)
        {
            _context = context;
        }

        // GET: api/DB7HillsItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DB7HillsItems>>> GetDB7HillsItems()
        {
            return await _context.DB7HillsItems.ToListAsync();
        }

        // GET: api/DB7HillsItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DB7HillsItems>> GetDB7HillsItems(int id)
        {
            var dB7HillsItems = await _context.DB7HillsItems.FindAsync(id);

            if (dB7HillsItems == null)
            {
                return NotFound();
            }

            return dB7HillsItems;
        }

        // PUT: api/DB7HillsItems/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDB7HillsItems(int id, DB7HillsItems dB7HillsItems)
        {
            if (id != dB7HillsItems.id)
            {
                return BadRequest();
            }

            _context.Entry(dB7HillsItems).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DB7HillsItemsExists(id))
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

        // POST: api/DB7HillsItems
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DB7HillsItems>> PostDB7HillsItems(DB7HillsItems dB7HillsItems)
        {
            _context.DB7HillsItems.Add(dB7HillsItems);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDB7HillsItems", new { id = dB7HillsItems.id }, dB7HillsItems);
        }

        // DELETE: api/DB7HillsItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DB7HillsItems>> DeleteDB7HillsItems(int id)
        {
            var dB7HillsItems = await _context.DB7HillsItems.FindAsync(id);
            if (dB7HillsItems == null)
            {
                return NotFound();
            }

            _context.DB7HillsItems.Remove(dB7HillsItems);
            await _context.SaveChangesAsync();

            return dB7HillsItems;
        }

        private bool DB7HillsItemsExists(int id)
        {
            return _context.DB7HillsItems.Any(e => e.id == id);
        }
    }
}
