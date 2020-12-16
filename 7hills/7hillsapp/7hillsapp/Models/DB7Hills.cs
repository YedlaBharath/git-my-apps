using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace _7hillsapp.Models
{
    public class DB7Hills
    {
        [Key]// primary key
        public int id { get; set; }
        [Column(TypeName = "nvarchar(100)")]// sql datatype for columns
        public string userName { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string email { get; set; }
        [Column(TypeName = "nvarchar(100)")]
        public string password { get; set; }
    }
}
