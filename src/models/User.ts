
// User model
export enum UserRole {
  Admin = 'admin',
  Farmer = 'farmer'
}

export interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  age: number;
  role: UserRole;
}

// Predefined users
export const predefinedUsers: User[] = [
  {
    id: 1,
    name: 'Admin User',
    username: 'admin',
    password: 'admin123',
    age: 35,
    role: UserRole.Admin
  },
  {
    id: 2,
    name: 'Farmer Jones',
    username: 'farmer1',
    password: 'farmer123',
    age: 42,
    role: UserRole.Farmer
  }
];
