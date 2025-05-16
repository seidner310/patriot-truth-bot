import React from 'react';
import { Link } from 'wouter';

const Footer: React.FC = () => {
  return (
    <footer className="py-3 bg-white border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} FactFinder AI. Powered by OpenAI.</p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="#" className="hover:text-primary-600 transition">Terms</Link>
            <Link href="#" className="hover:text-primary-600 transition">Privacy</Link>
            <Link href="#" className="hover:text-primary-600 transition">About</Link>
            <Link href="#" className="hover:text-primary-600 transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
