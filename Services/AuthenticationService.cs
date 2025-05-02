
using System;
using System.Collections.Generic;

namespace FarmManagementSystem
{
    /// <summary>
    /// Service to handle authentication
    /// </summary>
    public class AuthenticationService : IAccount
    {
        private List<Person> _users;
        
        public AuthenticationService()
        {
            // Initialize predefined users
            _users = new List<Person>
            {
                new Admin(1, "Admin User", 35, "admin", "admin123"),
                new Farmer(2, "Farmer Jones", 42, "farmer1", "farmer123")
            };
        }
        
        public Person Login(string username, string password)
        {
            // Check if username and password are provided
            if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            {
                throw new InvalidLoginException("Username and password are required");
            }
            
            // Find user with matching credentials
            Person user = _users.Find(u => u.Username == username && u.Password == password);
            
            // If no user found, throw exception
            if (user == null)
            {
                throw new InvalidLoginException();
            }
            
            return user;
        }
    }
}
