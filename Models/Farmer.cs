
using System;

namespace FarmManagementSystem
{
    /// <summary>
    /// Farmer class that inherits from Person
    /// Has limited access (view only) to animal management
    /// </summary>
    public class Farmer : Person
    {
        public Farmer(int id, string name, int age, string username, string password)
        {
            Id = id;
            Name = name;
            Age = age;
            Username = username;
            Password = password;
        }
        
        public override string ToString()
        {
            return $"Farmer: {base.ToString()}";
        }
    }
}
