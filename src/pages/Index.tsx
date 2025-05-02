
import { useState, useEffect } from 'react';
import { User } from '../models/User';
import LoginForm from '../components/LoginForm';
import Dashboard from '../components/Dashboard';
import Header from '../components/Header';
import { AuthService } from '../services/AuthService';

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Check if user is already logged in
    const storedUser = AuthService.getUserFromStorage();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  
  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
  };
  
  const handleLogout = () => {
    AuthService.removeUserFromStorage();
    setUser(null);
  };
  
  return (
    <div className="min-h-screen bg-accent farm-pattern-bg">
      <Header onLogout={handleLogout} />
      
      <main className="p-4">
        {user ? (
          <Dashboard user={user} />
        ) : (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        )}
      </main>
      
      <footer className="mt-auto py-4 text-center text-sm text-muted-foreground">
        <p>© 2025 Animal Haven Farm Management System</p>
      </footer>
    </div>
  );
};

export default Index;
