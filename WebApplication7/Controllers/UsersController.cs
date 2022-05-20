using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Description;
using WebApplication7.Models;

namespace WebApplication7.Controllers
{
    public class UsersController : ApiController
    {
        private BusDBEntities db = new BusDBEntities();

        // GET: api/Users
        public IQueryable<User1> GetUsers()
        {
            return db.User;
        }

        [HttpGet]
        [Route("api/Users/Credentials")]
        public HttpResponseMessage GetCredentialsCheck(string name, string password)
        {
            //var identity = (ClaimsIdentity)User.Identity;
            //var roles = identity.Claims
            //            .Where(c => c.Type == ClaimTypes.Role)
            //            .Select(c => c.Value);

            //String[] details = { identity.Name, roles.ToString() };
            var role="";

            int id;
            using (var db = new BusDBEntities())
            {

                var userStatus = db.User.Any(x => x.name == name && x.password == password);
                
                if (userStatus)
                {
                    role = GetRolesForUser(name);
                }
                else
                {
                    role = "error";
                }
            }
            
            return Request.CreateResponse(HttpStatusCode.OK, role);

        }

        [HttpGet]
        [Route("api/Users/Roles")]
        public String GetRolesForUser(string name)
        {
            using (var context = new BusDBEntities())
            {
                var userRoles = db.User.FirstOrDefault(x=>x.name == name);
                return userRoles.rolename;
            }
        }

        [HttpGet]
        public HttpResponseMessage Post(string name, string password)
        {
            var identity = (ClaimsIdentity)User.Identity;
            var roles = identity.Claims
                        .Where(c => c.Type == ClaimTypes.Role)
                        .Select(c => c.Value);

            //myclass.Role = roles.ToString();
            //myclass.Name = identity.Name;
            String[] details = { roles.ToString(), identity.Name };
            return Request.CreateResponse(HttpStatusCode.Created, details);
        }

        [HttpPost]
        [Route("api/Users/Register")]
        public HttpResponseMessage UserRegistration(User1 user)
        {
            using (var db = new BusDBEntities())
            {
                db.User.Add(user);
                var roledata = db.Roles.FirstOrDefault(x => x.role_id == user.roleid);
                db.SaveChanges();
            }
            return Request.CreateResponse(HttpStatusCode.Created, "Success");
        }
    }
}