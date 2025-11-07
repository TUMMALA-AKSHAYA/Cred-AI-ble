import { useState } from 'react';
import { QuizProvider } from './contexts/QuizContext';
import { LandingPage } from './pages/LandingPage';
import { QuizPage } from './pages/QuizPage';
import { DashboardPage } from './pages/DashboardPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleStartQuiz = () => setCurrentPage('quiz');
  const handleCompleteQuiz = () => setCurrentPage('dashboard');
  const handleStartNewQuiz = () => {
    setCurrentPage('quiz');
  };
  const handleBackToLanding = () => setCurrentPage('landing');

  return (
    <QuizProvider>
      {currentPage === 'landing' && <LandingPage onStartQuiz={handleStartQuiz} />}
      {currentPage === 'quiz' && <QuizPage onComplete={handleCompleteQuiz} />}
      {currentPage === 'dashboard' && <DashboardPage onStartNewQuiz={handleStartNewQuiz} />}
    </QuizProvider>
  );
}

export default App;