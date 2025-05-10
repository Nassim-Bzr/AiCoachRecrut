import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

// Données simulées pour les résultats
const MOCK_RESULTS = {
  score: 82,
  criteria: [
    { name: 'Clarté', score: 85 },
    { name: 'Pertinence', score: 90 },
    { name: 'Structure', score: 75 },
    { name: 'Exemples concrets', score: 70 },
    { name: 'Vocabulaire professionnel', score: 90 },
  ],
  feedback: [
    {
      title: 'Points forts',
      content: 'Vos réponses sont claires et bien structurées. Vous utilisez un bon vocabulaire professionnel et vos explications sont pertinentes par rapport aux questions posées.',
    },
    {
      title: 'Points à améliorer',
      content: 'Essayez d\'inclure plus d\'exemples concrets tirés de votre expérience professionnelle pour illustrer vos compétences. Structurez davantage vos réponses avec une introduction, un développement et une conclusion.',
    },
    {
      title: 'Conseils personnalisés',
      content: 'Préparez à l\'avance des exemples spécifiques pour les questions les plus courantes. Entraînez-vous à structurer vos réponses en utilisant la méthode STAR (Situation, Tâche, Action, Résultat) pour les questions comportementales.',
    },
  ],
};

const Results: React.FC = () => {
  const maxScore = 100;
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Résultats de votre entretien</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-1 flex flex-col items-center justify-center p-8">
          <div className="relative w-40 h-40 mb-4">
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="3"
                strokeDasharray="100, 100"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={MOCK_RESULTS.score >= 75 ? '#41C0B7' : MOCK_RESULTS.score >= 50 ? '#FBBF24' : '#EF4444'}
                strokeWidth="3"
                strokeDasharray={`${MOCK_RESULTS.score}, 100`}
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-3xl font-bold">{MOCK_RESULTS.score}%</div>
              <div className="text-sm text-neutral-dark">Score global</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="font-semibold text-lg mb-2">Évaluation générale</div>
            <p className="text-neutral-dark">
              {MOCK_RESULTS.score >= 80 
                ? 'Excellent ! Vous êtes prêt pour un entretien réel.'
                : MOCK_RESULTS.score >= 60
                ? 'Bon travail ! Quelques améliorations possibles.'
                : 'Continuez à vous entraîner pour progresser.'}
            </p>
          </div>
        </Card>
        
        <Card className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Évaluation par critère</h2>
          <div className="space-y-4">
            {MOCK_RESULTS.criteria.map((criterion) => (
              <div key={criterion.name}>
                <div className="flex justify-between mb-1">
                  <span>{criterion.name}</span>
                  <span className="font-medium">{criterion.score}%</span>
                </div>
                <div className="w-full bg-neutral h-2 rounded-full">
                  <div
                    className={`h-full rounded-full ${
                      criterion.score >= 75
                        ? 'bg-secondary'
                        : criterion.score >= 50
                        ? 'bg-yellow-400'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${criterion.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      
      <Card className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Feedback détaillé</h2>
        <div className="space-y-6">
          {MOCK_RESULTS.feedback.map((section, index) => (
            <div key={index}>
              <h3 className="font-medium text-lg mb-2">{section.title}</h3>
              <p className="text-neutral-dark">{section.content}</p>
            </div>
          ))}
        </div>
      </Card>
      
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Link to="/interview-select">
          <Button variant="primary" size="lg">
            Recommencer un entretien
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button variant="secondary" size="lg">
            Voir l'historique
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Results; 