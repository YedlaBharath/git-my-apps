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
    public class AddToCartModelsController : ControllerBase
    {
        private readonly _7HillsDBContext _context;

        public AddToCartModelsController(_7HillsDBContext context)
        {
            _context = context;
        }

        // GET: api/AddToCartModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AddToCartModel>>> GetaddToCarts()
        {
            return await _context.addToCarts.ToListAsync();
        }

        // GET: api/AddToCartModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AddToCartModel>> GetAddToCartModel(int id)
        {
            var addToCartModel = await _context.addToCarts.FindAsync(id);

            if (addToCartModel == null)
            {
                return NotFound();
            }

            return addToCartModel;
        }

        // PUT: api/AddToCartModels/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAddToCartModel(int id, AddToCartModel addToCartModel)
        {
            if (id != addToCartModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(addToCartModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AddToCartModelExists(id))
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

        // POST: api/AddToCartModels
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<AddToCartModel>> PostAddToCartModel([FromForm]AddToCartModel addToCartModel)
        {
            _context.addToCarts.Add(addToCartModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAddToCartModel", new { id = addToCartModel.Id }, addToCartModel);
        }

        // DELETE: api/AddToCartModels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AddToCartModel>> DeleteAddToCartModel(int id)
        {
            var addToCartModel = await _context.addToCarts.FindAsync(id);
            if (addToCartModel == null)
            {
                return NotFound();
            }

            _context.addToCarts.Remove(addToCartModel);
            await _context.SaveChangesAsync();

            return addToCartModel;
        }

        private bool AddToCartModelExists(int id)
        {
            return _context.addToCarts.Any(e => e.Id == id);
        }
    }
}
