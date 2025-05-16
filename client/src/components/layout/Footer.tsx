import React from 'react';
import { Link } from 'wouter';

const Footer: React.FC = () => {
  return (
    <footer className="py-3 bg-white patriot-footer">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <div className="flex items-center">
            <img src="/src/assets/flag-small.svg" alt="American Flag" className="h-5 w-auto mr-2 shadow-sm" />
            <p>© {new Date().getFullYear()} Patriot Truthbot. Defending American Truth.</p>
          </div>
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
