using System;
using System.Collections.Generic;

namespace BookingServices.Models
{
    public partial class Blog
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Avatar { get; set; }
        public string Description { get; set; }
        public bool? IsDelete { get; set; }
        public bool? IsPublish { get; set; }
        public string InGroup { get; set; }
        public string CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }
    }
}
