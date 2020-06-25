using System;
using BookingServices.Common;
using BookingServices.Models;

namespace TWG_SSM.Dao
{
    public class DaoBase
    {
        protected readonly BookingServicesContext context;
        //protected readonly UserSession userSession;
        public DaoBase(BookingServicesContext _context)
        {
            context = _context;
            //userSession = _userSession;
        }
    }
}
