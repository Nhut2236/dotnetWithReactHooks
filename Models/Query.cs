using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookingServices.Models
{
    public class Query
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public string InGroup { get; set; }
        public string Title {get;set;}
        public bool IsPublish { get; set; }
    }
}
