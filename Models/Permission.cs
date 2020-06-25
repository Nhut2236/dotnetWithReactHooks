using System;
using System.Collections.Generic;

namespace BookingServices.Models
{
    public partial class Permission
    {
        public string Id { get; set; }
        public string PositionName { get; set; }
        public bool? ViewEvent { get; set; }
        public bool? CreateEvent { get; set; }
        public bool? UpdateEvent { get; set; }
        public bool? DeleteEvent { get; set; }
        public bool? PublishEvent { get; set; }
        public bool? ViewBlog { get; set; }
        public bool? CreateBlog { get; set; }
        public bool? UpdateBlog { get; set; }
        public bool? DeleteBlog { get; set; }
        public bool? PublishBlog { get; set; }
        public bool? ViewUser { get; set; }
        public bool? CreateUser { get; set; }
        public bool? UpdateUser { get; set; }
        public bool? DeleteUser { get; set; }

    }
}
