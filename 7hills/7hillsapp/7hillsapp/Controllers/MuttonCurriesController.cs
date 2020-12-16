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
    public class MuttonCurriesController : ControllerBase
    {
        private readonly _7HillsDBContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public MuttonCurriesController(_7HillsDBContext context,IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            this._webHostEnvironment = webHostEnvironment;
        }

        // GET: api/MuttonCurries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MuttonCurriesModel>>> GetmuttonCurries()
        {
            return await _context.muttonCurries
                .Select(x => new MuttonCurriesModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    price = x.price,
                    Image = x.Image,
                    Section = x.Section,
                    ImageSrc = string.Format("{0}://{1}{2}/Images/MuttonCurriesImages/{3}", Request.Scheme, Request.Host, Request.PathBase, x.Image)
                })
                .ToListAsync();
        }

        // GET: api/MuttonCurries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MuttonCurriesModel>> GetMuttonCurriesModel(int id)
        {
            var muttonCurriesModel = await _context.muttonCurries.FindAsync(id);

            if (muttonCurriesModel == null)
            {
                return NotFound();
            }

            return muttonCurriesModel;
        }

        // PUT: api/MuttonCurries/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMuttonCurriesModel(int id, [FromForm]MuttonCurriesModel muttonCurriesModel)
        {
            if (id != muttonCurriesModel.Id)
            {
                return BadRequest();
            }
            try
            {
                if (muttonCurriesModel.ImageFile != null)
                {
                    DeleteImage(muttonCurriesModel.Image);
                    muttonCurriesModel.Image = await SaveImage(muttonCurriesModel.ImageFile);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            _context.Entry(muttonCurriesModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MuttonCurriesModelExists(id))
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

        // POST: api/MuttonCurries
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MuttonCurriesModel>> PostMuttonCurriesModel([FromForm]MuttonCurriesModel muttonCurriesModel)
        {
            try
            {
                muttonCurriesModel.Image = await SaveImage(muttonCurriesModel.ImageFile);
                _context.muttonCurries.Add(muttonCurriesModel);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return StatusCode(201);
            // return CreatedAtAction("GetMuttonCurriesModel", new { id = muttonCurriesModel.Id }, muttonCurriesModel);
        }

        // DELETE: api/MuttonCurries/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MuttonCurriesModel>> DeleteMuttonCurriesModel(int id)
        {
            var muttonCurriesModel = await _context.muttonCurries.FindAsync(id);
            if (muttonCurriesModel == null)
            {
                return NotFound();
            }

            DeleteImage(muttonCurriesModel.Image);
            _context.muttonCurries.Remove(muttonCurriesModel);
            await _context.SaveChangesAsync();

            return muttonCurriesModel;
        }

        private bool MuttonCurriesModelExists(int id)
        {
            return _context.muttonCurries.Any(e => e.Id == id);
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string image = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "_");
            image = image + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/MuttonCurriesImages", image);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return image;
        }
        [NonAction]
        public void DeleteImage(string image)
        {
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/MuttonCurriesImages", image);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
