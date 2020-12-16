using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace _7hillsapp.Models
{
    public class SignUpUserNewModel
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName = "int")]
        public int UserId { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Email { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Name { get; set; }

        [Column(TypeName = "int")]
        public int Mobile { get; set; }
    }
}
