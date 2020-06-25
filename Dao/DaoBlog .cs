using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingServices.Models;
using TWG_SSM.Dao;

namespace BookingServices.Dao
{
    public class DaoBlog: DaoBase
    {
        public DaoBlog(BookingServicesContext _context) : base(_context) { }

        public object GetAll(int pageIndex, int pageSize, string title, bool isPublish)
        {
            var data = context.Blog.Where(p=> p.Title.Contains(title == null ? "" : title) && (p.IsDelete == false || p.IsDelete == null)).ToList();
            if (isPublish == true || isPublish == false)
            {
                data = data.Where(p => p.IsPublish == isPublish).ToList();
            }
            var result = data.Skip((pageIndex - 1) * pageSize).Take(pageSize).AsEnumerable().ToList();
            var total = data.Count();
            return new {
                Data = result,
                PageIndex = pageIndex,
                Total = total
            };
        }

        public object GetAllBlogPage(int pageSize)
        {
            var NuoiDayCon = context.Blog.Where(p=>p.InGroup.Contains("NuoiDayCon")).Take(3).AsEnumerable().ToList();
            var ChamSocCon = context.Blog.Where(p => p.InGroup.Contains("ChamSocCon")).Take(3).AsEnumerable().ToList();
            var ChoiCungCon = context.Blog.Where(p => p.InGroup.Contains("ChoiCungCon")).Take(3).AsEnumerable().ToList();
            var LifeStyle = context.Blog.Where(p => p.InGroup.Contains("LifeStyle")).Take(3).AsEnumerable().ToList();
            return new
            {
                NuoiDayCon = NuoiDayCon,
                ChamSocCon = ChamSocCon,
                ChoiCungCon = ChoiCungCon,
                LifeStyle = LifeStyle
            };
        }

        public object GetByGroup(string inGroup, int pageSize)
        {
            var data = context.Blog.Where(p=>p.InGroup.Contains(inGroup)).Take(3*pageSize).AsEnumerable().ToList();
            var total = data.Count();
            return new
            {
                data = data,
                total = total
            };
        }

        public Blog Create(Blog entity)
        {
            entity.Id = GenerateIdBlog();
            entity.CreatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
            entity.UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
            context.Blog.Add(entity);
            context.SaveChanges();
            var result = getById(entity.Id);
            return result;
        }

        public Blog getById(string Id)
        {
            return context.Blog.Where(p => p.Id.Equals(Id)).FirstOrDefault();
        }

        public Blog Update(Blog entity)
        {
            entity.UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
            context.Blog.Update(entity);
            context.SaveChanges();
            var result = getById(entity.Id);
            return result;
        }

        public string GenerateIdBlog()
        {
            var Id = context.Blog
                .Where(p => p.Id.StartsWith("BL_"))
                .Max(p => p.Id);
            if (!string.IsNullOrEmpty(Id))
            {
                int value = int.Parse(Id.Substring(3)) + 1;
                return "BL_" + value.ToString("D4");
            }
            else
            {
                return "BL_" + "0001";
            }
        }

        public object Delete(List<String> data)
        {
            var DeletedItem = 0;
            for (int i = 0; i < data.Count; i++)
            {
                var exist = getById(data[i]);
                if(exist != null)
                {
                    exist.IsDelete = true;
                    context.Blog.Update(exist);
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
