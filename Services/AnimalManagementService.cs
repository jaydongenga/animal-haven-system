
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;

namespace FarmManagementSystem
{
    /// <summary>
    /// Service to handle animal management operations
    /// </summary>
    public class AnimalManagementService : IManagement
    {
        private List<Animal> _animals;
        private readonly string _filePath = "animals.json";
        
        public AnimalManagementService()
        {
            LoadAnimals();
        }
        
        // Load animals from file
        private void LoadAnimals()
        {
            try
            {
                if (File.Exists(_filePath))
                {
                    string json = File.ReadAllText(_filePath);
                    _animals = JsonSerializer.Deserialize<List<Animal>>(json);
                }
                else
                {
                    // Initialize with sample data if file doesn't exist
                    _animals = new List<Animal>
                    {
                        new Animal
                        {
                            Id = "1",
                            Name = "Bessie",
                            Age = 5,
                            Species = "Cow",
                            Description = "A friendly dairy cow with black and white spots",
                            DateAdded = DateTime.Now
                        },
                        new Animal
                        {
                            Id = "2",
                            Name = "Wilbur",
                            Age = 2,
                            Species = "Pig",
                            Description = "A clever and friendly pig",
                            DateAdded = DateTime.Now
                        },
                        new Animal
                        {
                            Id = "3",
                            Name = "Clucky",
                            Age = 1,
                            Species = "Chicken",
                            Description = "A reliable egg-laying hen",
                            DateAdded = DateTime.Now
                        }
                    };
                    
                    SaveAnimals();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading animals: {ex.Message}");
                _animals = new List<Animal>();
            }
        }
        
        // Save animals to file
        private void SaveAnimals()
        {
            try
            {
                string json = JsonSerializer.Serialize(_animals, new JsonSerializerOptions { WriteIndented = true });
                File.WriteAllText(_filePath, json);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error saving animals: {ex.Message}");
            }
        }
        
        public void AddAnimal(Animal animal)
        {
            // Validate input
            if (string.IsNullOrWhiteSpace(animal.Name))
                throw new InvalidInputException("Animal name cannot be empty");
                
            if (animal.Age <= 0)
                throw new InvalidInputException("Animal age must be a positive number");
                
            if (string.IsNullOrWhiteSpace(animal.Species))
                throw new InvalidInputException("Animal species cannot be empty");
            
            // Add animal and save
            _animals.Add(animal);
            SaveAnimals();
        }
        
        public void RemoveAnimal(string id)
        {
            int initialCount = _animals.Count;
            _animals = _animals.Where(a => a.Id != id).ToList();
            
            if (_animals.Count == initialCount)
                throw new AnimalNotFoundException(id);
                
            SaveAnimals();
        }
        
        public List<Animal> ListAnimals()
        {
            return _animals.ToList(); // Return a copy of the list
        }
        
        public Animal GetAnimalById(string id)
        {
            Animal animal = _animals.FirstOrDefault(a => a.Id == id);
            
            if (animal == null)
                throw new AnimalNotFoundException(id);
                
            return animal;
        }
        
        public void UpdateAnimal(string id, Animal updatedAnimal)
        {
            int index = _animals.FindIndex(a => a.Id == id);
            
            if (index == -1)
                throw new AnimalNotFoundException(id);
                
            // Validate updated data
            if (string.IsNullOrWhiteSpace(updatedAnimal.Name))
                throw new InvalidInputException("Animal name cannot be empty");
                
            if (updatedAnimal.Age <= 0)
                throw new InvalidInputException("Animal age must be a positive number");
                
            if (string.IsNullOrWhiteSpace(updatedAnimal.Species))
                throw new InvalidInputException("Animal species cannot be empty");
            
            // Update animal
            _animals[index] = updatedAnimal;
            SaveAnimals();
        }
    }
}
