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
      <div className={`${darkMode ? "dark bg-black text-white" : "bg-white text-black"} min-h-screen transition-all duration-500`}>

        {/* Dark Mode Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="fixed top-20 right-6 z-50 p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-xl hover:scale-105 border border-gray-200 dark:border-gray-600"
          title="Toggle dark mode"
          aria-label="Toggle dark mode"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>

        {/* App Content */}
        {currentPage === 'landing' && <LandingPage onStartQuiz={handleStartQuiz} />}
        {currentPage === 'quiz' && <QuizPage onComplete={handleCompleteQuiz} />}
        {currentPage === 'dashboard' && <DashboardPage onStartNewQuiz={handleStartNewQuiz} />}
      </div>
    </QuizProvider>
  );
}

export default App;