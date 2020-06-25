using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingServices.Models;
using TWG_SSM.Dao;

namespace BookingServices.Dao
{
    public class DaoKhachHang : DaoBase
    {
        public DaoKhachHang(BookingServicesContext _context) : base(_context) { }

        public List<KhachHang> GetAll()
        {
            var result = context.KhachHang.ToList();
            return result;
        }
    }
}
