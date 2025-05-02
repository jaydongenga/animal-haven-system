
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, UserRole } from '../models/User';
import { Animal } from '../models/Animal';
import { animalService } from '../services/AnimalService';
import AnimalList from './AnimalList';
import AddAnimalForm from './AddAnimalForm';

interface DashboardProps {
  user: User;
}

const Dashboard = ({ user }: DashboardProps) => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [activeTab, setActiveTab] = useState<string>('view');
  const isAdmin = user.role === UserRole.Admin;
  
  // Load animals
  useEffect(() => {
    const loadedAnimals = animalService.listAnimals();
    setAnimals(loadedAnimals);
  }, []);
  
  // Handle new animal added
  const handleAnimalAdded = (newAnimal: Animal) => {
    setAnimals(prev => [...prev, newAnimal]);
    // Switch to view tab after adding
    setActiveTab('view');
  };
  
  return (
    <div className="container mx-auto py-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="view" className="flex-1">
            View Animals
          </TabsTrigger>
          {isAdmin && (
            <TabsTrigger value="add" className="flex-1">
              Add Animal
            </TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="view" className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Farm Animals</h2>
            <AnimalList userRole={user.role} />
          </div>
        </TabsContent>
        
        {isAdmin && (
          <TabsContent value="add" className="space-y-6">
            <div className="max-w-2xl mx-auto">
              <AddAnimalForm onAnimalAdded={handleAnimalAdded} />
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Dashboard;
