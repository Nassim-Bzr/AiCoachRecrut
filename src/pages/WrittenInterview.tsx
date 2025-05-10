import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

// Type pour les messages
type MessageType = 'ai' | 'user';

interface Message {
  id: number;
  type: MessageType;
  content: string;
  timestamp: Date;
}

// Questions simulées par domaine
const SAMPLE_QUESTIONS: Record<string, string[]> = {
  'dev': [
    "Parlez-moi de votre expérience avec React.",
    "Comment gérez-vous la gestion d'état dans vos applications?",
    "Décrivez un défi technique que vous avez rencontré et comment vous l'avez résolu.",
    "Quelle est votre approche pour tester votre code?",
    "Comment restez-vous à jour avec les nouvelles technologies?",
  ],
  'marketing': [
    "Parlez-moi d'une campagne marketing réussie que vous avez dirigée.",
    "Comment mesurez-vous le ROI de vos actions marketing?",
    "Quelle est votre expérience avec les outils d'analyse marketing?",
    "Comment adaptez-vous votre stratégie marketing à différentes audiences?",
    "Décrivez votre approche pour développer une stratégie de contenu.",
  ],
  // Questions par défaut pour les autres domaines
  'default': [
    "Parlez-moi de votre parcours professionnel.",
    "Quelles sont vos principales forces?",
    "Pourquoi souhaitez-vous rejoindre notre entreprise?",
    "Où vous voyez-vous dans 5 ans?",
    "Comment gérez-vous les situations stressantes?",
  ]
};

const WrittenInterview: React.FC = () => {
  const { domainId = 'default' } = useParams<{ domainId: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isInterviewFinished, setIsInterviewFinished] = useState(false);

  // Utiliser les questions spécifiques au domaine ou les questions par défaut
  const questions = SAMPLE_QUESTIONS[domainId] || SAMPLE_QUESTIONS['default'];

  // Initialiser l'entretien avec la première question
  useEffect(() => {
    if (messages.length === 0 && questions.length > 0) {
      setMessages([
        {
          id: 1,
          type: 'ai',
          content: questions[0],
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages, questions]);

  // Envoyer un message utilisateur
  const handleSendMessage = () => {
    if (currentInput.trim() === '' || isInterviewFinished) return;

    // Ajouter le message de l'utilisateur
    const userMessage: Message = {
      id: messages.length + 1,
      type: 'user',
      content: currentInput,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');

    // Vérifier si c'est la dernière question
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex >= questions.length) {
      // L'entretien est terminé
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            type: 'ai',
            content: "L'entretien est maintenant terminé. Merci pour vos réponses. Vous allez être redirigé vers la page de résultats.",
            timestamp: new Date(),
          }
        ]);
        setIsInterviewFinished(true);
        
        // Rediriger vers la page de résultats après 3 secondes
        setTimeout(() => {
          navigate('/results');
        }, 3000);
      }, 1000);
    } else {
      // Envoyer la question suivante après un délai
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: prev.length + 1,
            type: 'ai',
            content: questions[nextQuestionIndex],
            timestamp: new Date(),
          }
        ]);
        setCurrentQuestionIndex(nextQuestionIndex);
      }, 1000);
    }
  };

  // Passer à la question suivante
  const handleSkipQuestion = () => {
    if (isInterviewFinished) return;
    
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex >= questions.length) {
      // L'entretien est terminé
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          type: 'ai',
          content: "L'entretien est maintenant terminé. Merci pour votre participation. Vous allez être redirigé vers la page de résultats.",
          timestamp: new Date(),
        }
      ]);
      setIsInterviewFinished(true);
      
      setTimeout(() => {
        navigate('/results');
      }, 3000);
    } else {
      // Passer à la question suivante
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 1,
          type: 'ai',
          content: questions[nextQuestionIndex],
          timestamp: new Date(),
        }
      ]);
      setCurrentQuestionIndex(nextQuestionIndex);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Entretien: {domainId}</h1>
          <div className="text-neutral-dark">
            Question {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>
      </Card>

      <Card className="mb-4 p-0 overflow-hidden">
        <div className="bg-neutral-light p-4 border-b border-neutral">
          <h2 className="font-medium">Conversation avec l'IA</h2>
        </div>
        <div className="h-96 overflow-y-auto p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.type === 'ai' ? 'mr-auto' : 'ml-auto'
              }`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                  message.type === 'ai'
                    ? 'bg-neutral-light text-neutral-darkest'
                    : 'bg-primary text-white'
                }`}
              >
                {message.content}
              </div>
              <div
                className={`text-xs mt-1 text-neutral-dark ${
                  message.type === 'ai' ? 'text-left' : 'text-right'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="flex space-x-2">
        <input
          type="text"
          className="input flex-grow"
          placeholder="Tapez votre réponse ici..."
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          disabled={isInterviewFinished}
        />
        <Button
          onClick={handleSendMessage}
          disabled={currentInput.trim() === '' || isInterviewFinished}
        >
          Envoyer
        </Button>
        <Button
          variant="secondary"
          onClick={handleSkipQuestion}
          disabled={isInterviewFinished}
        >
          Passer
        </Button>
      </div>
    </div>
  );
};

export default WrittenInterview; 