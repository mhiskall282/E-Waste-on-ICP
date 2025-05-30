import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  RecycleIcon, 
  BarChart2Icon, 
  FileTextIcon, 
  Settings2Icon, 
  MenuIcon, 
  XIcon,
  FactoryIcon,
  MapPinIcon,
  LogOutIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import NotificationCenter from './NotificationCenter';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: RecycleIcon },
    { name: 'Analytics', href: '/analytics', icon: BarChart2Icon },
    { name: 'Reports', href: '/reports', icon: FileTextIcon },
    { name: 'Manufacturers', href: '/manufacturers', icon: FactoryIcon },
    { name: 'Recycling Centers', href: '/recycling-centers', icon: MapPinIcon },
    { name: 'Settings', href: '/settings', icon: Settings2Icon },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <RecycleIcon className="h-8 w-8 text-white" />
            <div>
              <h1 className="text-xl font-semibold">E-Waste Tracker</h1>
              <p className="text-xs text-purple-200">Powered by Internet Computer</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-white/20 text-white'
                    : 'hover:bg-white/10 text-purple-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            <div className="flex items-center space-x-4 pl-6 border-l border-white/20">
              <ThemeToggle />
              <NotificationCenter />
              {user && (
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <LogOutIcon className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-white/20 text-white'
                    : 'text-purple-100 hover:bg-white/10'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
            <div className="flex items-center space-x-4 px-4 py-3">
              <ThemeToggle />
              <NotificationCenter />
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;