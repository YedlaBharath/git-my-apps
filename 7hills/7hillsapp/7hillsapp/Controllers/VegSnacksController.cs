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
    public class VegSnacksController : ControllerBase
    {
        private readonly _7HillsDBContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;
        
        public VegSnacksController(_7HillsDBContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            this._webHostEnvironment = webHostEnvironment;
        }

        // GET: api/VegSnacks
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VegSnacksModel>>> GetvegSnacks()
        {
            return await _context.vegSnacks
                .Select(x => new VegSnacksModel()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Image = x.Image,
                    price = x.price,
                    Section = x.Section,
                    ImageSrc = string.Format("{0}://{1}{2}/Images/VegSnacksImages/{3}",Request.Scheme,Request.Host,Request.PathBase,x.Image)
                })
                .ToListAsync();
        }

        // GET: api/VegSnacks/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VegSnacksModel>> GetVegSnacksModel(int id)
        {
            var vegSnacksModel = await _context.vegSnacks.FindAsync(id);

            if (vegSnacksModel == null)
            {
                return NotFound();
            }

            return vegSnacksModel;
        }

        // PUT: api/VegSnacks/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVegSnacksModel(int id, [FromForm]VegSnacksModel vegSnacksModel)
        {
            if (id != vegSnacksModel.Id)
            {
                return BadRequest();
            }

            try
            {
                if(vegSnacksModel.ImageFile!=null)
                {
                    DeleteImage(vegSnacksModel.Image);
                    vegSnacksModel.Image = await SaveImage(vegSnacksModel.ImageFile);
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            _context.Entry(vegSnacksModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VegSnacksModelExists(id))
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

        // POST: api/VegSnacks
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<VegSnacksModel>> PostVegSnacksModel([FromForm]VegSnacksModel vegSnacksModel)
        {
            try
            {
                vegSnacksModel.Image = await SaveImage(vegSnacksModel.ImageFile);
                _context.vegSnacks.Add(vegSnacksModel);
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return StatusCode(201);
            // return CreatedAtAction("GetVegSnacksModel", new { id = vegSnacksModel.Id }, vegSnacksModel);
        }

        // DELETE: api/VegSnacks/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<VegSnacksModel>> DeleteVegSnacksModel(int id)
        {
            var vegSnacksModel = await _context.vegSnacks.FindAsync(id);
            if (vegSnacksModel == null)
            {
                return NotFound();
            }
            DeleteImage(vegSnacksModel.Image);
            _context.vegSnacks.Remove(vegSnacksModel);
            await _context.SaveChangesAsync();

            return vegSnacksModel;
        }

        private bool VegSnacksModelExists(int id)
        {
            return _context.vegSnacks.Any(e => e.Id == id);
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string image = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '_');
            image = image + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/VegSnacksImages", image);
            using(var fileStream = new FileStream(imagePath,FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return image;
        }

        [NonAction]
        public void DeleteImage(string image)
        {
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/vegSnacksImages", image);
            if(System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
