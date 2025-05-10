import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-primary mb-4">AI Recruteur Coach</h1>
        <p className="text-xl text-neutral-dark">
          Préparez-vous efficacement à vos entretiens d'embauche grâce à notre simulateur d'IA
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Card className="flex flex-col items-center text-center p-8">
          <div className="mb-6">
            <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-3">Simuler un entretien</h2>
          <p className="text-neutral-dark mb-6">
            Entraînez-vous avec notre IA et recevez un feedback instantané sur vos réponses
          </p>
          <Link to="/interview-select" className="mt-auto">
            <Button variant="primary" size="lg">
              Commencer un entretien
            </Button>
          </Link>
        </Card>

        <Card className="flex flex-col items-center text-center p-8">
          <div className="mb-6">
            <svg className="w-16 h-16 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-3">Voir vos résultats</h2>
          <p className="text-neutral-dark mb-6">
            Consultez votre historique d'entretiens et suivez votre progression
          </p>
          <Link to="/results" className="mt-auto">
            <Button variant="secondary" size="lg">
              Voir mes résultats
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default Home; 