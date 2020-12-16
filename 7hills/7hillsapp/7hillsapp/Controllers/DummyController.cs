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
    public class DummyController : ControllerBase
    {
        private readonly _7HillsDBContext _context;

        public DummyController(_7HillsDBContext context)
        {
            _context = context;
        }

        // GET: api/Dummy
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DummyClass>>> Getdummies()
        {
            return await _context.dummies.ToListAsync();
        }

        // GET: api/Dummy/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DummyClass>> GetDummyClass(int id)
        {
            var dummyClass = await _context.dummies.FindAsync(id);

            if (dummyClass == null)
            {
                return NotFound();
            }

            return dummyClass;
        }

        // PUT: api/Dummy/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDummyClass(int id, DummyClass dummyClass)
        {
            if (id != dummyClass.Id)
            {
                return BadRequest();
            }

            _context.Entry(dummyClass).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DummyClassExists(id))
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

        // POST: api/Dummy
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DummyClass>> PostDummyClass(DummyClass dummyClass)
        {
            _context.dummies.Add(dummyClass);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDummyClass", new { id = dummyClass.Id }, dummyClass);
        }

        // DELETE: api/Dummy/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DummyClass>> DeleteDummyClass(int id)
        {
            var dummyClass = await _context.dummies.FindAsync(id);
            if (dummyClass == null)
            {
                return NotFound();
            }

            _context.dummies.Remove(dummyClass);
            await _context.SaveChangesAsync();

            return dummyClass;
        }

        private bool DummyClassExists(int id)
        {
            return _context.dummies.Any(e => e.Id == id);
        }
    }
}
