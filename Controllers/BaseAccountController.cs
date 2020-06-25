using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingServices.Models;
using Microsoft.AspNetCore.Mvc;
using BookingServices.Common;


namespace BookingServices.Controllers
{
    public class BaseAccountController : Controller
    {
        protected readonly BookingServicesContext bookingServicesContext;
        public Common.UserSession userSession = null;

        public BaseAccountController(BookingServicesContext bookingServicesContext)
        {
            this.bookingServicesContext = bookingServicesContext;
        }
    }
}
