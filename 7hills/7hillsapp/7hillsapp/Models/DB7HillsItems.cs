using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace _7hillsapp.Models
{
    public class DB7HillsItems
    {
        [Key]
        public int id { get; set; }
        [Column(TypeName ="nvarchar(50)")]
        public string item_name { get; set; }
        [Column(TypeName ="int")]
        public int price { get; set; }
        [Column(TypeName ="nvarchar(max)")]
        public string item_image { get; set; }
    }
}
