
using System;

namespace FarmManagementSystem
{
    /// <summary>
    /// Custom exception for when an animal is not found
    /// </summary>
    public class AnimalNotFoundException : Exception
    {
        public AnimalNotFoundException(string animalId) 
            : base($"Animal with ID {animalId} not found")
        {
        }
    }
}
