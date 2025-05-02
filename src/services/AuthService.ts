
import { User, predefinedUsers, UserRole } from '../models/User';
import { InvalidLoginException } from '../utils/exceptions';

// Interface for login functionality
export interface IAccount {
  login(username: string, password: string): User;
}

// Authentication service that implements IAccount
export class AuthService implements IAccount {
  private currentUser: User | null = null;
  
  login(username: string, password: string): User {
    // Find user with matching credentials
    const user = predefinedUsers.find(
      u => u.username === username && u.password === password
    );
    
    // Throw exception if user not found
    if (!user) {
      throw new InvalidLoginException();
    }
    
    this.currentUser = user;
    return user;
  }
  
  logout(): void {
    this.currentUser = null;
  }
  
  getCurrentUser(): User | null {
    return this.currentUser;
  }
  
  isAdmin(): boolean {
    return this.currentUser?.role === UserRole.Admin;
  }
  
  // Static method to get stored user from localStorage
  static getUserFromStorage(): User | null {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  }
  
  // Static method to save user to storage
  static saveUserToStorage(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
  
  // Static method to remove user from storage
  static removeUserFromStorage(): void {
    localStorage.removeItem('currentUser');
  }
}

// Create and export a singleton instance
export const authService = new AuthService();
