
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Json;

namespace FarmManagementSystem
{
    class Program
    {
        static void Main(string[] args)
        {
            // Set console title and colors
            Console.Title = "Animal Haven Farm Management System";
            Console.ForegroundColor = ConsoleColor.DarkGreen;
            Console.WriteLine("====================================");
            Console.WriteLine("  ANIMAL HAVEN FARM MANAGEMENT SYSTEM  ");
            Console.WriteLine("====================================");
            Console.ResetColor();
            
            // Initialize the authentication service
            AuthenticationService authService = new AuthenticationService();
            
            // Initialize the animal management service
            AnimalManagementService animalService = new AnimalManagementService();
            
            // Attempt login
            Person currentUser = null;
            bool loggedIn = false;
            
            while (!loggedIn)
            {
                try
                {
                    Console.WriteLine("\nPlease login to continue:");
                    Console.Write("Username: ");
                    string username = Console.ReadLine();
                    
                    Console.Write("Password: ");
                    string password = ReadPassword();
                    
                    currentUser = authService.Login(username, password);
                    loggedIn = true;
                    
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine($"\nLogin successful! Welcome, {currentUser.Name}!");
                    Console.ResetColor();
                }
                catch (InvalidLoginException ex)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"\nError: {ex.Message}");
                    Console.ResetColor();
                }
                catch (Exception ex)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine($"\nUnexpected error: {ex.Message}");
                    Console.ResetColor();
                }
            }
            
            // Display the main menu based on user role
            DisplayMenu(currentUser, animalService);
            
            Console.WriteLine("\nThank you for using Animal Haven Farm Management System!");
            Console.Write("Press any key to exit...");
            Console.ReadKey();
        }
        
        static void DisplayMenu(Person user, AnimalManagementService animalService)
        {
            bool exitRequested = false;
            
            while (!exitRequested)
            {
                Console.WriteLine("\n=== MAIN MENU ===");
                Console.WriteLine("1. View all animals");
                
                // Admin-specific options
                if (user is Admin)
                {
                    Console.WriteLine("2. Add new animal");
                    Console.WriteLine("3. Remove animal");
                    Console.WriteLine("4. Update animal details");
                }
                
                Console.WriteLine("0. Exit");
                Console.Write("\nSelect an option: ");
                
                string input = Console.ReadLine();
                
                try
                {
                    switch (input)
                    {
                        case "1":
                            ViewAllAnimals(animalService);
                            break;
                        case "2":
                            if (user is Admin)
                                AddNewAnimal(animalService);
                            else
                                DisplayInvalidOption();
                            break;
                        case "3":
                            if (user is Admin)
                                RemoveAnimal(animalService);
                            else
                                DisplayInvalidOption();
                            break;
                        case "4":
                            if (user is Admin)
                                UpdateAnimalDetails(animalService);
                            else
                                DisplayInvalidOption();
                            break;
                        case "0":
                            exitRequested = true;
                            break;
                        default:
                            DisplayInvalidOption();
                            break;
                    }
                }
                catch (AnimalNotFoundException ex)
                {
                    DisplayError(ex.Message);
                }
                catch (InvalidInputException ex)
                {
                    DisplayError(ex.Message);
                }
                catch (Exception ex)
                {
                    DisplayError($"Unexpected error: {ex.Message}");
                }
            }
        }
        
        static void ViewAllAnimals(AnimalManagementService animalService)
        {
            Console.Clear();
            Console.WriteLine("=== ANIMAL LIST ===");
            
            List<Animal> animals = animalService.ListAnimals();
            
            if (animals.Count == 0)
            {
                Console.WriteLine("No animals found in the farm.");
                WaitForKeyPress();
                return;
            }
            
            Console.WriteLine($"Total animals: {animals.Count}\n");
            Console.WriteLine("{0,-5} {1,-15} {2,-10} {3,-15} {4,-30}", "ID", "Name", "Age", "Species", "Description");
            Console.WriteLine(new string('-', 80));
            
            foreach (var animal in animals)
            {
                Console.WriteLine("{0,-5} {1,-15} {2,-10} {3,-15} {4,-30}",
                    animal.Id,
                    animal.Name,
                    $"{animal.Age} years",
                    animal.Species,
                    animal.Description ?? "N/A");
            }
            
            WaitForKeyPress();
        }
        
        static void AddNewAnimal(AnimalManagementService animalService)
        {
            Console.Clear();
            Console.WriteLine("=== ADD NEW ANIMAL ===");
            
            string name = GetValidatedInput("Name: ", s => !string.IsNullOrWhiteSpace(s),
                "Name cannot be empty.");
            
            int age = GetValidatedIntInput("Age (years): ", n => n > 0,
                "Age must be a positive number.");
            
            string species = GetValidatedInput("Species: ", s => !string.IsNullOrWhiteSpace(s),
                "Species cannot be empty.");
            
            Console.Write("Description (optional): ");
            string description = Console.ReadLine();
            
            Animal newAnimal = new Animal
            {
                Id = Guid.NewGuid().ToString().Substring(0, 8),
                Name = name,
                Age = age,
                Species = species,
                Description = !string.IsNullOrWhiteSpace(description) ? description : null,
                DateAdded = DateTime.Now
            };
            
            animalService.AddAnimal(newAnimal);
            
            Console.ForegroundColor = ConsoleColor.Green;
            Console.WriteLine($"\nAnimal '{name}' added successfully with ID: {newAnimal.Id}");
            Console.ResetColor();
            
            WaitForKeyPress();
        }
        
        static void RemoveAnimal(AnimalManagementService animalService)
        {
            Console.Clear();
            Console.WriteLine("=== REMOVE ANIMAL ===");
            
            ViewAllAnimals(animalService);
            
            string id = GetValidatedInput("\nEnter animal ID to remove: ", s => !string.IsNullOrWhiteSpace(s), 
                "ID cannot be empty.");
            
            Console.Write($"Are you sure you want to remove the animal with ID {id}? (y/n): ");
            if (Console.ReadLine().ToLower() != "y")
            {
                Console.WriteLine("Operation cancelled.");
                WaitForKeyPress();
                return;
            }
            
            animalService.RemoveAnimal(id);
            
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"Animal with ID {id} has been removed successfully.");
            Console.ResetColor();
            
            WaitForKeyPress();
        }
        
        static void UpdateAnimalDetails(AnimalManagementService animalService)
        {
            Console.Clear();
            Console.WriteLine("=== UPDATE ANIMAL DETAILS ===");
            
            ViewAllAnimals(animalService);
            
            string id = GetValidatedInput("\nEnter animal ID to update: ", s => !string.IsNullOrWhiteSpace(s), 
                "ID cannot be empty.");
            
            try
            {
                Animal animal = animalService.GetAnimalById(id);
                
                Console.WriteLine($"\nUpdating details for: {animal.Name} (ID: {animal.Id})");
                Console.WriteLine("Leave fields blank to keep current values.\n");
                
                Console.Write($"Name [{animal.Name}]: ");
                string name = Console.ReadLine();
                
                Console.Write($"Age [{animal.Age}]: ");
                string ageInput = Console.ReadLine();
                
                Console.Write($"Species [{animal.Species}]: ");
                string species = Console.ReadLine();
                
                Console.Write($"Description [{animal.Description ?? "N/A"}]: ");
                string description = Console.ReadLine();
                
                Animal updatedAnimal = new Animal
                {
                    Id = animal.Id,
                    Name = !string.IsNullOrWhiteSpace(name) ? name : animal.Name,
                    Age = !string.IsNullOrWhiteSpace(ageInput) && int.TryParse(ageInput, out int parsedAge) && parsedAge > 0 ? parsedAge : animal.Age,
                    Species = !string.IsNullOrWhiteSpace(species) ? species : animal.Species,
                    Description = !string.IsNullOrWhiteSpace(description) ? description : animal.Description,
                    DateAdded = animal.DateAdded
                };
                
                animalService.UpdateAnimal(id, updatedAnimal);
                
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("\nAnimal details updated successfully!");
                Console.ResetColor();
            }
            catch (AnimalNotFoundException ex)
            {
                DisplayError(ex.Message);
            }
            
            WaitForKeyPress();
        }
        
        #region Helper Methods
        
        static string ReadPassword()
        {
            string password = "";
            ConsoleKeyInfo key;
            
            do
            {
                key = Console.ReadKey(true);
                
                if (key.Key != ConsoleKey.Enter && key.Key != ConsoleKey.Backspace)
                {
                    password += key.KeyChar;
                    Console.Write("*");
                }
                else if (key.Key == ConsoleKey.Backspace && password.Length > 0)
                {
                    password = password.Substring(0, password.Length - 1);
                    Console.Write("\b \b");
                }
            } while (key.Key != ConsoleKey.Enter);
            
            Console.WriteLine();
            return password;
        }
        
        static void DisplayInvalidOption()
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("Invalid option. Please try again.");
            Console.ResetColor();
        }
        
        static void DisplayError(string message)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"Error: {message}");
            Console.ResetColor();
        }
        
        static void WaitForKeyPress()
        {
            Console.WriteLine("\nPress any key to continue...");
            Console.ReadKey(true);
        }
        
        static string GetValidatedInput(string prompt, Func<string, bool> validator, string errorMessage)
        {
            string input;
            
            while (true)
            {
                Console.Write(prompt);
                input = Console.ReadLine();
                
                if (validator(input))
                    return input;
                
                DisplayError(errorMessage);
            }
        }
        
        static int GetValidatedIntInput(string prompt, Func<int, bool> validator, string errorMessage)
        {
            int input;
            
            while (true)
            {
                Console.Write(prompt);
                if (int.TryParse(Console.ReadLine(), out input) && validator(input))
                    return input;
                
                DisplayError(errorMessage);
            }
        }
        
        #endregion
    }
}
