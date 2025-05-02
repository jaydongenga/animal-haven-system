
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Animal } from '../models/Animal';
import { UserRole } from '../models/User';

interface AnimalCardProps {
  animal: Animal;
  userRole: UserRole;
  onRemove: (id: string) => void;
}

const getAnimalIcon = (species: string) => {
  const lowerSpecies = species.toLowerCase();
  
  if (lowerSpecies.includes('cow')) {
    return '🐄';
  } else if (lowerSpecies.includes('pig')) {
    return '🐖';
  } else if (lowerSpecies.includes('chicken') || lowerSpecies.includes('hen')) {
    return '🐔';
  } else if (lowerSpecies.includes('sheep')) {
    return '🐑';
  } else if (lowerSpecies.includes('horse')) {
    return '🐎';
  } else if (lowerSpecies.includes('goat')) {
    return '🐐';
  } else {
    return '🦊';
  }
};

const AnimalCard = ({ animal, userRole, onRemove }: AnimalCardProps) => {
  const dateAdded = new Date(animal.dateAdded).toLocaleDateString();
  const isAdmin = userRole === UserRole.Admin;
  
  return (
    <Card className="border-farm-brown/20 hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">
                {getAnimalIcon(animal.species)}
              </span>
              {animal.name}
            </CardTitle>
            <CardDescription>
              {animal.species}, {animal.age} years old
            </CardDescription>
          </div>
          <span className="text-xs bg-muted px-2 py-1 rounded-md">
            ID: {animal.id}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{animal.description || 'No description available'}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-2 text-xs text-muted-foreground">
        <span>Added: {dateAdded}</span>
        {isAdmin && (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-destructive hover:bg-destructive/10 border-destructive/20"
            onClick={() => onRemove(animal.id)}
          >
            Remove
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default AnimalCard;
