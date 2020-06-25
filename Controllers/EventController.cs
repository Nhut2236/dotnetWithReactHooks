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
    public class EventController : BaseAccountController
    {
        public EventController(BookingServicesContext bookingServicesContext) : base(bookingServicesContext) { }

        [HttpPost]
        public ReturnObject GetAll([FromBody] Query query)
        {
            ReturnObject obj = new ReturnObject();
            DaoEvent daoEvent = new DaoEvent(bookingServicesContext);
            try
            {
                var data = daoEvent.GetAll(query.PageIndex, query.PageSize, query.Title, query.IsPublish);
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
        public ReturnObject Create([FromBody] Event entity)
        {
            ReturnObject obj = new ReturnObject();
            var userName = getClaimsByToken();
            DaoEvent daoEvent = new DaoEvent(bookingServicesContext);
            try
            {
                entity.UpdatedBy = userName;
                entity.CreatedBy = userName;
                var data = daoEvent.Create(entity);
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
        public ReturnObject Update([FromBody] Event entity)
        {
            ReturnObject obj = new ReturnObject();
            var userName = getClaimsByToken();
            DaoEvent daoEvent = new DaoEvent(bookingServicesContext);
            try
            {
                entity.UpdatedBy = userName;
                var data = daoEvent.Update(entity);
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
            DaoEvent daoEvent = new DaoEvent(bookingServicesContext);
            try
            {
                var data = daoEvent.getById(id);
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
        public ReturnObject GetAllEventPage([FromBody] Query query)
        {
            ReturnObject obj = new ReturnObject();
            DaoEvent daoEvent = new DaoEvent(bookingServicesContext);
            try
            {
                var data = daoEvent.GetAllEventPage(query.PageSize);
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

        public ReturnObject GetByGroup([FromBody] Query query)
        {
            ReturnObject obj = new ReturnObject();
            DaoEvent daoEvent = new DaoEvent(bookingServicesContext);
            try
            {
                var data = daoEvent.GetByGroup(query.InGroup, query.PageSize);
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
        public ReturnObject delete([FromBody] Delete data)
        {
            ReturnObject obj = new ReturnObject();
            DaoEvent daoEvent = new DaoEvent(bookingServicesContext);
            try
            {
                var response = daoEvent.Delete(data.Ids);
                if (response != null)
                {
                    obj.status = 200;
                    obj.data = response;
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
