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
    public class AddCartItemsController : ControllerBase
    {
        private readonly _7HillsDBContext _context;

        public AddCartItemsController(_7HillsDBContext context)
        {
            _context = context;
        }

        // GET: api/AddCartItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AddCartItems>>> GetcartItems()
        {
            return await _context.cartItems.ToListAsync();
        }

        // GET: api/AddCartItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AddCartItems>> GetAddCartItems(int id)
        {
            var addCartItems = await _context.cartItems.FindAsync(id);

            if (addCartItems == null)
            {
                return NotFound();
            }

            return addCartItems;
        }

        // PUT: api/AddCartItems/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAddCartItems(int id, AddCartItems addCartItems)
        {
            if (id != addCartItems.Id)
            {
                return BadRequest();
            }

            _context.Entry(addCartItems).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AddCartItemsExists(id))
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

        // POST: api/AddCartItems
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<AddCartItems>> PostAddCartItems(AddCartItems addCartItems)
        {
            _context.cartItems.Add(addCartItems);
            await _context.SaveChangesAsync();

            return StatusCode(201);
            // return CreatedAtAction("GetAddCartItems", new { id = addCartItems.Id }, addCartItems);
        }

        // DELETE: api/AddCartItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<AddCartItems>> DeleteAddCartItems(int id)
        {
            var addCartItems = await _context.cartItems.FindAsync(id);
            if (addCartItems == null)
            {
                return NotFound();
            }

            _context.cartItems.Remove(addCartItems);
            await _context.SaveChangesAsync();

            return addCartItems;
        }

        private bool AddCartItemsExists(int id)
        {
            return _context.cartItems.Any(e => e.Id == id);
        }
    }
}
