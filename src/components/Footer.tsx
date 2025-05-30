import React from 'react';
import { GithubIcon, TwitterIcon, LinkedinIcon, HeartIcon } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-icp-deepBlue mb-4">About E-Waste Tracker</h3>
            <p className="text-gray-600">
              Helping organizations track and manage electronic waste responsibly through blockchain technology.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-icp-deepBlue mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-icp-purple transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-icp-purple transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-icp-purple transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-icp-purple transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-icp-deepBlue mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-icp-purple transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-icp-purple transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-icp-purple transition-colors">
                  Sustainability Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-icp-purple transition-colors">
                  Partners
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-icp-deepBlue mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-icp-purple transition-colors">
                <GithubIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-icp-purple transition-colors">
                <TwitterIcon className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-600 hover:text-icp-purple transition-colors">
                <LinkedinIcon className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm">
              © 2024 E-Waste Tracker. All rights reserved.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-gray-600 text-sm">Made with</span>
              <HeartIcon className="h-4 w-4 text-red-500 mx-1" />
              <span className="text-gray-600 text-sm">on the Internet Computer</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;