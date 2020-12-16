using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace _7hillsapp.Models
{
    public class VegSnacksModel
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName ="nvarchar(50)")]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(max)")]
        public string Image { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Section { get; set; }

        [Column(TypeName = "int")]
        public int price { get; set; }

        [NotMapped]
        public IFormFile ImageFile { get; set; }

        [NotMapped]
        public string ImageSrc { get; set; }
    }
}
