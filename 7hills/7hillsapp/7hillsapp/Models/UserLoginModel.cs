using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace _7hillsapp.Models
{
    public class UserLoginModel
    {
        [Key]
        public int Id { get; set; }
        [Column(TypeName ="nvarchar(50)")]
        public string UserName { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string PassWord { get; set; }
    }
}
