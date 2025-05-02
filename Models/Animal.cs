
using System;

namespace FarmManagementSystem
{
    /// <summary>
    /// Model class representing an animal on the farm
    /// </summary>
    public class Animal
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
        public string Species { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        
        public override string ToString()
        {
            return $"{Name} - {Species}, {Age} years old (ID: {Id})";
        }
    }
}
