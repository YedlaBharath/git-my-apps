using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _7hillsapp.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace _7hillsapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DB7HillsItemsNewController : ControllerBase
    {
        private readonly _7HillsDBContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public DB7HillsItemsNewController(_7HillsDBContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            this._webHostEnvironment = webHostEnvironment;
        }

        // GET: api/DB7HillsItemsNew
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DB7HillsItemsNew>>> GetDB7HillsItemsNews()
        {
            return await _context.DB7HillsItemsNews.ToListAsync();
        }

        // GET: api/DB7HillsItemsNew/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DB7HillsItemsNew>> GetDB7HillsItemsNew(int id)
        {
            var dB7HillsItemsNew = await _context.DB7HillsItemsNews.FindAsync(id);

            if (dB7HillsItemsNew == null)
            {
                return NotFound();
            }

            return dB7HillsItemsNew;
        }

        // PUT: api/DB7HillsItemsNew/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDB7HillsItemsNew(int id, DB7HillsItemsNew dB7HillsItemsNew)
        {
            if (id != dB7HillsItemsNew.id)
            {
                return BadRequest();
            }

            _context.Entry(dB7HillsItemsNew).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DB7HillsItemsNewExists(id))
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

        // POST: api/DB7HillsItemsNew
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DB7HillsItemsNew>> PostDB7HillsItemsNew([FromForm]DB7HillsItemsNew dB7HillsItemsNew)
        {
            dB7HillsItemsNew.ItemImage = await SaveImage(dB7HillsItemsNew.ImageFile);
            _context.DB7HillsItemsNews.Add(dB7HillsItemsNew);
            await _context.SaveChangesAsync();
            return StatusCode(201);

           // return CreatedAtAction("GetDB7HillsItemsNew", new { id = dB7HillsItemsNew.id }, dB7HillsItemsNew);
        }

        // DELETE: api/DB7HillsItemsNew/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DB7HillsItemsNew>> DeleteDB7HillsItemsNew(int id)
        {
            var dB7HillsItemsNew = await _context.DB7HillsItemsNews.FindAsync(id);
            if (dB7HillsItemsNew == null)
            {
                return NotFound();
            }

            _context.DB7HillsItemsNews.Remove(dB7HillsItemsNew);
            await _context.SaveChangesAsync();

            return dB7HillsItemsNew;
        }

        private bool DB7HillsItemsNewExists(int id)
        {
            return _context.DB7HillsItemsNews.Any(e => e.id == id);
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile ImageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(ImageFile.FileName).Take(10).ToArray()).Replace("", "-");
            imageName = imageName + DateTime.Now.ToString("yymmssfff")+Path.GetExtension(ImageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath , "Images" , imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await ImageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
