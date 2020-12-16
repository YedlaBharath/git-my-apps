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
    public class RotiNaanController : ControllerBase
    {
        private readonly _7HillsDBContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public RotiNaanController(_7HillsDBContext context,IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            this._webHostEnvironment = webHostEnvironment;
        }

        // GET: api/RotiNaan
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RotiNaanModel>>> GetrotiNaans()
        {
            return await _context.rotiNaans
                .Select(x => new RotiNaanModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    price = x.price,
                    Image = x.Image,
                    Section = x.Section,
                    ImageSrc = string.Format("{0}://{1}{2}/Images/RotiNaanImages/{3}", Request.Scheme, Request.Host, Request.PathBase, x.Image)
                })
                .ToListAsync();
        }

        // GET: api/RotiNaan/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RotiNaanModel>> GetRotiNaanModel(int id)
        {
            var rotiNaanModel = await _context.rotiNaans.FindAsync(id);

            if (rotiNaanModel == null)
            {
                return NotFound();
            }

            return rotiNaanModel;
        }

        // PUT: api/RotiNaan/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRotiNaanModel(int id, [FromForm]RotiNaanModel rotiNaanModel)
        {
            if (id != rotiNaanModel.Id)
            {
                return BadRequest();
            }
            try
            {
                if (rotiNaanModel.ImageFile != null)
                {
                    DeleteImage(rotiNaanModel.Image);
                    rotiNaanModel.Image = await SaveImage(rotiNaanModel.ImageFile);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            _context.Entry(rotiNaanModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RotiNaanModelExists(id))
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

        // POST: api/RotiNaan
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<RotiNaanModel>> PostRotiNaanModel([FromForm]RotiNaanModel rotiNaanModel)
        {
            try
            {
                rotiNaanModel.Image = await SaveImage(rotiNaanModel.ImageFile);
                _context.rotiNaans.Add(rotiNaanModel);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return StatusCode(201);
            // return CreatedAtAction("GetRotiNaanModel", new { id = rotiNaanModel.Id }, rotiNaanModel);
        }

        // DELETE: api/RotiNaan/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<RotiNaanModel>> DeleteRotiNaanModel(int id)
        {
            var rotiNaanModel = await _context.rotiNaans.FindAsync(id);
            if (rotiNaanModel == null)
            {
                return NotFound();
            }

            DeleteImage(rotiNaanModel.Image);
            _context.rotiNaans.Remove(rotiNaanModel);
            await _context.SaveChangesAsync();

            return rotiNaanModel;
        }

        private bool RotiNaanModelExists(int id)
        {
            return _context.rotiNaans.Any(e => e.Id == id);
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string image = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "_");
            image = image + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/RotiNaanImages", image);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return image;
        }
        [NonAction]
        public void DeleteImage(string image)
        {
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/RotiNaanImages", image);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
