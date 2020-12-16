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
    public class BestOfSevenHillsModelsController : ControllerBase
    {
        private readonly _7HillsDBContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public BestOfSevenHillsModelsController(_7HillsDBContext context,IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            this._webHostEnvironment = webHostEnvironment;
        }

        // GET: api/BestOfSevenHillsModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BestOfSevenHillsModel>>> GetbestOfSevenHills()
        {
            return await _context.bestOfSevenHills
                .Select(x => new BestOfSevenHillsModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    price = x.price,
                    Image = x.Image,
                    Section = x.Section,
                    ImageSrc = string.Format("{0}://{1}{2}/Images/BestOfSevenHillsImages/{3}", Request.Scheme, Request.Host, Request.PathBase, x.Image)
                })
                .ToListAsync();
        }

        // GET: api/BestOfSevenHillsModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BestOfSevenHillsModel>> GetBestOfSevenHillsModel(int id)
        {
            var bestOfSevenHillsModel = await _context.bestOfSevenHills.FindAsync(id);

            if (bestOfSevenHillsModel == null)
            {
                return NotFound();
            }

            return bestOfSevenHillsModel;
        }

        // PUT: api/BestOfSevenHillsModels/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBestOfSevenHillsModel(int id, [FromForm]BestOfSevenHillsModel bestOfSevenHillsModel)
        {
            if (id != bestOfSevenHillsModel.Id)
            {
                return BadRequest();
            }
            try
            {
                if (bestOfSevenHillsModel.ImageFile != null)
                {
                    DeleteImage(bestOfSevenHillsModel.Image);
                    bestOfSevenHillsModel.Image = await SaveImage(bestOfSevenHillsModel.ImageFile);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            _context.Entry(bestOfSevenHillsModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BestOfSevenHillsModelExists(id))
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

        // POST: api/BestOfSevenHillsModels
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<BestOfSevenHillsModel>> PostBestOfSevenHillsModel([FromForm]BestOfSevenHillsModel bestOfSevenHillsModel)
        {
            try
            {

                bestOfSevenHillsModel.Image = await SaveImage(bestOfSevenHillsModel.ImageFile);
                _context.bestOfSevenHills.Add(bestOfSevenHillsModel);
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return StatusCode(201);
            //return CreatedAtAction("GetBestOfSevenHillsModel", new { id = bestOfSevenHillsModel.Id }, bestOfSevenHillsModel);
        }

        // DELETE: api/BestOfSevenHillsModels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BestOfSevenHillsModel>> DeleteBestOfSevenHillsModel(int id)
        {
            var bestOfSevenHillsModel = await _context.bestOfSevenHills.FindAsync(id);
            if (bestOfSevenHillsModel == null)
            {
                return NotFound();
            }
            DeleteImage(bestOfSevenHillsModel.Image);
            _context.bestOfSevenHills.Remove(bestOfSevenHillsModel);
            await _context.SaveChangesAsync();

            return bestOfSevenHillsModel;
        }

        private bool BestOfSevenHillsModelExists(int id)
        {
            return _context.bestOfSevenHills.Any(e => e.Id == id);
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string image = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "_");
            image = image + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/BestOfSevenHillsImages", image);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return image;
        }
        [NonAction]
        public void DeleteImage(string image)
        {
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/BestOfSevenHillsImages", image);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
