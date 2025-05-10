import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

const INTERVIEW_TYPES = [
  { id: 'written', label: 'Écrit', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', available: true },
  { id: 'audio', label: 'Audio', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z', available: true },
  { id: 'video', label: 'Visio', icon: 'M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z', available: false },
];

const JOB_DOMAINS = [
  { id: 'dev', label: 'Développeur' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'sales', label: 'Commercial' },
  { id: 'hr', label: 'Ressources Humaines' },
  { id: 'finance', label: 'Finance' },
  { id: 'product', label: 'Product Manager' },
];

const InterviewSelect: React.FC = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDomain, setSelectedDomain] = useState<string>('');

  const handleStartInterview = () => {
    if (selectedType && selectedDomain) {
      navigate(`/interview/${selectedType}/${selectedDomain}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Configurer votre entretien</h1>
      
      <Card className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Choisissez le type d'entretien</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {INTERVIEW_TYPES.map((type) => (
            <div
              key={type.id}
              className={`
                p-4 rounded-lg border-2 flex flex-col items-center justify-center text-center cursor-pointer transition-all
                ${selectedType === type.id ? 'border-primary bg-primary bg-opacity-5' : 'border-neutral'}
                ${!type.available ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary hover:bg-primary hover:bg-opacity-5'}
              `}
              onClick={() => type.available && setSelectedType(type.id)}
            >
              <svg className="w-10 h-10 mb-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={type.icon} />
              </svg>
              <span className="font-medium">{type.label}</span>
              {!type.available && <span className="text-xs text-neutral-dark mt-1">(à venir)</span>}
            </div>
          ))}
        </div>
      </Card>
      
      <Card className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Sélectionnez le domaine métier</h2>
        <select
          className="input w-full"
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
        >
          <option value="">Sélectionnez un domaine</option>
          {JOB_DOMAINS.map((domain) => (
            <option key={domain.id} value={domain.id}>
              {domain.label}
            </option>
          ))}
        </select>
      </Card>
      
      <div className="flex justify-center">
        <Button
          variant="primary"
          size="lg"
          disabled={!selectedType || !selectedDomain}
          onClick={handleStartInterview}
        >
          Commencer l'entretien
        </Button>
      </div>
    </div>
  );
};

export default InterviewSelect; 