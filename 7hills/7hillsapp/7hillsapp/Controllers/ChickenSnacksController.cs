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
    public class ChickenSnacksController : ControllerBase
    {
        private readonly _7HillsDBContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ChickenSnacksController(_7HillsDBContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            this._webHostEnvironment = webHostEnvironment;
        }

        // GET: api/ChickenSnacks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChickenSnacksModel>>> GetchickenSnacks()
        {
            return await _context.chickenSnacks
                .Select(x => new ChickenSnacksModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    price = x.price,
                    Image = x.Image,
                    Section = x.Section,
                    ImageSrc = string.Format("{0}://{1}{2}/Images/ChickenSnacksImages/{3}", Request.Scheme, Request.Host, Request.PathBase, x.Image)
                })
                .ToListAsync();
        }

        // GET: api/ChickenSnacks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChickenSnacksModel>> GetChickenSnacksModel(int id)
        {
            var chickenSnacksModel = await _context.chickenSnacks.FindAsync(id);

            if (chickenSnacksModel == null)
            {
                return NotFound();
            }

            return chickenSnacksModel;
        }

        // PUT: api/ChickenSnacks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChickenSnacksModel(int id, [FromForm]ChickenSnacksModel chickenSnacksModel)
        {
            if (id != chickenSnacksModel.Id)
            {
                return BadRequest();
            }
            try
            {
                if (chickenSnacksModel.ImageFile != null)
                {
                    DeleteImage(chickenSnacksModel.Image);
                    chickenSnacksModel.Image = await SaveImage(chickenSnacksModel.ImageFile);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            _context.Entry(chickenSnacksModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChickenSnacksModelExists(id))
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

        // POST: api/ChickenSnacks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ChickenSnacksModel>> PostChickenSnacksModel([FromForm]ChickenSnacksModel chickenSnacksModel)
        {
            try
            {
                chickenSnacksModel.Image = await SaveImage(chickenSnacksModel.ImageFile);
                _context.chickenSnacks.Add(chickenSnacksModel);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return StatusCode(201);
            // return CreatedAtAction("GetChickenSnacksModel", new { id = chickenSnacksModel.Id }, chickenSnacksModel);
        }

        // DELETE: api/ChickenSnacks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ChickenSnacksModel>> DeleteChickenSnacksModel(int id)
        {
            var chickenSnacksModel = await _context.chickenSnacks.FindAsync(id);
            if (chickenSnacksModel == null)
            {
                return NotFound();
            }
            DeleteImage(chickenSnacksModel.Image);
            _context.chickenSnacks.Remove(chickenSnacksModel);
            await _context.SaveChangesAsync();

            return chickenSnacksModel;
        }

        private bool ChickenSnacksModelExists(int id)
        {
            return _context.chickenSnacks.Any(e => e.Id == id);
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string image = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "_");
            image = image + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/ChickenSnacksImages", image);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return image;
        }
        [NonAction]
        public void DeleteImage(string image)
        {
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/ChickenSnacksImages", image);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
