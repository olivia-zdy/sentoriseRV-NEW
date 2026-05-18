import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import logoLight from '@/assets/logo-light.png';
import logoDark from '@/assets/logo-dark.png';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isTeamMember, isLoading: authLoading, signIn } = useAdminAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  // Clear the backend error as soon as the user edits the form again.
  useEffect(() => {
    const subscription = loginForm.watch(() => {
      if (loginError) setLoginError(null);
    });
    return () => subscription.unsubscribe();
  }, [loginForm, loginError]);

  useEffect(() => {
    if (user && isTeamMember && !authLoading) {
      navigate('/admin');
    }
  }, [user, isTeamMember, authLoading, navigate]);

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setLoginError(null);
    try {
      const { error } = await signIn(data.email, data.password);
      if (error) {
        const message = error.message?.toLowerCase().includes('invalid')
          ? 'Incorrect email or password. Please try again.'
          : error.message || 'Login failed. Please try again.';
        setLoginError(message);
        toast({
          title: 'Login failed',
          description: message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Welcome back!',
          description: 'You have been logged in successfully.',
        });
      }
    } catch (error) {
      const message = 'An unexpected error occurred. Please try again.';
      setLoginError(message);
      toast({
        title: 'Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <img 
            src={logoLight} 
            alt="Sentorise" 
            className="h-10 dark:hidden" 
          />
          <img 
            src={logoDark} 
            alt="Sentorise" 
            className="h-10 hidden dark:block" 
          />
        </div>

        <Card className="border-border/50 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Team Dashboard</CardTitle>
            <CardDescription>
              Access internal tools for leads, feedback, and brand assets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@sentorise.com"
                    className="pl-10"
                    {...loginForm.register('email')}
                  />
                </div>
                {loginForm.formState.errors.email && (
                  <p className="text-sm text-destructive">{loginForm.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    {...loginForm.register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="text-sm text-destructive">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Log In'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          This dashboard is for authorized Sentorise team members only.
        </p>
      </div>
    </div>
  );
}
