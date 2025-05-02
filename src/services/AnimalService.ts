
import { Animal, initialAnimals } from '../models/Animal';
import { AnimalNotFoundException, InvalidInputException } from '../utils/exceptions';

// Interface for animal management
export interface IManagement {
  addAnimal(animal: Omit<Animal, 'id' | 'dateAdded'>): Animal;
  removeAnimal(id: string): void;
  listAnimals(): Animal[];
}

// Animal management service that implements IManagement
export class AnimalService implements IManagement {
  private animals: Animal[] = [];
  private readonly storageKey = 'farm_animals';
  
  constructor() {
    // Initialize from localStorage or use initial data
    const storedAnimals = localStorage.getItem(this.storageKey);
    this.animals = storedAnimals ? JSON.parse(storedAnimals) : initialAnimals;
  }
  
  // Save to localStorage
  private saveToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.animals));
  }
  
  // Add a new animal
  addAnimal(animalData: Omit<Animal, 'id' | 'dateAdded'>): Animal {
    // Validate input
    if (!animalData.name || animalData.name.trim() === '') {
      throw new InvalidInputException('Animal name cannot be empty');
    }
    
    if (isNaN(animalData.age) || animalData.age <= 0) {
      throw new InvalidInputException('Animal age must be a positive number');
    }
    
    if (!animalData.species || animalData.species.trim() === '') {
      throw new InvalidInputException('Animal species cannot be empty');
    }
    
    // Create new animal with generated ID
    const newAnimal: Animal = {
      ...animalData,
      id: Date.now().toString(),
      dateAdded: new Date().toISOString()
    };
    
    this.animals.push(newAnimal);
    this.saveToStorage();
    
    return newAnimal;
  }
  
  // Remove an animal by ID
  removeAnimal(id: string): void {
    const initialLength = this.animals.length;
    this.animals = this.animals.filter(animal => animal.id !== id);
    
    // If no animal was removed, throw exception
    if (this.animals.length === initialLength) {
      throw new AnimalNotFoundException(id);
    }
    
    this.saveToStorage();
  }
  
  // List all animals
  listAnimals(): Animal[] {
    return [...this.animals];
  }
  
  // Get animal by ID
  getAnimalById(id: string): Animal {
    const animal = this.animals.find(a => a.id === id);
    if (!animal) {
      throw new AnimalNotFoundException(id);
    }
    return animal;
  }
  
  // Update animal details
  updateAnimal(id: string, updates: Partial<Omit<Animal, 'id' | 'dateAdded'>>): Animal {
    const animalIndex = this.animals.findIndex(a => a.id === id);
    
    if (animalIndex === -1) {
      throw new AnimalNotFoundException(id);
    }
    
    // Validate updates
    if (updates.name !== undefined && updates.name.trim() === '') {
      throw new InvalidInputException('Animal name cannot be empty');
    }
    
    if (updates.age !== undefined && (isNaN(updates.age) || updates.age <= 0)) {
      throw new InvalidInputException('Animal age must be a positive number');
    }
    
    if (updates.species !== undefined && updates.species.trim() === '') {
      throw new InvalidInputException('Animal species cannot be empty');
    }
    
    // Apply updates
    this.animals[animalIndex] = {
      ...this.animals[animalIndex],
      ...updates
    };
    
    this.saveToStorage();
    return this.animals[animalIndex];
  }
}

// Create and export a singleton instance
export const animalService = new AnimalService();
