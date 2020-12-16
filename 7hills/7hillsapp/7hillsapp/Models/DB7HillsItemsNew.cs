using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace _7hillsapp.Models
{
    public class DB7HillsItemsNew
    {
        [Key]
        public int id { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string ItemName { get; set; }
        [Column(TypeName = "int")]
        public int Price { get; set; }
        [Column(TypeName = "nvarchar(max)")]
        public string ItemImage { get; set; }
        [NotMapped]
        public IFormFile ImageFile { get; set; }
    }
}
