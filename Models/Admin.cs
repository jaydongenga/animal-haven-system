
using System;

namespace FarmManagementSystem
{
    /// <summary>
    /// Admin class that inherits from Person
    /// Has full access to animal management
    /// </summary>
    public class Admin : Person
    {
        public Admin(int id, string name, int age, string username, string password)
        {
            Id = id;
            Name = name;
            Age = age;
            Username = username;
            Password = password;
        }
        
        public override string ToString()
        {
            return $"Admin: {base.ToString()}";
        }
    }
}
