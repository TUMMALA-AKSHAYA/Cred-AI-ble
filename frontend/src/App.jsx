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
        {/* Dark Mode Toggle - Positioned Above Signup Bar */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed bottom-24 right-8 z-50 p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-110 border-2 border-gray-200 dark:border-gray-600"
          title="Toggle dark mode"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun size={24} className="text-yellow-400 transition-transform duration-500 hover:rotate-180" />
          ) : (
            <Moon size={24} className="text-indigo-600 transition-transform duration-500 hover:rotate-180" />
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