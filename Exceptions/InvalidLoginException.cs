
using System;

namespace FarmManagementSystem
{
    /// <summary>
    /// Custom exception for invalid login attempts
    /// </summary>
    public class InvalidLoginException : Exception
    {
        public InvalidLoginException() : base("Invalid username or password")
        {
        }
        
        public InvalidLoginException(string message) : base(message)
        {
        }
    }
}
