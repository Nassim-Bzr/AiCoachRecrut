import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import InterviewSelect from './pages/InterviewSelect';
import WrittenInterview from './pages/WrittenInterview';
import AudioInterview from './pages/AudioInterview';
import Results from './pages/Results';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="interview-select" element={<InterviewSelect />} />
        <Route path="interview/written/:domainId" element={<WrittenInterview />} />
        <Route path="interview/audio/:domainId" element={<AudioInterview />} />
        <Route path="results" element={<Results />} />
        <Route path="results/:interviewId" element={<Results />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="*" element={<div className="text-center p-10">Page non trouvée</div>} />
      </Route>
    </Routes>
  );
};

export default App;
