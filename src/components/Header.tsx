import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationCenter from './NotificationCenter';
import ThemeToggle from './ThemeToggle';
import { 
  RecycleIcon, 
  BarChart2Icon, 
  FileTextIcon, 
  Settings2Icon, 
  MenuIcon, 
  XIcon,
  FactoryIcon,
  MapPinIcon,
  LogOutIcon,
  UserIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <header className="bg-gradient-to-r from-icp-deepBlue to-icp-purple text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <RecycleIcon className="h-8 w-8 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-semibold">E-Waste Tracker</h1>
              <p className="text-xs text-gray-200">Powered by Internet Computer</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-all ${
                  isActive(item.href)
                    ? 'bg-white/10 text-white'
                    : 'hover:bg-white/5 text-gray-200 hover:text-white'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <NotificationCenter />
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile\" className="flex items-center space-x-2 hover:bg-white/5 px-3 py-2 rounded-md">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full border-2 border-white/20"
                  />
                  <span className="text-sm font-medium">{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md hover:bg-white/5 transition-colors"
                >
                  <LogOutIcon className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
              >
                <UserIcon className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>

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
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-white/10"
            >
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'bg-white/10 text-white'
                      : 'text-gray-200 hover:bg-white/5 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
              
              <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                <div className="flex items-center justify-between px-4">
                  <ThemeToggle />
                  <NotificationCenter />
                </div>
                
                {user ? (
                  <div className="space-y-2">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 px-4 py-3 hover:bg-white/5 rounded-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="h-8 w-8 rounded-full border-2 border-white/20"
                      />
                      <span className="text-sm font-medium">{user.name}</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-3 text-left hover:bg-white/5 rounded-md"
                    >
                      <LogOutIcon className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 px-4 py-3 hover:bg-white/5 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <UserIcon className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;