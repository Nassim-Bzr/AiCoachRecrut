import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

// Données simulées pour l'historique des entretiens
const MOCK_HISTORY = [
  {
    id: 1,
    date: new Date(2023, 9, 15, 14, 30),
    domain: 'dev',
    domainLabel: 'Développeur',
    type: 'written',
    typeLabel: 'Écrit',
    score: 82,
    completed: true,
  },
  {
    id: 2,
    date: new Date(2023, 9, 10, 11, 15),
    domain: 'marketing',
    domainLabel: 'Marketing',
    type: 'audio',
    typeLabel: 'Audio',
    score: 75,
    completed: true,
  },
  {
    id: 3,
    date: new Date(2023, 9, 5, 9, 45),
    domain: 'sales',
    domainLabel: 'Commercial',
    type: 'written',
    typeLabel: 'Écrit',
    score: 68,
    completed: true,
  },
  {
    id: 4,
    date: new Date(2023, 8, 28, 16, 0),
    domain: 'hr',
    domainLabel: 'Ressources Humaines',
    type: 'written',
    typeLabel: 'Écrit',
    score: 78,
    completed: true,
  },
  {
    id: 5,
    date: new Date(2023, 8, 20, 10, 30),
    domain: 'dev',
    domainLabel: 'Développeur',
    type: 'written',
    typeLabel: 'Écrit',
    score: 62,
    completed: true,
  },
];

const Dashboard: React.FC = () => {
  // Formatage de la date pour affichage
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Obtenir la classe CSS pour le score
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return 'text-secondary';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Historique des entretiens</h1>
        <Link to="/interview-select">
          <Button variant="primary">Nouvel entretien</Button>
        </Link>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral">
                <th className="py-3 px-4 text-left font-semibold">Date</th>
                <th className="py-3 px-4 text-left font-semibold">Type</th>
                <th className="py-3 px-4 text-left font-semibold">Domaine</th>
                <th className="py-3 px-4 text-center font-semibold">Score</th>
                <th className="py-3 px-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_HISTORY.map((interview) => (
                <tr key={interview.id} className="border-b border-neutral hover:bg-neutral-lightest">
                  <td className="py-4 px-4">{formatDate(interview.date)}</td>
                  <td className="py-4 px-4">{interview.typeLabel}</td>
                  <td className="py-4 px-4">{interview.domainLabel}</td>
                  <td className="py-4 px-4 text-center">
                    <span className={`font-semibold ${getScoreColorClass(interview.score)}`}>
                      {interview.score}%
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Link to={`/results/${interview.id}`} className="text-primary hover:underline">
                      Voir détails
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {MOCK_HISTORY.length === 0 && (
          <div className="text-center py-8 text-neutral-dark">
            <p>Vous n'avez pas encore passé d'entretien.</p>
          </div>
        )}
      </Card>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Statistiques</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {MOCK_HISTORY.length}
            </div>
            <div className="text-neutral-dark">Entretiens complétés</div>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-secondary mb-2">
              {MOCK_HISTORY.reduce((acc, curr) => acc + curr.score, 0) / MOCK_HISTORY.length}%
            </div>
            <div className="text-neutral-dark">Score moyen</div>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">
              {Math.max(...MOCK_HISTORY.map(interview => interview.score))}%
            </div>
            <div className="text-neutral-dark">Meilleur score</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 