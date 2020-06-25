using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingServices.Models;
using TWG_SSM.Dao;

namespace BookingServices.Dao
{
    public class DaoPermission : DaoBase
    {
        public DaoPermission(BookingServicesContext _context) : base(_context) { }

        public object GetAll(int pageIndex, int pageSize, string title)
        {
            var data = context.Permission.Where(p => p.PositionName.Contains(title == null ? "" : title)).ToList();
            var result = data.Skip((pageIndex - 1) * pageSize).Take(pageSize).AsEnumerable().ToList();
            var total = data.Count();
            return new {
                Data = result,
                PageIndex = pageIndex,
                Total = total
            };
        }

        public Permission Create(Permission entity)
        {
            entity.Id = GenerateIdPermission();
            context.Permission.Add(entity);
            context.SaveChanges();
            var result = getById(entity.Id);
            return result;
        }

        public Permission getById(string Id)
        {
            return context.Permission.Where(p => p.Id.Equals(Id)).FirstOrDefault();
        }

        public Permission Update(Permission entity)
        {
            context.Permission.Update(entity);
            context.SaveChanges();
            var result = getById(entity.Id);
            return result;
        }

        public string GenerateIdPermission()
        {
            var Id = context.Permission
                .Where(p => p.Id.StartsWith("PE_"))
                .Max(p => p.Id);
            if (!string.IsNullOrEmpty(Id))
            {
                int value = int.Parse(Id.Substring(3)) + 1;
                return "PE_" + value.ToString("D4");
            }
            else
            {
                return "PE_" + "0001";
            }
        }

        //public object Delete(List<String> data)
        //{
        //    var DeletedItem = 0;
        //    for (int i = 0; i < data.Count; i++)
        //    {
        //        var exist = getById(data[i]);
        //        if (exist != null)
        //        {
        //            exist.IsDelete = true;
        //            context.Event.Update(exist);
        //            context.SaveChanges();
        //            DeletedItem += 1;
        //        }
        //    }
        //    return new
        //    {
        //        Deleted = DeletedItem,
        //    };
        //}
    }
}
