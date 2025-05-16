import React from 'react';
import { Flag, Shield, Info, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="patriot-header shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="rounded-full p-2 patriot-icon">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">PATRIOT TRUTHBOT</h1>
            <p className="text-xs text-gray-600">Defending Truth & American Values</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Flag className="h-5 w-5 text-secondary-600" />
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800" aria-label="Information">
            <Info className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800" aria-label="Settings">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
