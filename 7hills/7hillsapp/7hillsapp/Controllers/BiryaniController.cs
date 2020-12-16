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
    public class BiryaniController : ControllerBase
    {
        private readonly _7HillsDBContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public BiryaniController(_7HillsDBContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            this._webHostEnvironment = webHostEnvironment;
        }

        // GET: api/Biryani
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BiryaniModel>>> GetbiryaniModels()
        {
            return await _context.biryaniModels
                .Select(x => new BiryaniModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    price = x.price,
                    Image = x.Image,
                    Section = x.Section,
                    ImageSrc = string.Format("{0}://{1}{2}/Images/BiryaniImages/{3}", Request.Scheme, Request.Host, Request.PathBase, x.Image)
                })
                .ToListAsync();
        }

        // GET: api/Biryani/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BiryaniModel>> GetBiryaniModel(int id)
        {
            var biryaniModel = await _context.biryaniModels.FindAsync(id);

            if (biryaniModel == null)
            {
                return NotFound();
            }

            return biryaniModel;
        }

        // PUT: api/Biryani/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBiryaniModel(int id, [FromForm]BiryaniModel biryaniModel)
        {
            if (id != biryaniModel.Id)
            {
                return BadRequest();
            }
            try
            {
                if(biryaniModel.ImageFile!=null)
                {
                    DeleteImage(biryaniModel.Image);
                    biryaniModel.Image = await SaveImage(biryaniModel.ImageFile);
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            _context.Entry(biryaniModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BiryaniModelExists(id))
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

        // POST: api/Biryani
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<BiryaniModel>> PostBiryaniModel([FromForm] BiryaniModel biryaniModel)
        {
            try
            {
                biryaniModel.Image = await SaveImage(biryaniModel.ImageFile);
                _context.biryaniModels.Add(biryaniModel);
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return StatusCode(201);
            // return CreatedAtAction("GetBiryaniModel", new { id = biryaniModel.Id }, biryaniModel);
        }

        // DELETE: api/Biryani/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BiryaniModel>> DeleteBiryaniModel(int id)
        {
            var biryaniModel = await _context.biryaniModels.FindAsync(id);
            if (biryaniModel == null)
            {
                return NotFound();
            }
            DeleteImage(biryaniModel.Image);
            _context.biryaniModels.Remove(biryaniModel);
            await _context.SaveChangesAsync();

            return biryaniModel;
        }

        private bool BiryaniModelExists(int id)
        {
            return _context.biryaniModels.Any(e => e.Id == id);
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string image = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "_");
            image = image + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/BiryaniImages", image);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return image;
        }
        [NonAction]
        public void DeleteImage(string image)
        {
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/BiryaniImages", image);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
