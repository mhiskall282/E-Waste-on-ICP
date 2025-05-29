import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { RecycleIcon, BarChart2Icon, FileTextIcon, Settings2Icon, MenuIcon, XIcon } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: RecycleIcon },
    { name: 'Analytics', href: '/analytics', icon: BarChart2Icon },
    { name: 'Reports', href: '/reports', icon: FileTextIcon },
    { name: 'Settings', href: '/settings', icon: Settings2Icon },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-icp-deepBlue text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <RecycleIcon className="h-8 w-8 text-icp-lightBlue" />
            <div>
              <h1 className="text-xl font-semibold">E-Waste Tracker</h1>
              <p className="text-xs text-icp-lightBlue">Powered by Internet Computer</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'bg-white/10 text-white'
                    : 'hover:bg-white/5 text-gray-300'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
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
                className={`flex items-center space-x-2 px-4 py-3 rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'bg-white/10 text-white'
                    : 'text-gray-300 hover:bg-white/5'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;