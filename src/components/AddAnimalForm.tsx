
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Animal } from '../models/Animal';
import { animalService } from '../services/AnimalService';
import { useToast } from '@/components/ui/use-toast';
import { InvalidInputException } from '../utils/exceptions';

interface AddAnimalFormProps {
  onAnimalAdded: (animal: Animal) => void;
}

const AddAnimalForm = ({ onAnimalAdded }: AddAnimalFormProps) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [species, setSpecies] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create new animal
      const newAnimal = animalService.addAnimal({
        name,
        age: parseInt(age, 10),
        species,
        description: description.trim() ? description : undefined
      });
      
      // Reset form
      setName('');
      setAge('');
      setSpecies('');
      setDescription('');
      
      // Show success message
      toast({
        title: 'Animal added',
        description: `${newAnimal.name} has been added to the farm`,
      });
      
      // Notify parent component
      onAnimalAdded(newAnimal);
    } catch (error) {
      if (error instanceof InvalidInputException) {
        toast({
          title: 'Invalid input',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'An unknown error occurred',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Animal</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="add-animal-form" onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Animal name"
                disabled={isSubmitting}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                min="0"
                step="1"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Animal age"
                disabled={isSubmitting}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="species">Species</Label>
            <Input
              id="species"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              placeholder="Animal species (e.g., Cow, Pig, Chicken)"
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description..."
              disabled={isSubmitting}
              className="resize-none h-20"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          type="submit"
          form="add-animal-form"
          className="w-full bg-farm-green hover:bg-farm-green/90"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Animal'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddAnimalForm;
