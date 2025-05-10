import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Card from '../components/Card';

// Questions simulées par domaine (réutilisées de WrittenInterview)
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

enum RecordingState {
  IDLE = 'idle',
  RECORDING = 'recording',
  PAUSED = 'paused',
  STOPPED = 'stopped',
}

const AudioInterview: React.FC = () => {
  const { domainId = 'default' } = useParams<{ domainId: string }>();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [recordingState, setRecordingState] = useState<RecordingState>(RecordingState.IDLE);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordings, setRecordings] = useState<string[]>([]);
  const [isInterviewFinished, setIsInterviewFinished] = useState(false);

  // Utilise les questions spécifiques au domaine ou les questions par défaut
  const questions = SAMPLE_QUESTIONS[domainId] || SAMPLE_QUESTIONS['default'];

  // Gérer le chronomètre d'enregistrement
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (recordingState === RecordingState.RECORDING) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [recordingState]);

  // Formater le temps d'enregistrement (mm:ss)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Commencer l'enregistrement
  const startRecording = () => {
    // Dans une application réelle, vous utiliseriez ici l'API MediaRecorder
    setRecordingState(RecordingState.RECORDING);
    setRecordingTime(0);
  };

  // Mettre en pause l'enregistrement
  const pauseRecording = () => {
    setRecordingState(RecordingState.PAUSED);
  };

  // Reprendre l'enregistrement
  const resumeRecording = () => {
    setRecordingState(RecordingState.RECORDING);
  };

  // Arrêter l'enregistrement
  const stopRecording = () => {
    setRecordingState(RecordingState.STOPPED);
    // Dans une application réelle, vous sauvegarderiez ici l'enregistrement audio
    setRecordings(prev => [...prev, `Enregistrement ${prev.length + 1}`]);
    
    // Passer à la question suivante ou terminer l'entretien
    goToNextQuestion();
  };

  // Passer à la question suivante
  const goToNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 1;
    
    if (nextQuestionIndex >= questions.length) {
      // L'entretien est terminé
      setIsInterviewFinished(true);
      
      setTimeout(() => {
        navigate('/results');
      }, 3000);
    } else {
      // Passer à la question suivante
      setCurrentQuestionIndex(nextQuestionIndex);
      setRecordingState(RecordingState.IDLE);
    }
  };

  // Passer la question actuelle
  const skipQuestion = () => {
    if (recordingState === RecordingState.RECORDING || recordingState === RecordingState.PAUSED) {
      stopRecording();
    } else {
      goToNextQuestion();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-4 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Entretien Audio: {domainId}</h1>
          <div className="text-neutral-dark">
            Question {currentQuestionIndex + 1} / {questions.length}
          </div>
        </div>
      </Card>

      <Card className="mb-6 p-6">
        <h2 className="text-xl font-medium mb-4">Question actuelle:</h2>
        <p className="text-lg mb-6">{questions[currentQuestionIndex]}</p>
        
        {isInterviewFinished ? (
          <div className="text-center p-4 bg-green-50 text-green-700 rounded-lg">
            L'entretien est maintenant terminé. Vous allez être redirigé vers la page de résultats.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center items-center h-24 bg-neutral-lightest rounded-lg">
              {recordingState === RecordingState.RECORDING && (
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse mr-3"></div>
                  <span className="text-lg">Enregistrement en cours - {formatTime(recordingTime)}</span>
                </div>
              )}
              {recordingState === RecordingState.PAUSED && (
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="text-lg">Enregistrement en pause - {formatTime(recordingTime)}</span>
                </div>
              )}
              {recordingState === RecordingState.IDLE && (
                <span className="text-lg text-neutral-dark">Prêt à enregistrer</span>
              )}
              {recordingState === RecordingState.STOPPED && (
                <span className="text-lg text-green-600">Enregistrement terminé</span>
              )}
            </div>
            
            <div className="flex justify-center space-x-4">
              {recordingState === RecordingState.IDLE && (
                <Button variant="primary" onClick={startRecording}>
                  Commencer l'enregistrement
                </Button>
              )}
              {recordingState === RecordingState.RECORDING && (
                <>
                  <Button variant="secondary" onClick={pauseRecording}>
                    Pause
                  </Button>
                  <Button variant="primary" onClick={stopRecording}>
                    Terminer
                  </Button>
                </>
              )}
              {recordingState === RecordingState.PAUSED && (
                <>
                  <Button variant="primary" onClick={resumeRecording}>
                    Reprendre
                  </Button>
                  <Button variant="secondary" onClick={stopRecording}>
                    Terminer
                  </Button>
                </>
              )}
              {(recordingState === RecordingState.IDLE || recordingState === RecordingState.STOPPED) && (
                <Button variant="outline" onClick={skipQuestion}>
                  Passer la question
                </Button>
              )}
            </div>
          </div>
        )}
      </Card>

      {recordings.length > 0 && (
        <Card className="mb-4">
          <h2 className="text-xl font-medium mb-4">Vos réponses enregistrées:</h2>
          <ul className="space-y-3">
            {recordings.map((recording, index) => (
              <li key={index} className="flex items-center p-3 bg-neutral-lightest rounded-lg">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Question {index + 1}</div>
                  <div className="text-sm text-neutral-dark">
                    (Dans une version réelle, vous pourriez écouter votre enregistrement ici)
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
};

export default AudioInterview; 