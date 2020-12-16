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
    public class MuttonSnacksController : ControllerBase
    {
        private readonly _7HillsDBContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;


        public MuttonSnacksController(_7HillsDBContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            this._webHostEnvironment = webHostEnvironment;

        }

        // GET: api/MuttonSnacks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MuttonSnacksModel>>> GetmuttonSnacks()
        {
            return await _context.muttonSnacks
                .Select(x => new MuttonSnacksModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    price = x.price,
                    Image = x.Image,
                    Section = x.Section,
                    ImageSrc = string.Format("{0}://{1}{2}/Images/MuttonSnacksImages/{3}", Request.Scheme, Request.Host, Request.PathBase, x.Image)
                })
                .ToListAsync();
        }

        // GET: api/MuttonSnacks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MuttonSnacksModel>> GetMuttonSnacksModel(int id)
        {
            var muttonSnacksModel = await _context.muttonSnacks.FindAsync(id);

            if (muttonSnacksModel == null)
            {
                return NotFound();
            }

            return muttonSnacksModel;
        }

        // PUT: api/MuttonSnacks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMuttonSnacksModel(int id, [FromForm]MuttonSnacksModel muttonSnacksModel)
        {
            if (id != muttonSnacksModel.Id)
            {
                return BadRequest();
            }
            try
            {
                if (muttonSnacksModel.ImageFile != null)
                {
                    DeleteImage(muttonSnacksModel.Image);
                    muttonSnacksModel.Image = await SaveImage(muttonSnacksModel.ImageFile);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            _context.Entry(muttonSnacksModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MuttonSnacksModelExists(id))
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

        // POST: api/MuttonSnacks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MuttonSnacksModel>> PostMuttonSnacksModel([FromForm]MuttonSnacksModel muttonSnacksModel)
        {
            try
            {
                muttonSnacksModel.Image = await SaveImage(muttonSnacksModel.ImageFile);
                _context.muttonSnacks.Add(muttonSnacksModel);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return StatusCode(201);
            // return CreatedAtAction("GetMuttonSnacksModel", new { id = muttonSnacksModel.Id }, muttonSnacksModel);
        }

        // DELETE: api/MuttonSnacks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MuttonSnacksModel>> DeleteMuttonSnacksModel(int id)
        {
            var muttonSnacksModel = await _context.muttonSnacks.FindAsync(id);
            if (muttonSnacksModel == null)
            {
                return NotFound();
            }

            DeleteImage(muttonSnacksModel.Image);
            _context.muttonSnacks.Remove(muttonSnacksModel);
            await _context.SaveChangesAsync();

            return muttonSnacksModel;
        }

        private bool MuttonSnacksModelExists(int id)
        {
            return _context.muttonSnacks.Any(e => e.Id == id);
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string image = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "_");
            image = image + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/MuttonSnacksImages", image);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return image;
        }
        [NonAction]
        public void DeleteImage(string image)
        {
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/MuttonSnacksImages", image);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
