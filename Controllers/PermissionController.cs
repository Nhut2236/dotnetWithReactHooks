using System.Linq;
using Microsoft.AspNetCore.Mvc;
using BookingServices.Providers;
using BookingServices.Models;
using BookingServices.Dao;
using BookingServices.Common;
using System;
using System.Net.Http.Headers;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace BookingServices.Controllers
{
    [Route("api/[controller]/[action]")]
    public class PermissionController : BaseAccountController
    {
        public PermissionController(BookingServicesContext bookingServicesContext) : base(bookingServicesContext) { }

        [HttpPost]
        public ReturnObject GetAll([FromBody] Query query)
        {
            ReturnObject obj = new ReturnObject();
            DaoPermission daoPermission = new DaoPermission(bookingServicesContext);
            try
            {
                var data = daoPermission.GetAll(query.PageIndex, query.PageSize, query.Title);
                if (data != null)
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

        [HttpPost]
        public ReturnObject Create([FromBody] Permission entity)
        {
            ReturnObject obj = new ReturnObject();
            DaoPermission daoPermission = new DaoPermission(bookingServicesContext);
            try
            {
                var data = daoPermission.Create(entity);
                if (data != null)
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

        [HttpPost]
        [Authorize]
        public ReturnObject Update([FromBody] Permission entity)
        {
            ReturnObject obj = new ReturnObject();
            DaoPermission daoPermission = new DaoPermission(bookingServicesContext);
            try
            {
                var data = daoPermission.Update(entity);
                if (data != null)
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

        [HttpGet("{id}")]
        public ReturnObject Get(string id)
        {
            ReturnObject obj = new ReturnObject();
            DaoPermission daoPermission = new DaoPermission(bookingServicesContext);
            try
            {
                var data = daoPermission.getById(id);
                if (data != null)
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

        //[HttpPost]
        //public ReturnObject delete([FromBody] Delete data)
        //{
        //    ReturnObject obj = new ReturnObject();
        //    DaoPermission daoPermission = new DaoPermission(bookingServicesContext);
        //    try
        //    {
        //        var response = daoPermission.Delete(data.Ids);
        //        if (response != null)
        //        {
        //            obj.status = 200;
        //            obj.data = response;
        //        }
        //        else obj.status = 404;
        //    }
        //    catch (Exception ex)
        //    {
        //        obj.status = 404;
        //        obj.message = ex.StackTrace;
        //    }
        //    return obj;
        //}

        public String getClaimsByToken()
        {
            var header = AuthenticationHeaderValue.Parse(Request.Headers["Authorization"]);
            var credentials = header.Parameter;
            var tokenString = new JwtSecurityToken(jwtEncodedString: credentials);
            string claims = tokenString.Claims.First(c => c.Type == "UserName").Value;
            return claims;
        }
    }
}
