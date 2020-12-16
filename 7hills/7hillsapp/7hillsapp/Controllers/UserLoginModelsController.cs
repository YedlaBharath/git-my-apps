using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _7hillsapp.Models;
using Microsoft.Data.SqlClient;

namespace _7hillsapp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserLoginModelsController : ControllerBase
    {

        private readonly _7HillsDBContext _context;
        public int flag = 0;

        public UserLoginModelsController(_7HillsDBContext context)
        {
            _context = context;
        }

        // GET: api/UserLoginModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserLoginModel>>> GetloginModels()
        {
            return await _context.loginModels.ToListAsync();
        }

        // GET: api/UserLoginModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserLoginModel>> GetUserLoginModel(int id)
        {
            var userLoginModel = await _context.loginModels.FindAsync(id);

            if (userLoginModel == null)
            {
                return NotFound();
            }

            return userLoginModel;
        }

        // PUT: api/UserLoginModels/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserLoginModel(int id, UserLoginModel userLoginModel)
        {
            if (id != userLoginModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(userLoginModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserLoginModelExists(id))
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

        // POST: api/UserLoginModels
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<UserLoginModel>> PostUserLoginModel(UserLoginModel userLoginModel)
        {
            try
            {
                //CheckLogin(userLoginModel.UserName, userLoginModel.PassWord);
                //if (flag>0)
                {
                    _context.loginModels.Add(userLoginModel);
                    await _context
                        .SaveChangesAsync();
                }
                    
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return StatusCode(201);

            // return CreatedAtAction("GetUserLoginModel", new { id = userLoginModel.Id }, userLoginModel);
        }

        // DELETE: api/UserLoginModels/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserLoginModel>> DeleteUserLoginModel(int id)
        {
            var userLoginModel = await _context.loginModels.FindAsync(id);
            if (userLoginModel == null)
            {
                return NotFound();
            }

            _context.loginModels.Remove(userLoginModel);
            await _context.SaveChangesAsync();

            return userLoginModel;
        }

        private bool UserLoginModelExists(int id)
        {
            return _context.loginModels.Any(e => e.Id == id);
        }
        [NonAction]
        public int CheckLogin(string UserName, string PassWord)
        {
            
            try
            {
                SqlConnection con = new SqlConnection("server=LAPTOP-HN8LV4VN; Database=7HillsDB; Trusted_Connection=True; MultipleActiveResultSets=True;");
                string sql = @"Select UserName,Password FROM newUserSignUps WHERE UserName=@UserName and PassWord=@PassWord";
                using (SqlCommand sc = new SqlCommand(sql, con))
                {
                    sc.Parameters.AddWithValue("@UserName", UserName);
                    sc.Parameters.AddWithValue("@PassWord", PassWord);
                    con.Open();
                    flag = sc.ExecuteNonQuery();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            return flag;
        }
    }
}
