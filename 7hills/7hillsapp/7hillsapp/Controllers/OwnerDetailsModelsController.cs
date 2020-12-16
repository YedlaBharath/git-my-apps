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
    public class OwnerDetailsModelsController : ControllerBase
    {
        private readonly _7HillsDBContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public OwnerDetailsModelsController(_7HillsDBContext context, IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            this._webHostEnvironment = webHostEnvironment;
        }

        // GET: api/OwnerDetailsModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OwnerDetailsModel>>> GetOwnerDetailsModels()
        {
            return await _context.OwnerDetailsModels
                .Select(x=>new OwnerDetailsModel()
                { 
                    OwnerId = x.OwnerId,
                    OwnerName = x.OwnerName,
                    OwnerUserName = x.OwnerUserName,
                    OwnerPassword = x.OwnerPassword,
                    OwnerEmail = x.OwnerEmail,
                    OwnerAdress = x.OwnerAdress,
                    OwnerImage = x.OwnerImage,
                    OwnerImageSrc = string.Format("{0}://{1}{2}/Images/OwnerImages/{3}",Request.Scheme,Request.Host,Request.PathBase,x.OwnerImage)
                }).ToListAsync();
        }

        // GET: api/OwnerDetailsModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OwnerDetailsModel>> GetOwnerDetailsModel(int id)
        {
            var ownerDetailsModel = await _context.OwnerDetailsModels.FindAsync(id);

            if (ownerDetailsModel == null)
            {
                return NotFound();
            }

            return ownerDetailsModel;
        }

        // PUT: api/OwnerDetailsModels/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOwnerDetailsModel(int id, [FromForm]OwnerDetailsModel ownerDetailsModel)
        {
            if (id != ownerDetailsModel.OwnerId)
            {
                return BadRequest();
            }
            if(ownerDetailsModel.OwnerImageFile!=null)
            {
                DeleteImage(ownerDetailsModel.OwnerImage);
                ownerDetailsModel.OwnerImage = await Save(ownerDetailsModel.OwnerImageFile);
            }

            _context.Entry(ownerDetailsModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OwnerDetailsModelExists(id))
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

        // POST: api/OwnerDetailsModels
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<OwnerDetailsModel>> PostOwnerDetailsModel([FromForm]OwnerDetailsModel ownerDetailsModel)
        {
            try
            {
                ownerDetailsModel.OwnerImage = await Save(ownerDetailsModel.OwnerImageFile);
                _context.OwnerDetailsModels.Add(ownerDetailsModel);
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            return StatusCode(201);
            //return CreatedAtAction("GetOwnerDetailsModel", new { id = ownerDetailsModel.OwnerId }, ownerDetailsModel);
        }

        // DELETE: api/OwnerDetailsModels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<OwnerDetailsModel>> DeleteOwnerDetailsModel(int id)
        {
            var ownerDetailsModel = await _context.OwnerDetailsModels.FindAsync(id);
            if (ownerDetailsModel == null)
            {
                return NotFound();
            }
            DeleteImage(ownerDetailsModel.OwnerImage);
            _context.OwnerDetailsModels.Remove(ownerDetailsModel);
            await _context.SaveChangesAsync();

            return ownerDetailsModel;
        }

        private bool OwnerDetailsModelExists(int id)
        {
            return _context.OwnerDetailsModels.Any(e => e.OwnerId == id);
        }
        [NonAction]
        public async Task<string> Save(IFormFile ImageFile)
        {
            string ownerImage = new string(Path.GetFileNameWithoutExtension(ImageFile.FileName).Take(10).ToArray()).Replace(' ','-');
            ownerImage = ownerImage + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(ImageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath,"Images/OwnerImages",ownerImage);
            using(var filestream = new FileStream(imagePath, FileMode.Create))
            {
                await ImageFile.CopyToAsync(filestream);
            }
            return ownerImage;
        }
        [NonAction]
        public void DeleteImage(string ownerImage)
        {
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/OwnerImages", ownerImage);
            if(System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
