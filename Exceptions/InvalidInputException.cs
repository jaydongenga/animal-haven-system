
using System;

namespace FarmManagementSystem
{
    /// <summary>
    /// Custom exception for invalid input
    /// </summary>
    public class InvalidInputException : Exception
    {
        public InvalidInputException() : base("Invalid input provided")
        {
        }
        
        public InvalidInputException(string message) : base(message)
        {
        }
    }
}
