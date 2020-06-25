using System.Linq;
using Microsoft.AspNetCore.Mvc;
using BookingServices.Providers;
using BookingServices.Models;
using BookingServices.Dao;
using BookingServices.Common;
using System;
using System.Threading.Tasks;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Collections.Generic;

namespace BookingServices.Controllers
{
    [Route("api/[controller]/[action]")]
    public class UserController : BaseAccountController
    {
        public UserController(BookingServicesContext bookingServicesContext) : base(bookingServicesContext) { }

        private readonly IConfiguration _config;

        [HttpPost]
        public ReturnObject GetAll([FromBody] Query query)
        {
            ReturnObject obj = new ReturnObject();
            DaoUser daoUser = new DaoUser(bookingServicesContext);
            try
            {
                var data = daoUser.GetAll(query.PageIndex, query.PageSize);
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
        public ReturnObject SignUp([FromBody] Users entity)
        {
            ReturnObject obj = new ReturnObject();
            DaoUser daoUser = new DaoUser(bookingServicesContext);
            try
            {
                var data = daoUser.SignUp(entity);
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

        [HttpGet("{facebookId}")]
        public Boolean CheckUserFBExist(string facebookId)
        {
            DaoUser daoUser = new DaoUser(bookingServicesContext);
            var result = daoUser.CheckUserFBExist(facebookId);
            return result;
        }

        [HttpGet("{googleId}")]
        public Boolean CheckUserGoogleExist(string googleId)
        {
            DaoUser daoUser = new DaoUser(bookingServicesContext);
            var result = daoUser.CheckUserGoogleExist(googleId);
            return result;
        }

        [HttpPost]
        public ReturnObject Update([FromBody] Users entity)
        {
            ReturnObject obj = new ReturnObject();
            DaoUser daoUser = new DaoUser(bookingServicesContext);
            try
            {
                var data = daoUser.Update(entity);
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
        [Authorize]
        public ReturnObject Get(string id)
        {
            ReturnObject obj = new ReturnObject();
            DaoUser daoUser = new DaoUser(bookingServicesContext);
            try
            {
                var data = daoUser.getById(id);
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
        public ReturnObject GetNotAuthorazation(string id)
        {
            ReturnObject obj = new ReturnObject();
            DaoUser daoUser = new DaoUser(bookingServicesContext);
            try
            {
                var data = daoUser.getById(id);
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

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login([FromBody]Users login)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(login);

            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                response = Ok(new { token = tokenString, user = user });
            }
            else
            {
                response = Ok(new { error = "Unauthorized" });
            }
            return response;
        }

        [AllowAnonymous]
        [HttpGet("{facebookId}")]
        public IActionResult LogInWithFacebook(string facebookId)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUserWithFacebook(facebookId);

            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                response = Ok(new { token = tokenString, user = user });
            }

            return response;
        }

        [AllowAnonymous]
        [HttpGet("{googleId}")]
        public IActionResult LogInWithGoogle(string googleId)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUserWithGoogle(googleId);

            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                response = Ok(new { token = tokenString, user = user });
            }

            return response;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult RefreshToken([FromBody]Users login)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(login);

            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                response = Ok(new { token = tokenString, user = user });
            }

            return response;
        }

        [AllowAnonymous]
        [HttpGet("{token}")]
        public string GetTokenClaims(string token)
        {
            var tokenString = new JwtSecurityToken(jwtEncodedString: token);
            string claims = tokenString.Claims.First(c => c.Type == "Id").Value;
            return claims;
        }

        private string GenerateJSONWebToken(Users userInfo)
        {
            var Key = "ThisismySecretKey";
            var Issuer = "Test.com";
            DateTime issuedAt = DateTime.UtcNow;
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var tokenHandler = new JwtSecurityTokenHandler();
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(new[]
              {
                    new Claim("UserName", userInfo.UserName),
                    new Claim("Id",userInfo.Id),
                });
            var token = (JwtSecurityToken) tokenHandler.CreateJwtSecurityToken(issuer: Issuer, audience: Issuer,
               subject: claimsIdentity, notBefore: issuedAt, expires: DateTime.Now.AddMinutes(120), signingCredentials: credentials);               

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private Users AuthenticateUser(Users login)
        {
            DaoUser daoUser = new DaoUser(bookingServicesContext);
            Users user = daoUser.SignIn(login.UserName, login.Password);
            return user;
        }

        private Users AuthenticateUserWithFacebook(String facebookId)
        {
            DaoUser daoUser = new DaoUser(bookingServicesContext);
            Users user = daoUser.SignInWithFacebook(facebookId);
            return user;
        }

        private Users AuthenticateUserWithGoogle(String googleId)
        {
            DaoUser daoUser = new DaoUser(bookingServicesContext);
            Users user = daoUser.SignInWithGoogle(googleId);
            return user;
        }

        [HttpPost]
        public ReturnObject delete([FromBody] Delete data)
        {
            ReturnObject obj = new ReturnObject();
            DaoUser daoUser = new DaoUser(bookingServicesContext);
            try
            {
                var response = daoUser.Delete(data.Ids);
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


        [HttpPost]
        public ReturnObject GetPermission([FromBody] Users entity)
        {
            ReturnObject obj = new ReturnObject();
            DaoUser daoUser = new DaoUser(bookingServicesContext);
            try
            {
                var data = daoUser.getPermission(entity);
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

    }
}
