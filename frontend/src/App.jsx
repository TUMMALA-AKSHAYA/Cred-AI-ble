import { useState } from 'react';
import { QuizProvider } from './contexts/QuizContext';
import { LandingPage } from './pages/LandingPage';
import { QuizPage } from './pages/QuizPage';
import { DashboardPage } from './pages/DashboardPage';
import { Moon, Sun } from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [darkMode, setDarkMode] = useState(false);

  const handleStartQuiz = () => setCurrentPage('quiz');
  const handleCompleteQuiz = () => setCurrentPage('dashboard');
  const handleStartNewQuiz = () => {
    setCurrentPage('quiz');
  };

  return (
    <QuizProvider>
      <div className={darkMode ? 'dark' : ''}>
        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-6 right-6 z-50 p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg"
          title="Toggle dark mode"
        >
          {darkMode ? (
            <Sun size={20} className="text-yellow-400" />
          ) : (
            <Moon size={20} className="text-gray-700" />
          )}
        </button>

        {/* App Content */}
        <div className={`${darkMode ? 'dark' : ''}`}>
          {currentPage === 'landing' && <LandingPage onStartQuiz={handleStartQuiz} />}
          {currentPage === 'quiz' && <QuizPage onComplete={handleCompleteQuiz} />}
          {currentPage === 'dashboard' && <DashboardPage onStartNewQuiz={handleStartNewQuiz} />}
        </div>
      </div>
    </QuizProvider>
  );
}

export default App;