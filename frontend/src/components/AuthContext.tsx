import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Get all URLs from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const FACEBOOK_SDK_URL = import.meta.env.VITE_FACEBOOK_SDK_URL || 'https://connect.facebook.net/en_US/sdk.js';
const GOOGLE_SDK_URL = import.meta.env.VITE_GOOGLE_SDK_URL || 'https://accounts.google.com/gsi/client';
const GOOGLE_API_URL = import.meta.env.VITE_GOOGLE_API_URL || 'https://www.googleapis.com/oauth2/v2/userinfo';
const FACEBOOK_GRAPH_URL = import.meta.env.VITE_FACEBOOK_GRAPH_URL || 'https://graph.facebook.com/v18.0/me';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [fbSdkLoaded, setFbSdkLoaded] = useState(false);

  // Load Facebook SDK on component mount
  useEffect(() => {
    loadFacebookSDK();
  }, []);

  const loadFacebookSDK = () => {
    if (window.FB) {
      setFbSdkLoaded(true);
      return;
    }

    // Initialize Facebook SDK with proper settings
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v18.0',
        autoLogAppEvents: true,
        status: false // Don't check login status automatically
      });
      setFbSdkLoaded(true);
      console.log('✅ Facebook SDK loaded successfully');
    };

    // Load Facebook SDK script
    const script = document.createElement('script');
    script.src = FACEBOOK_SDK_URL;
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.onerror = () => {
      console.error('❌ Failed to load Facebook SDK');
      setFbSdkLoaded(false);
    };
    document.head.appendChild(script);
  };

  // Load user from token on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        setUser(data.user);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error);
    }

    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const signup = async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error);
    }

    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const loginWithGoogle = async (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      try {
        // Check if Google API is already loaded
        if (!window.google) {
          // Load Google API script dynamically
          await new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = GOOGLE_SDK_URL;
            script.async = true;
            script.defer = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        }

        // Use Google Identity Services credential token flow
        const client = google.accounts.oauth2.initTokenClient({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          scope: import.meta.env.VITE_GOOGLE_SCOPES || 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
          callback: async (response: any) => {
            if (response.error) {
              reject(new Error(response.error));
              return;
            }

            if (response.access_token) {
              try {
                // Get user info from Google API
                const userInfoResponse = await fetch(GOOGLE_API_URL, {
                  headers: {
                    'Authorization': `Bearer ${response.access_token}`
                  }
                });

                const profile = await userInfoResponse.json();

                // Send profile data to backend
                const backendResponse = await fetch(`${API_URL}/auth/google`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ 
                    profile: {
                      id: profile.id,
                      name: profile.name,
                      email: profile.email,
                      picture: profile.picture
                    }
                  }),
                });

                const data = await backendResponse.json();
                
                if (!data.success) {
                  throw new Error(data.error);
                }

                localStorage.setItem('token', data.token);
                setUser(data.user);
                resolve();
              } catch (error) {
                console.error('Google login failed:', error);
                reject(error);
              }
            }
          },
        });

        client.requestAccessToken();
      } catch (error) {
        console.error('Google OAuth setup failed:', error);
        reject(error);
      }
    });
  };

  const loginWithFacebook = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!fbSdkLoaded) {
        reject(new Error('Facebook SDK is not loaded yet. Please try again.'));
        return;
      }

      if (!window.FB) {
        reject(new Error('Facebook SDK is not available'));
        return;
      }

      // Use FB.login with proper parameters to avoid access token conflicts
      window.FB.login((response: any) => {
        if (response.authResponse) {
          console.log('Facebook login successful:', response);
          
          // Get user info using the access token from response
          const accessToken = response.authResponse.accessToken;
          
          window.FB.api('/me', 
            { 
              fields: 'id,name,email,picture.type(large)',
              access_token: accessToken // Pass access token directly to API call
            }, 
            async (profile: any) => {
              try {
                if (profile.error) {
                  throw new Error(profile.error.message || 'Failed to fetch Facebook profile');
                }

                console.log('Facebook profile:', profile);

                // Send profile data to backend
                const backendResponse = await fetch(`${API_URL}/auth/facebook`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ 
                    profile: {
                      id: profile.id,
                      name: profile.name,
                      email: profile.email,
                      picture: profile.picture?.data?.url || profile.picture
                    }
                  }),
                });

                const data = await backendResponse.json();
                
                if (!data.success) {
                  throw new Error(data.error);
                }

                localStorage.setItem('token', data.token);
                setUser(data.user);
                resolve();
              } catch (error) {
                console.error('Facebook login failed:', error);
                reject(error);
              }
            }
          );
        } else {
          console.log('Facebook login response:', response);
          if (response.status === 'not_authorized') {
            reject(new Error('Facebook login was not authorized'));
          } else {
            reject(new Error('Facebook login cancelled or failed'));
          }
        }
      }, { 
        scope: 'email,public_profile',
        return_scopes: false, // Don't return scopes in response
        auth_type: 'rerequest' // Re-request permission if previously denied
      });
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    
    // Also logout from Facebook if SDK is loaded
    if (fbSdkLoaded && window.FB) {
      window.FB.logout(() => {
        console.log('Facebook logout completed');
      });
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Add Facebook SDK types
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
    google: any;
  }
}