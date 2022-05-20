using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication7.Models
{
    public class UserAuthentication : IDisposable
    {
        public bool ValidateUser(string name, string password)
        {
            using (var context = new BusDBEntities())
            {
                var checkUser = context.User.Any(x => x.name == name && x.password == password);
                return checkUser;
            }
        }

        public void Dispose()
        {
            //throw new NotImplementedException();
        }
    }
}