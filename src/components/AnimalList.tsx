
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Animal } from '../models/Animal';
import { UserRole } from '../models/User';
import { animalService } from '../services/AnimalService';
import AnimalCard from './AnimalCard';
import { useToast } from '@/components/ui/use-toast';
import { AnimalNotFoundException } from '../utils/exceptions';

interface AnimalListProps {
  userRole: UserRole;
}

const AnimalList = ({ userRole }: AnimalListProps) => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [filteredAnimals, setFilteredAnimals] = useState<Animal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  
  // Load animals
  useEffect(() => {
    const loadedAnimals = animalService.listAnimals();
    setAnimals(loadedAnimals);
    setFilteredAnimals(loadedAnimals);
  }, []);
  
  // Filter animals when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredAnimals(animals);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = animals.filter(animal => 
      animal.name.toLowerCase().includes(term) ||
      animal.species.toLowerCase().includes(term) ||
      animal.description?.toLowerCase().includes(term)
    );
    
    setFilteredAnimals(filtered);
  }, [searchTerm, animals]);
  
  // Handle animal removal
  const handleRemove = (id: string) => {
    try {
      animalService.removeAnimal(id);
      setAnimals(prev => prev.filter(animal => animal.id !== id));
      
      toast({
        title: 'Animal removed',
        description: 'The animal has been removed successfully',
      });
    } catch (error) {
      if (error instanceof AnimalNotFoundException) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: 'Failed to remove animal',
          variant: 'destructive',
        });
      }
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <Input
          placeholder="Search animals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="ml-auto text-sm text-muted-foreground">
          Showing {filteredAnimals.length} animals
        </div>
      </div>
      
      {filteredAnimals.length === 0 ? (
        <div className="text-center py-8 border rounded-lg bg-muted/20">
          <p className="text-muted-foreground">
            {searchTerm ? 'No animals match your search' : 'No animals to display'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAnimals.map(animal => (
            <AnimalCard
              key={animal.id}
              animal={animal}
              userRole={userRole}
              onRemove={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimalList;
