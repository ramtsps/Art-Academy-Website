import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { Palette, Mail, Lock, Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface ForgotPasswordPageProps {
  onBackToLogin: () => void;
  onSuccess: () => void;
}

const API_URL = 'http://localhost:5000/api';

export function ForgotPasswordPage({ onBackToLogin, onSuccess }: ForgotPasswordPageProps) {
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [resetData, setResetData] = useState({
    token: '',
    password: '',
    confirmPassword: '',
  });

  // Get token from URL if present
  useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      setResetData(prev => ({ ...prev, token }));
      setStep('reset');
    }
  });

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message);
        // Don't navigate away - let user know to check email
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (resetData.password !== resetData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (resetData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: resetData.token,
          password: resetData.password,
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        toast.success(data.message);
        onSuccess();
      } else {
        throw new Error(data.error);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to reset password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-white">
      <div className="max-w-md mx-auto px-4 py-16">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Palette className="w-12 h-12 text-purple-600" />
            <span className="text-3xl text-purple-600">Primiya's Art</span>
          </div>
          <p className="text-gray-600">
            {step === 'request' ? 'Reset your password' : 'Create new password'}
          </p>
        </div>

        {/* Forgot Password Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={onBackToLogin}
                className="h-8 w-8"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <CardTitle>
                  {step === 'request' ? 'Forgot Password' : 'Reset Password'}
                </CardTitle>
                <CardDescription>
                  {step === 'request' 
                    ? 'Enter your email to receive a reset link' 
                    : 'Enter your new password'
                  }
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {step === 'request' ? (
              // Request Reset Form
              <form onSubmit={handleRequestReset} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </Button>

                <div className="text-center text-sm text-gray-600 p-4 bg-gray-50 rounded-lg">
                  <p>We'll send you a link to reset your password.</p>
                  <p className="text-xs mt-1">Check your spam folder if you don't see it.</p>
                </div>
              </form>
            ) : (
              // Reset Password Form
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={resetData.password}
                      onChange={(e) =>
                        setResetData({ ...resetData, password: e.target.value })
                      }
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="••••••••"
                      className="pl-10"
                      value={resetData.confirmPassword}
                      onChange={(e) =>
                        setResetData({ ...resetData, confirmPassword: e.target.value })
                      }
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    'Reset Password'
                  )}
                </Button>
              </form>
            )}

            <Separator className="my-6" />

            <div className="text-center">
              <button
                type="button"
                onClick={onBackToLogin}
                className="text-purple-600 hover:text-purple-700 text-sm font-medium"
              >
                ← Back to Login
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}