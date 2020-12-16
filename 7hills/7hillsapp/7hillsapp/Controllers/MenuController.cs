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
    public class MenuController : ControllerBase
    {
        private readonly _7HillsDBContext _context;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public MenuController(_7HillsDBContext context,IWebHostEnvironment webHostEnvironment)
        {
            _context = context;
            this._webHostEnvironment = webHostEnvironment;
        }

        // GET: api/Menu
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MenuModel>>> GetMenus()
        {
            return await _context.Menus
                .Select(x=>new MenuModel()
                {
                    Id = x.Id,
                    Name= x.Name,
                    Image=x.Image,
                    Section = x.Section,
                    ImageSrc = string.Format("{0}://{1}{2}/Images/MenuImages/{3}",Request.Scheme,Request.Host,Request.PathBase,x.Image)
                })
                .ToListAsync();
        }

        // GET: api/Menu/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MenuModel>> GetMenuModel(int id)
        {
            var menuModel = await _context.Menus.FindAsync(id);

            if (menuModel == null)
            {
                return NotFound();
            }

            return menuModel;
        }

        // PUT: api/Menu/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMenuModel(int id, [FromForm]MenuModel menuModel)
        {
            if (id != menuModel.Id)
            {
                return BadRequest();
            }
            try
            {
                if(menuModel.ImageFile!=null)
                {
                    DeleteItem(menuModel.Image);
                    menuModel.Image = await SaveImage(menuModel.ImageFile);
                }
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            _context.Entry(menuModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MenuModelExists(id))
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

        // POST: api/Menu
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MenuModel>> PostMenuModel([FromForm]MenuModel menuModel)
        {
            try
            {
                menuModel.Image = await SaveImage(menuModel.ImageFile);
                _context.Menus.Add(menuModel);
                await _context.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return StatusCode(201);

            // return CreatedAtAction("GetMenuModel", new { id = menuModel.Id }, menuModel);
        }

        // DELETE: api/Menu/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MenuModel>> DeleteMenuModel(int id)
        {
            var menuModel = await _context.Menus.FindAsync(id);
            if (menuModel == null)
            {
                return NotFound();
            }

            DeleteItem(menuModel.Image);
            _context.Menus.Remove(menuModel);
            await _context.SaveChangesAsync();

            return menuModel;
        }

        private bool MenuModelExists(int id)
        {
            return _context.Menus.Any(e => e.Id == id);
        }
        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string image = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '_');
            image = image + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/MenuImages", image);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return image;
        }
        [NonAction]
        public void DeleteItem(string image)
        {
            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images/MenuImages", image);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }
    }
}
