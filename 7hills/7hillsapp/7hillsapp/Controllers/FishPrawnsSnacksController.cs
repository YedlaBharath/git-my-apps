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
    public class FishPrawnsSnacksController : ControllerBase
    {
        private readonly _7HillsDBContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public FishPrawnsSnacksController(_7HillsDBContext context,IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            this._webHostEnvironment = webHostEnvironment;
        }

        // GET: api/FishPrawnsSnacks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FishPrawnsSnacksModel>>> GetfishPrawnsSnacks()
        {
            return await _context.fishPrawnsSnacks
                .Select(x => new FishPrawnsSnacksModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    price = x.price,
                    Image = x.Image,
                    Section = x.Section,
                    ImageSrc = string.Format("{0}://{1}{2}/Images/FishPrawnsSnacksImages/{3}", Request.Scheme, Request.Host, Request.PathBase, x.Image)
                })
                .ToListAsync();
        }

        // GET: api/FishPrawnsSnacks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FishPrawnsSnacksModel>> GetFishPrawnsSnacksModel(int id)
        {
            var fishPrawnsSnacksModel = await _context.fishPrawnsSnacks.FindAsync(id);

            if (fishPrawnsSnacksModel == null)
            {
                return NotFound();
            }

            return fishPrawnsSnacksModel;
        }

        // PUT: api/FishPrawnsSnacks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFishPrawnsSnacksModel(int id, [FromForm]FishPrawnsSnacksModel fishPrawnsSnacksModel)
        {
            if (id != fishPrawnsSnacksModel.Id)
            {
                return BadRequest();
            }
            try
            {
                if (fishPrawnsSnacksModel.ImageFile != null)
                {
                    DeleteImage(fishPrawnsSnacksModel.Image);
                    fishPrawnsSnacksModel.Image = await SaveImage(fishPrawnsSnacksModel.ImageFile);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            _context.Entry(fishPrawnsSnacksModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FishPrawnsSnacksModelExists(id))
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

        // POST: api/FishPrawnsSnacks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FishPrawnsSnacksModel>> PostFishPrawnsSnacksModel([FromForm]FishPrawnsSnacksModel fishPrawnsSnacksModel)
        {
            try
            {
                fishPrawnsSnacksModel.Image = await SaveImage(fishPrawnsSnacksModel.ImageFile);
                _context.fishPrawnsSnacks.Add(fishPrawnsSnacksModel);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return StatusCode(201);
            // return CreatedAtAction("GetFishPrawnsSnacksModel", new { id = fishPrawnsSnacksModel.Id }, fishPrawnsSnacksModel);
        }

        // DELETE: api/FishPrawnsSnacks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FishPrawnsSnacksModel>> DeleteFishPrawnsSnacksModel(int id)
        {
            var fishPrawnsSnacksModel = await _context.fishPrawnsSnacks.FindAsync(id);
            if (fishPrawnsSnacksModel == null)
            {
                return NotFound();
            }

            DeleteImage(fishPrawnsSnacksModel.Image);
            _context.fishPrawnsSnacks.Remove(fishPrawnsSnacksModel);
            await _context.SaveChangesAsync();

            return fishPrawnsSnacksModel;
        }

        private bool FishPrawnsSnacksModelExists(int id)
        {
            return _context.fishPrawnsSnacks.Any(e => e.Id == id);
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string image = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "_");
            image = image + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/FishPrawnsSnacksImages", image);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return image;
        }
        [NonAction]
        public void DeleteImage(string image)
        {
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/FishPrawnsSnacksImages", image);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
