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
    public class VegCurriesController : ControllerBase
    {
        private readonly _7HillsDBContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public VegCurriesController(_7HillsDBContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            this._webHostEnvironment = webHostEnvironment;
        }

        // GET: api/VegCurries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VegCurries>>> GetvegCurries()
        {
            return await _context.vegCurries
                .Select(x => new VegCurries()
                {
                    Id = x.Id,
                    Name = x.Name,
                    price = x.price,
                    Image = x.Image,
                    Section = x.Section,
                    ImageSrc = string.Format("{0}://{1}{2}/Images/VegCurriesImages/{3}", Request.Scheme, Request.Host, Request.PathBase, x.Image)
                })
                .ToListAsync();
        }

        // GET: api/VegCurries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VegCurries>> GetVegCurries(int id)
        {
            var vegCurries = await _context.vegCurries.FindAsync(id);

            if (vegCurries == null)
            {
                return NotFound();
            }

            return vegCurries;
        }

        // PUT: api/VegCurries/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVegCurries(int id, [FromForm]VegCurries vegCurries)
        {
            if (id != vegCurries.Id)
            {
                return BadRequest();
            }
            try
            {
                if(vegCurries.ImageFile!=null)
                {
                    DeleteImage(vegCurries.Image);
                    vegCurries.Image = await SaveImage(vegCurries.ImageFile);
                }
            }
            catch(Exception ex)
            {
                Console.Write(ex.Message);
            }
            _context.Entry(vegCurries).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VegCurriesExists(id))
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

        // POST: api/VegCurries
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<VegCurries>> PostVegCurries([FromForm]VegCurries vegCurries)
        {
            try
            {
                vegCurries.Image = await SaveImage(vegCurries.ImageFile);
                _context.vegCurries.Add(vegCurries);
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return StatusCode(201);
            // return CreatedAtAction("GetVegCurries", new { id = vegCurries.Id }, vegCurries);
        }

        // DELETE: api/VegCurries/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<VegCurries>> DeleteVegCurries(int id)
        {
            var vegCurries = await _context.vegCurries.FindAsync(id);
            if (vegCurries == null)
            {
                return NotFound();
            }
            DeleteImage(vegCurries.Image);
            _context.vegCurries.Remove(vegCurries);
            await _context.SaveChangesAsync();

            return vegCurries;
        }

        private bool VegCurriesExists(int id)
        {
            return _context.vegCurries.Any(e => e.Id == id);
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string image = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "_");
            image = image + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/VegCurriesImages", image);
            using(var fileStream = new FileStream(imagePath,FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return image;
        }
        [NonAction]
        public void DeleteImage(string image)
        {
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/VegCurriesImages", image);
            if(System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
