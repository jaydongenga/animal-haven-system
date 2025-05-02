
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { authService } from '../services/AuthService';
import { InvalidLoginException } from '../utils/exceptions';
import { AuthService } from '../services/AuthService';
import { User } from '../models/User';

interface LoginFormProps {
  onLoginSuccess: (user: User) => void;
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate inputs
      if (!username.trim() || !password.trim()) {
        throw new Error('Both username and password are required');
      }
      
      // Attempt login
      const user = authService.login(username, password);
      
      // Save user to storage
      AuthService.saveUserToStorage(user);
      
      // Show success message
      toast({
        title: 'Login successful',
        description: `Welcome back, ${user.name}!`,
      });
      
      // Notify parent component
      onLoginSuccess(user);
    } catch (error) {
      // Handle invalid login
      if (error instanceof InvalidLoginException) {
        toast({
          title: 'Login failed',
          description: error.message,
          variant: 'destructive',
        });
      } else {
        // Handle other errors
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'An unknown error occurred',
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md border-farm-brown/20 shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center text-farm-brown">Welcome to Animal Haven</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the farm management system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
                required
              />
              <p className="text-xs text-muted-foreground">
                Demo: admin (Admin) or farmer1 (Farmer)
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <p className="text-xs text-muted-foreground">
                Demo: admin123 or farmer123
              </p>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-farm-green hover:bg-farm-green/90" 
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm text-muted-foreground">
          Access and permissions will vary based on your user role
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;
