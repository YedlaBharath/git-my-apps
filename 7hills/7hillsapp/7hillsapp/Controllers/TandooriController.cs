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
    public class TandooriController : ControllerBase
    {
        private readonly _7HillsDBContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public TandooriController(_7HillsDBContext context,IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            this._webHostEnvironment = webHostEnvironment;
        }

        // GET: api/Tandoori
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TandooriModel>>> Gettandoori()
        {
            return await _context.tandoori
                .Select(x => new TandooriModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    price = x.price,
                    Image = x.Image,
                    Section = x.Section,
                    ImageSrc = string.Format("{0}://{1}{2}/Images/TandooriImages/{3}", Request.Scheme, Request.Host, Request.PathBase, x.Image)
                })
                .ToListAsync();
        }

        // GET: api/Tandoori/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TandooriModel>> GetTandooriModel(int id)
        {
            var tandooriModel = await _context.tandoori.FindAsync(id);

            if (tandooriModel == null)
            {
                return NotFound();
            }

            return tandooriModel;
        }

        // PUT: api/Tandoori/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTandooriModel(int id, [FromForm]TandooriModel tandooriModel)
        {
            if (id != tandooriModel.Id)
            {
                return BadRequest();
            }
            try
            {
                if (tandooriModel.ImageFile != null)
                {
                    DeleteImage(tandooriModel.Image);
                    tandooriModel.Image = await SaveImage(tandooriModel.ImageFile);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            _context.Entry(tandooriModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TandooriModelExists(id))
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

        // POST: api/Tandoori
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<TandooriModel>> PostTandooriModel([FromForm]TandooriModel tandooriModel)
        {
            try
            {
                tandooriModel.Image = await SaveImage(tandooriModel.ImageFile);
                _context.tandoori.Add(tandooriModel);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return StatusCode(201);
            // return CreatedAtAction("GetTandooriModel", new { id = tandooriModel.Id }, tandooriModel);
        }

        // DELETE: api/Tandoori/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<TandooriModel>> DeleteTandooriModel(int id)
        {
            var tandooriModel = await _context.tandoori.FindAsync(id);
            if (tandooriModel == null)
            {
                return NotFound();
            }

            DeleteImage(tandooriModel.Image);
            _context.tandoori.Remove(tandooriModel);
            await _context.SaveChangesAsync();

            return tandooriModel;
        }

        private bool TandooriModelExists(int id)
        {
            return _context.tandoori.Any(e => e.Id == id);
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string image = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "_");
            image = image + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/TandooriImages", image);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return image;
        }
        [NonAction]
        public void DeleteImage(string image)
        {
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/TandooriImages", image);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
