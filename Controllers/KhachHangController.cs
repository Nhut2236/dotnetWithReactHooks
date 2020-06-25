using System.Linq;
using Microsoft.AspNetCore.Mvc;
using BookingServices.Providers;
using BookingServices.Models;
using BookingServices.Dao;
using BookingServices.Common;
using System;

namespace BookingServices.Controllers
{
    [Route("api/[controller]")]
    public class KhachHangController : BaseAccountController
    {
        public KhachHangController(BookingServicesContext bookingServicesContext) : base(bookingServicesContext) { }


        [HttpGet("[action]")]
        public ReturnObject GetAll()
        {
            ReturnObject obj = new ReturnObject();
            DaoKhachHang daoKhachHang = new DaoKhachHang(bookingServicesContext);
            try
            {
                var data = daoKhachHang.GetAll();
                if (data.Count>-1)
                {
                    obj.status = 200;
                    obj.data = data;
                }
                else obj.status = 404;
            }
            catch (Exception ex)
            {
                obj.status = 404;
                obj.message = ex.StackTrace;
            }
            return obj;
        }
    }
}
