
import { useEffect, useState } from 'react';
import { User } from '../models/User';
import { AuthService } from '../services/AuthService';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onLogout: () => void;
}

const Header = ({ onLogout }: HeaderProps) => {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    // Get user from storage
    const storedUser = AuthService.getUserFromStorage();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  
  return (
    <header className="bg-farm-green text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
            <path d="M12 3v6" />
          </svg>
          <h1 className="text-xl font-bold">Animal Haven System</h1>
        </div>
        
        {user && (
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="opacity-80">Welcome,</span> {user.name} 
              <span className="ml-2 bg-white text-farm-green text-xs px-2 py-0.5 rounded-full">
                {user.role}
              </span>
            </div>
            <Button 
              variant="outline" 
              onClick={onLogout} 
              className="bg-white/10 hover:bg-white/20 border-white/20"
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
