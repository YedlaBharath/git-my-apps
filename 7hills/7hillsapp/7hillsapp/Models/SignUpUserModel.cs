using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace _7hillsapp.Models
{
    public class SignUpUserModel
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "varchar(20)")]
        public string Email { get; set; }

        [Column(TypeName = "varchar(20)")]
        public string UserName { get; set; }

        [Column(TypeName = "varchar(20)")]
        public string PassWord { get; set; }

        [Column(TypeName = "varchar(max)")]
        public string Address { get; set; }

        [Column(TypeName = "int")]
        public int Mobile { get; set; }
    }
}
