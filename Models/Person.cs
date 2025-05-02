
using System;

namespace FarmManagementSystem
{
    /// <summary>
    /// Abstract base class for all person types
    /// </summary>
    public abstract class Person
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        
        public override string ToString()
        {
            return $"{Name} (ID: {Id})";
        }
    }
}
