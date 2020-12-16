using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _7hillsapp.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace _7hillsapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DB7HillsInsertItemsController : ControllerBase
    {
        private readonly _7HillsDBContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public DB7HillsInsertItemsController(_7HillsDBContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            this._webHostEnvironment = webHostEnvironment;
        }

        // GET: api/DB7HillsInsertItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DB7HillsInsertItems>>> GetDB7HillsInsertItems()
        {
            return await _context.DB7HillsInsertItems
                .Select(x => new DB7HillsInsertItems()
                {
                    ItemId = x.ItemId,
                    ItemName = x.ItemName,
                    Price = x.Price,
                    ItemImage = x.ItemImage,
                    ImageSrc = string.Format("{0}://{1}{2}/Images/{3}", Request.Scheme, Request.Host, Request.PathBase, x.ItemImage)
                })
                    .ToListAsync();
        }

        // GET: api/DB7HillsInsertItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DB7HillsInsertItems>> GetDB7HillsInsertItems(int id)
        {
            var dB7HillsInsertItems = await _context.DB7HillsInsertItems.FindAsync(id);

            if (dB7HillsInsertItems == null)
            {
                return NotFound();
            }

            return dB7HillsInsertItems;
        }

        // PUT: api/DB7HillsInsertItems/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDB7HillsInsertItems(int id, [FromForm]DB7HillsInsertItems dB7HillsInsertItems)
        {
            if (id != dB7HillsInsertItems.ItemId)
            {
                return BadRequest();
            }
            try
            {
                if (dB7HillsInsertItems.ImageFile != null)
                {
                    DeleteItem(dB7HillsInsertItems.ItemImage);
                    dB7HillsInsertItems.ItemImage = await SaveItems(dB7HillsInsertItems.ImageFile);
                }
            }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
            }

            _context.Entry(dB7HillsInsertItems).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DB7HillsInsertItemsExists(id))
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

        // POST: api/DB7HillsInsertItems
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DB7HillsInsertItems>> PostDB7HillsInsertItems([FromForm]DB7HillsInsertItems dB7HillsInsertItems)
        {
            try { 
            dB7HillsInsertItems.ItemImage = await SaveItems(dB7HillsInsertItems.ImageFile);
            _context.DB7HillsInsertItems.Add(dB7HillsInsertItems);
            await _context.SaveChangesAsync();
        }
            catch (Exception ex)
            {
                Console.Write(ex.Message);
            }
            return StatusCode(201);

            //return CreatedAtAction("GetDB7HillsInsertItems", new { id = dB7HillsInsertItems.ItemId }, dB7HillsInsertItems);
        }

        // DELETE: api/DB7HillsInsertItems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DB7HillsInsertItems>> DeleteDB7HillsInsertItems(int id)
        {
            var dB7HillsInsertItems = await _context.DB7HillsInsertItems.FindAsync(id);
            if (dB7HillsInsertItems == null)
            {
                return NotFound();
            }
            DeleteItem(dB7HillsInsertItems.ItemImage);
            _context.DB7HillsInsertItems.Remove(dB7HillsInsertItems);
            await _context.SaveChangesAsync();

            return dB7HillsInsertItems;
        }

        private bool DB7HillsInsertItemsExists(int id)
        {
            return _context.DB7HillsInsertItems.Any(e => e.ItemId == id);
        }
        [NonAction]
        public async Task<string> SaveItems(IFormFile imageFile)
        {
            string itemImage = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            itemImage = itemImage + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath,"Images", itemImage);
            using(var fileStream  = new FileStream(imagePath,FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return itemImage;
        }
        [NonAction]
        public void DeleteItem(string itemImage)
        {
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images", itemImage);
            if(System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
