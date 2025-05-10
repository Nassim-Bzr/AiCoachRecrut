import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-neutral-lightest py-6 border-t border-neutral">
        <div className="container mx-auto px-4 text-center text-neutral-dark">
          <p>© {new Date().getFullYear()} AI Recruteur Coach. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout; 