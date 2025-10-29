import { useState } from 'react';
import { Palette, Menu, X, ShoppingCart, User, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useCart } from './CartContext';
import { useAuth } from './AuthContext';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onCartClick: () => void;
}

export function Navigation({ currentPage, onNavigate, onCartClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Products' },
    { id: 'locations', label: 'Locations' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Palette className="w-8 h-8 text-purple-600" />
            <span className="text-purple-600">Primiya's Art</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`transition-colors ${
                  currentPage === item.id
                    ? 'text-purple-600'
                    : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={onCartClick}
              className="relative text-gray-700 hover:text-purple-600 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-purple-600 text-xs">
                  {getTotalItems()}
                </Badge>
              )}
            </button>
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Avatar className="w-8 h-8">
  <AvatarImage src={user?.avatar} alt={user?.name} />
  <AvatarFallback className="bg-purple-600 text-white">
    {user?.name?.charAt(0).toUpperCase()}
  </AvatarFallback>
</Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span>{user?.name}</span>
                      <span className="text-xs text-gray-500">{user?.email}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => onNavigate('enrollment')}>
                    <User className="w-4 h-4 mr-2" />
                    My Classes
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button 
                  onClick={() => onNavigate('login')}
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => onNavigate('enrollment')}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Enroll Now
                </Button>
              </>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={onCartClick}
              className="relative text-gray-700"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-purple-600 text-xs">
                  {getTotalItems()}
                </Badge>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left py-2 px-4 transition-colors ${
                  currentPage === item.id
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="px-4 pt-2 space-y-2">
              {isAuthenticated ? (
                <>
                  <div className="py-2 border-t">
                    <div className="flex items-center gap-3 px-4 py-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="bg-purple-600 text-white">
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm">{user?.name}</div>
                        <div className="text-xs text-gray-500">{user?.email}</div>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => {
                      onNavigate('enrollment');
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-purple-600 text-purple-600"
                  >
                    <User className="w-4 h-4 mr-2" />
                    My Classes
                  </Button>
                  <Button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    onClick={() => {
                      onNavigate('login');
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-purple-600 text-purple-600"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={() => {
                      onNavigate('enrollment');
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    Enroll Now
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
