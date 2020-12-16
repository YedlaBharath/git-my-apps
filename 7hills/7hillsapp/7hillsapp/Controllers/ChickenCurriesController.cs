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
    public class ChickenCurriesController : ControllerBase
    {
        private readonly _7HillsDBContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ChickenCurriesController(_7HillsDBContext context,IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            this._webHostEnvironment = webHostEnvironment;
        }

        // GET: api/ChickenCurries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ChickenCurriesModel>>> GetchickenCurries()
        {
            return await _context.chickenCurries
                .Select(x => new ChickenCurriesModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    price = x.price,
                    Image = x.Image,
                    Section = x.Section,
                    ImageSrc = string.Format("{0}://{1}{2}/Images/ChickenCurriesImages/{3}", Request.Scheme, Request.Host, Request.PathBase, x.Image)
                })
                .ToListAsync();
        }

        // GET: api/ChickenCurries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ChickenCurriesModel>> GetChickenCurriesModel(int id)
        {
            var chickenCurriesModel = await _context.chickenCurries.FindAsync(id);

            if (chickenCurriesModel == null)
            {
                return NotFound();
            }

            return chickenCurriesModel;
        }

        // PUT: api/ChickenCurries/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutChickenCurriesModel(int id, [FromForm]ChickenCurriesModel chickenCurriesModel)
        {
            if (id != chickenCurriesModel.Id)
            {
                return BadRequest();
            }
            try
            {
                if (chickenCurriesModel.ImageFile != null)
                {
                    DeleteImage(chickenCurriesModel.Image);
                    chickenCurriesModel.Image = await SaveImage(chickenCurriesModel.ImageFile);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            _context.Entry(chickenCurriesModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ChickenCurriesModelExists(id))
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

        // POST: api/ChickenCurries
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<ChickenCurriesModel>> PostChickenCurriesModel([FromForm]ChickenCurriesModel chickenCurriesModel)
        {
            try
            {
                chickenCurriesModel.Image = await SaveImage(chickenCurriesModel.ImageFile);
                _context.chickenCurries.Add(chickenCurriesModel);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return StatusCode(201);
            // return CreatedAtAction("GetChickenCurriesModel", new { id = chickenCurriesModel.Id }, chickenCurriesModel);
        }

        // DELETE: api/ChickenCurries/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ChickenCurriesModel>> DeleteChickenCurriesModel(int id)
        {
            var chickenCurriesModel = await _context.chickenCurries.FindAsync(id);
            if (chickenCurriesModel == null)
            {
                return NotFound();
            }
            DeleteImage(chickenCurriesModel.Image);
            _context.chickenCurries.Remove(chickenCurriesModel);
            await _context.SaveChangesAsync();

            return chickenCurriesModel;
        }

        private bool ChickenCurriesModelExists(int id)
        {
            return _context.chickenCurries.Any(e => e.Id == id);
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string image = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "_");
            image = image + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/ChickenCurriesImages", image);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return image;
        }
        [NonAction]
        public void DeleteImage(string image)
        {
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/ChickenCurriesImages", image);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
