using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BookingServices.Models;
using TWG_SSM.Dao;

namespace BookingServices.Dao
{
    public class DaoEvent : DaoBase
    {
        public DaoEvent(BookingServicesContext _context) : base(_context) { }

        public object GetAll(int pageIndex, int pageSize, string title, bool isPublish)
        {
            var data = context.Event.Where(p => p.Title.Contains(title == null ? "" : title) && (p.IsDelete == false || p.IsDelete == null)).ToList();
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

        public object GetAllEventPage(int pageSize)
        {
            var ListAll = context.Event.ToList();
            var currentDay = DateTime.Now.ToString("dd-MM-yyyy");
            currentDay = string.Join('/', currentDay.Split('-').ToArray().Reverse());
            var SuKienNoiBat = ListAll.Where(p => p.IsHighlight == true).Take(3).AsEnumerable().ToList();
            var SuKienDinhKy = ListAll.Where(p => p.PeriodicType != null).Take(3).AsEnumerable().ToList();
            var SuKienSapToi = ListAll.Where(p => p.StartDate != null && string.Compare(string.Join('/', p.StartDate.Split('-').ToArray().Reverse()), currentDay) >= 0).Take(3).AsEnumerable().ToList();
            var SuKienDaQua = ListAll.Where(p => p.StartDate != null &&  string.Compare(string.Join('/', p.StartDate.Split('-').ToArray().Reverse()), currentDay) < 0).Take(3).AsEnumerable().ToList();
            return new
            {
                SuKienNoiBat = SuKienNoiBat,
                SuKienDinhKy = SuKienDinhKy,
                SuKienSapToi = SuKienSapToi,
                SuKienDaQua = SuKienDaQua
            };
        }

        public object GetByGroup(string inGroup, int pageSize)
        {
            var ListAll = context.Event.ToList();
            var currentDay = DateTime.Now.ToString("dd-MM-yyyy");
            currentDay = string.Join('/', currentDay.Split('-').ToArray().Reverse());
            List<Event> data = new List<Event>();
            switch (inGroup)
            {
                case "SuKienNoiBat":
                    data = ListAll.Where(p => p.IsHighlight == true).Take(3 * pageSize).AsEnumerable().ToList();
                    break;
                case "SuKienDinhKy":
                    data = ListAll.Where(p => p.PeriodicType != null).Take(3 * pageSize).AsEnumerable().ToList();
                    break;
                case "SuKienSapToi":
                    data = ListAll.Where(p => p.StartDate != null && string.Compare(string.Join('/', p.StartDate.Split('-').ToArray().Reverse()), currentDay) >= 0).Take(3 * pageSize).AsEnumerable().ToList();
                    break;
                case "SuKienDaQua":
                    data = ListAll.Where(p => p.StartDate != null && string.Compare(string.Join('/', p.StartDate.Split('-').ToArray().Reverse()), currentDay) < 0).Take(3 * pageSize).AsEnumerable().ToList();
                    break;
            }
            var total = data.Count();
            return new
            {
                data = data,
                total = total
            };
        }

        public Event Create(Event entity)
        {
            entity.Id = GenerateIdEvent();
            entity.CreatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
            entity.UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
            context.Event.Add(entity);
            context.SaveChanges();
            var result = getById(entity.Id);
            return result;
        }

        public Event getById(string Id)
        {
            return context.Event.Where(p => p.Id.Equals(Id)).FirstOrDefault();
        }

        public Event Update(Event entity)
        {
            entity.UpdatedAt = DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
            context.Event.Update(entity);
            context.SaveChanges();
            var result = getById(entity.Id);
            return result;
        }

        public string GenerateIdEvent()
        {
            var Id = context.Event
                .Where(p => p.Id.StartsWith("EV_"))
                .Max(p => p.Id);
            if (!string.IsNullOrEmpty(Id))
            {
                int value = int.Parse(Id.Substring(3)) + 1;
                return "EV_" + value.ToString("D4");
            }
            else
            {
                return "EV_" + "0001";
            }
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
                    context.Event.Update(exist);
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
