import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          AI Recruteur Coach
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-neutral-dark hover:text-primary transition-colors">
                Accueil
              </Link>
            </li>
            <li>
              <Link to="/interview-select" className="text-neutral-dark hover:text-primary transition-colors">
                Entretien
              </Link>
            </li>
            <li>
              <Link to="/results" className="text-neutral-dark hover:text-primary transition-colors">
                Résultats
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 