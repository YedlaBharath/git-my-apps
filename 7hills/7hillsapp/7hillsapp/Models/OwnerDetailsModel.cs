using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace _7hillsapp.Models
{
    public class OwnerDetailsModel
    {
        [Key]
        public int OwnerId { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string OwnerName { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string OwnerUserName { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string OwnerPassword { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string OwnerEmail { get; set; }
        [Column(TypeName = "nvarchar(50)")]
        public string OwnerAdress { get; set; }
        [Column(TypeName = "nvarchar(max)")]
        public string OwnerImage { get; set; }
        [NotMapped]
        public IFormFile OwnerImageFile { get; set; }
        [NotMapped]
        public string OwnerImageSrc { get; set; }
    }
}
