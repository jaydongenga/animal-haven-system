
// Animal model
export interface Animal {
  id: string;
  name: string;
  age: number;
  species: string;
  description?: string;
  dateAdded: string;
}

// Initial animals data
export const initialAnimals: Animal[] = [
  {
    id: '1',
    name: 'Bessie',
    age: 5,
    species: 'Cow',
    description: 'A friendly dairy cow with black and white spots',
    dateAdded: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Wilbur',
    age: 2,
    species: 'Pig',
    description: 'A clever and friendly pig',
    dateAdded: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Clucky',
    age: 1,
    species: 'Chicken',
    description: 'A reliable egg-laying hen',
    dateAdded: new Date().toISOString()
  }
];
