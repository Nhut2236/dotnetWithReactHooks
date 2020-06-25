using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingServices.Models;
using TWG_SSM.Dao;

namespace BookingServices.Dao
{
    public class DaoUser : DaoBase
    {
        public DaoUser(BookingServicesContext _context) : base(_context) { }

        public Users SignUp(Users entity)
        {
            entity.Id = GenerateIdUser();
            try
            {
                entity.CreatedBy = "Hệ Thống";
                entity.UpdatedBy = "Hệ Thống";
                entity.CreatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                entity.UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                context.Users.Add(entity);
                context.SaveChanges();
                var result = getById(entity.Id);
                return result;
            }
            catch(Exception e)
            {
                var result = getById(entity.Id);
                return result;
            }


        }

        public Boolean CheckUserFBExist(string facebookId)
        {
            var exist = context.Users.Where(p => p.FacebookId.Equals(facebookId)).FirstOrDefault();
            if (exist != null)
                return true;
            else
                return false;
        }

        public Boolean CheckUserGoogleExist(string googleId)
        {
            var exist = context.Users.Where(p => p.GoogleId.Equals(googleId)).FirstOrDefault();
            if (exist != null)
                return true;
            else
                return false;
        }

        public Users getById(string Id)
        {
            return context.Users.Where(p => p.Id.Equals(Id)).FirstOrDefault();
        }

        public Permission getPermission(Users entity)
        {
            return context.Permission.Where(p => p.Id.Equals(entity.Permission)).FirstOrDefault();
        }

        public Users Update(Users entity)
        {
            entity.UpdatedBy = "Hệ Thống";
            entity.UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
            context.Users.Update(entity);
            context.SaveChanges();
            var result = getById(entity.Id);
            return result;
        }

        public string GenerateIdUser()
        {
            var Id = context.Users
                .Where(p => p.Id.StartsWith("US_"))
                .Max(p => p.Id);
            if (!string.IsNullOrEmpty(Id))
            {
                int value = int.Parse(Id.Substring(3)) + 1;
                return "US_" + value.ToString("D4");
            }
            else
            {
                return "US_" + "0001";
            }
        }

        public Users SignIn(string userName, string password)
        {
            return context.Users.Where(p => p.UserName.Equals(userName) && p.Password.Equals(password)).FirstOrDefault();
        }

        public Users SignInWithFacebook(string facebookId)
        {
            return context.Users.Where(p => p.FacebookId.Equals(facebookId)).FirstOrDefault();
        }

        public Users SignInWithGoogle(string googleId)
        {
            return context.Users.Where(p => p.GoogleId.Equals(googleId)).FirstOrDefault();
        }

        public object GetAll(int pageIndex, int pageSize)
        {
            var data = context.Users.Where(p => p.IsDelete == false || p.IsDelete == null).ToList();
            var result = data.Skip((pageIndex - 1) * pageSize).Take(pageSize).AsEnumerable().ToList();
            var total = data.Count();
            return new
            {
                Data = result,
                PageIndex = pageIndex,
                Total = total
            };
        }

        public object Delete(List<String> data)
        {
            var DeletedItem = 0;
            for (int i = 0; i < data.Count; i++)
            {
                var exist = getById(data[i]);
                if (exist != null)
                {
                    exist.IsDelete = true;
                    context.Users.Update(exist);
                    context.SaveChanges();
                    DeletedItem += 1;
                }
            }
            return new
            {
                Deleted = DeletedItem,
            };
        }
    }
}
