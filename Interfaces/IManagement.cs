
using System;
using System.Collections.Generic;

namespace FarmManagementSystem
{
    /// <summary>
    /// Interface for animal management operations
    /// </summary>
    public interface IManagement
    {
        void AddAnimal(Animal animal);
        void RemoveAnimal(string id);
        List<Animal> ListAnimals();
        Animal GetAnimalById(string id);
        void UpdateAnimal(string id, Animal updatedAnimal);
    }
}
