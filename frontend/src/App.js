import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Sparkles, Brain, Code, TrendingUp, Zap, Target, Rocket, Award, CheckCircle, XCircle, TrendingDown, BookOpen, Trophy, Sun, Moon } from 'lucide-react';
import { useWallet } from './contexts/WalletContext';
import { algorandAPI } from './services/algorandApi';
import WalletConnect from './components/WalletConnect';
import BadgeDisplay from './components/BadgeDisplay';

const CareerQuizApp = () => {
  const { walletAddress } = useWallet();
  const [currentStep, setCurrentStep] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [domainAnswers, setDomainAnswers] = useState({});
  const [domainResults, setDomainResults] = useState(null);
  const [mintingBadge, setMintingBadge] = useState(false);
  const [badgeMinted, setBadgeMinted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const domainQuizzes = {
    "AI/Machine Learning": [
      { id: 1, difficulty: "beginner", topic: "ML Fundamentals", question: "What is supervised learning?", options: ["Learning without labeled data", "Learning from labeled training data", "Learning through trial and error", "Learning by observing patterns"], correctAnswer: 1 },
      { id: 2, difficulty: "beginner", topic: "ML Fundamentals", question: "Which of these is a classification algorithm?", options: ["Linear Regression", "K-Means", "Logistic Regression", "PCA"], correctAnswer: 2 },
      { id: 3, difficulty: "intermediate", topic: "Neural Networks", question: "What is the purpose of an activation function?", options: ["To normalize input data", "To introduce non-linearity", "To reduce overfitting", "To calculate loss"], correctAnswer: 1 },
      { id: 4, difficulty: "intermediate", topic: "Data Processing", question: "What does feature scaling help with?", options: ["Increasing model accuracy", "Speeding up gradient descent convergence", "Reducing dataset size", "Adding more features"], correctAnswer: 1 },
      { id: 5, difficulty: "intermediate", topic: "Model Evaluation", question: "What is overfitting?", options: ["Model performs poorly on all data", "Model performs well on training but poor on test data", "Model is too simple", "Model has too few parameters"], correctAnswer: 1 },
      { id: 6, difficulty: "advanced", topic: "Deep Learning", question: "What is the vanishing gradient problem?", options: ["Gradients become too large", "Gradients become extremely small during backpropagation", "Model stops learning", "Loss function becomes zero"], correctAnswer: 1 },
      { id: 7, difficulty: "beginner", topic: "Python for ML", question: "Which Python library is most commonly used for ML?", options: ["Pandas", "NumPy", "Scikit-learn", "Matplotlib"], correctAnswer: 2 },
      { id: 8, difficulty: "intermediate", topic: "Neural Networks", question: "What is batch normalization used for?", options: ["Splitting data into batches", "Normalizing activations between layers", "Reducing model size", "Data augmentation"], correctAnswer: 1 }
    ],
    "Web Development": [
      { id: 1, difficulty: "beginner", topic: "HTML/CSS", question: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], correctAnswer: 1 },
      { id: 2, difficulty: "beginner", topic: "JavaScript", question: "Which keyword is used to declare a constant in JavaScript?", options: ["var", "let", "const", "constant"], correctAnswer: 2 },
      { id: 3, difficulty: "intermediate", topic: "React", question: "What is the virtual DOM in React?", options: ["A copy of the real DOM", "A lightweight representation of the DOM kept in memory", "A database for storing components", "A CSS framework"], correctAnswer: 1 },
      { id: 4, difficulty: "intermediate", topic: "HTTP", question: "Which HTTP method is used to update existing data?", options: ["GET", "POST", "PUT", "DELETE"], correctAnswer: 2 },
      { id: 5, difficulty: "beginner", topic: "HTML/CSS", question: "What does the div tag represent?", options: ["A division or section", "A data input field", "A document image", "A division calculation"], correctAnswer: 0 },
      { id: 6, difficulty: "intermediate", topic: "JavaScript", question: "What is a closure in JavaScript?", options: ["A way to close the browser", "A function with access to its outer scope", "A CSS property", "A type of loop"], correctAnswer: 1 },
      { id: 7, difficulty: "advanced", topic: "Performance", question: "What is lazy loading?", options: ["Slow internet connection", "Loading resources only when needed", "A CSS animation", "A JavaScript framework"], correctAnswer: 1 },
      { id: 8, difficulty: "intermediate", topic: "React", question: "What is the purpose of useEffect in React?", options: ["To style components", "To handle side effects", "To create components", "To manage routing"], correctAnswer: 1 }
    ],
    "Backend Engineering": [
      { id: 1, difficulty: "beginner", topic: "APIs", question: "What does REST stand for?", options: ["Remote Execution System Transfer", "Representational State Transfer", "Rapid Execution Service Transfer", "Real-time Event System Transfer"], correctAnswer: 1 },
      { id: 2, difficulty: "beginner", topic: "Databases", question: "Which of these is a relational database?", options: ["MongoDB", "Redis", "PostgreSQL", "Cassandra"], correctAnswer: 2 },
      { id: 3, difficulty: "intermediate", topic: "System Design", question: "What is the purpose of load balancing?", options: ["To reduce database size", "To distribute traffic across multiple servers", "To compress data", "To encrypt connections"], correctAnswer: 1 },
      { id: 4, difficulty: "intermediate", topic: "Security", question: "What is JWT used for?", options: ["Database queries", "User authentication and authorization", "File compression", "Email validation"], correctAnswer: 1 },
      { id: 5, difficulty: "beginner", topic: "Node.js", question: "What is Node.js?", options: ["A JavaScript framework", "A JavaScript runtime built on Chrome's V8 engine", "A database", "A CSS preprocessor"], correctAnswer: 1 },
      { id: 6, difficulty: "intermediate", topic: "Databases", question: "What is database indexing?", options: ["Sorting data alphabetically", "Creating a data structure to improve query speed", "Backing up data", "Encrypting data"], correctAnswer: 1 },
      { id: 7, difficulty: "advanced", topic: "System Design", question: "What is eventual consistency?", options: ["Data is always consistent", "Data becomes consistent over time", "Data is never consistent", "Data consistency is checked manually"], correctAnswer: 1 },
      { id: 8, difficulty: "intermediate", topic: "APIs", question: "What HTTP status code indicates a successful POST request?", options: ["200 OK", "201 Created", "204 No Content", "301 Moved Permanently"], correctAnswer: 1 }
    ],
    "Data Science": [
      { id: 1, difficulty: "beginner", topic: "Statistics", question: "What is the mean of a dataset?", options: ["The middle value", "The most frequent value", "The average value", "The range of values"], correctAnswer: 2 },
      { id: 2, difficulty: "beginner", topic: "Python", question: "Which library is used for data manipulation in Python?", options: ["NumPy", "Pandas", "Matplotlib", "Seaborn"], correctAnswer: 1 },
      { id: 3, difficulty: "intermediate", topic: "Statistics", question: "What does correlation measure?", options: ["The average of two variables", "The relationship between two variables", "The variance of data", "The probability distribution"], correctAnswer: 1 },
      { id: 4, difficulty: "intermediate", topic: "Data Visualization", question: "What is a histogram used for?", options: ["Showing relationships between variables", "Displaying the distribution of numerical data", "Comparing categories", "Showing trends over time"], correctAnswer: 1 },
      { id: 5, difficulty: "beginner", topic: "SQL", question: "What SQL command is used to retrieve data?", options: ["GET", "FETCH", "SELECT", "RETRIEVE"], correctAnswer: 2 },
      { id: 6, difficulty: "intermediate", topic: "Machine Learning", question: "What is cross-validation?", options: ["Validating data twice", "Testing model performance on different data splits", "Checking for missing values", "Comparing two models"], correctAnswer: 1 },
      { id: 7, difficulty: "advanced", topic: "Statistics", question: "What is a p-value?", options: ["The probability value", "The probability of obtaining results assuming null hypothesis is true", "The prediction value", "The perfect value"], correctAnswer: 1 },
      { id: 8, difficulty: "intermediate", topic: "Data Cleaning", question: "What is missing data imputation?", options: ["Removing missing data", "Filling in missing values with estimates", "Ignoring missing data", "Creating new data"], correctAnswer: 1 }
    ],
    "UI/UX Design": [
      { id: 1, difficulty: "beginner", topic: "Design Principles", question: "What does UI stand for?", options: ["Universal Interface", "User Interface", "Unique Interaction", "Unified Integration"], correctAnswer: 1 },
      { id: 2, difficulty: "beginner", topic: "Design Principles", question: "What is the purpose of whitespace in design?", options: ["To waste space", "To improve readability and focus", "To make designs look empty", "To reduce file size"], correctAnswer: 1 },
      { id: 3, difficulty: "intermediate", topic: "User Research", question: "What is a user persona?", options: ["A real user", "A fictional character representing a user type", "A user's profile picture", "A user's account settings"], correctAnswer: 1 },
      { id: 4, difficulty: "intermediate", topic: "Prototyping", question: "What is a wireframe?", options: ["A final design", "A low-fidelity sketch of layout and structure", "A coding framework", "A type of font"], correctAnswer: 1 },
      { id: 5, difficulty: "beginner", topic: "Color Theory", question: "What are complementary colors?", options: ["Colors next to each other on the color wheel", "Colors opposite each other on the color wheel", "Shades of the same color", "Black and white"], correctAnswer: 1 },
      { id: 6, difficulty: "intermediate", topic: "Usability", question: "What is the F-pattern in web design?", options: ["A design framework", "The pattern users' eyes follow when scanning content", "A font style", "A layout grid"], correctAnswer: 1 },
      { id: 7, difficulty: "advanced", topic: "Accessibility", question: "What is WCAG?", options: ["A design tool", "Web Content Accessibility Guidelines", "A color palette", "A JavaScript framework"], correctAnswer: 1 },
      { id: 8, difficulty: "intermediate", topic: "User Research", question: "What is A/B testing?", options: ["Testing two alphabets", "Comparing two versions to see which performs better", "Testing on mobile and desktop", "Testing with two users"], correctAnswer: 1 }
    ]
  };

  const questions = [
    { id: 1, category: "personality", question: "When solving a complex problem, you prefer to:", options: [{ text: "Break it into smaller logical steps", traits: { analytical: 3, systematic: 2 } }, { text: "Visualize and create a mental model", traits: { creative: 3, visual: 2 } }, { text: "Research existing solutions first", traits: { research: 3, methodical: 2 } }, { text: "Jump in and experiment", traits: { handson: 3, experimental: 2 } }] },
    { id: 2, category: "work_style", question: "Your ideal work environment is:", options: [{ text: "Quiet space for deep focus", traits: { analytical: 2, systematic: 2 } }, { text: "Collaborative team setting", traits: { social: 3, communication: 2 } }, { text: "Flexible with variety", traits: { creative: 2, adaptable: 3 } }, { text: "Independent with clear goals", traits: { independent: 3, goaloriented: 2 } }] },
    { id: 3, category: "technical", question: "Which statement resonates most with you?", options: [{ text: "I love working with data and finding patterns", traits: { analytical: 3, data: 3 } }, { text: "I enjoy creating visual and interactive experiences", traits: { creative: 3, visual: 3, design: 2 } }, { text: "I'm fascinated by how systems work internally", traits: { systematic: 3, technical: 3 } }, { text: "I like building things people can use", traits: { handson: 3, practical: 2 } }] },
    { id: 4, category: "learning", question: "You learn best by:", options: [{ text: "Reading documentation and theory", traits: { research: 3, theoretical: 2 } }, { text: "Watching tutorials and videos", traits: { visual: 3, guided: 2 } }, { text: "Building projects hands-on", traits: { handson: 3, practical: 3 } }, { text: "Taking structured courses", traits: { systematic: 2, goaloriented: 2 } }] },
    { id: 5, category: "interest", question: "What excites you most about technology?", options: [{ text: "Making computers think and learn (AI/ML)", traits: { analytical: 3, data: 3, research: 2 } }, { text: "Creating beautiful websites and apps", traits: { creative: 3, visual: 3, design: 3 } }, { text: "Protecting systems from threats", traits: { systematic: 3, analytical: 2, technical: 2 } }, { text: "Building scalable backend systems", traits: { systematic: 3, technical: 3, logical: 2 } }] },
    { id: 6, category: "strength", question: "People often come to you for:", options: [{ text: "Analyzing problems logically", traits: { analytical: 3, logical: 3 } }, { text: "Creative ideas and design input", traits: { creative: 3, innovative: 2 } }, { text: "Technical troubleshooting", traits: { technical: 3, systematic: 2 } }, { text: "Explaining complex things simply", traits: { communication: 3, teaching: 2 } }] },
    { id: 7, category: "motivation", question: "What motivates you most in projects?", options: [{ text: "Solving challenging puzzles", traits: { analytical: 3, challenge: 2 } }, { text: "Seeing your creation come to life", traits: { creative: 2, visual: 2, practical: 3 } }, { text: "Optimizing and improving efficiency", traits: { systematic: 3, optimization: 3 } }, { text: "Making an impact on users", traits: { empathy: 3, userFocused: 2 } }] },
    { id: 8, category: "technical_depth", question: "Do you enjoy math and statistics?", options: [{ text: "Yes, I love working with numbers", traits: { analytical: 3, data: 3, mathematical: 3 } }, { text: "It's okay, I can handle it", traits: { analytical: 1, logical: 1 } }, { text: "Not really my strength", traits: { creative: 2, visual: 2 } }, { text: "I prefer visual/creative thinking", traits: { creative: 3, design: 2 } }] }
  ];

  const careerPaths = {
    "AI/Machine Learning": { icon: Brain, color: "from-purple-500 to-pink-500", description: "Build intelligent systems that learn and make predictions", skills: ["Python", "TensorFlow", "Statistics", "Data Analysis"], weights: { analytical: 3, data: 3, research: 2, mathematical: 3, systematic: 2 } },
    "Web Development": { icon: Code, color: "from-blue-500 to-cyan-500", description: "Create beautiful, interactive websites and web applications", skills: ["HTML/CSS", "JavaScript", "React", "UI/UX Design"], weights: { creative: 3, visual: 3, handson: 2, practical: 3, design: 2 } },
    "Backend Engineering": { icon: TrendingUp, color: "from-emerald-500 to-teal-500", description: "Build scalable server systems and APIs that power applications", skills: ["Node.js/Python", "Databases", "System Design", "APIs"], weights: { systematic: 3, technical: 3, logical: 2, optimization: 3, analytical: 2 } },
    "Data Science": { icon: Sparkles, color: "from-orange-500 to-red-500", description: "Extract insights from data and build predictive models", skills: ["Python", "SQL", "Statistics", "Data Visualization"], weights: { analytical: 3, data: 3, mathematical: 3, research: 2, systematic: 2 } },
    "UI/UX Design": { icon: Zap, color: "from-violet-500 to-purple-500", description: "Design user experiences and beautiful interfaces", skills: ["Figma", "User Research", "Prototyping", "Visual Design"], weights: { creative: 3, visual: 3, design: 3, empathy: 2, userFocused: 3 } }
  };

  const calculateResults = () => {
    const traitScores = {};
    Object.values(answers).forEach(answer => {
      Object.entries(answer.traits).forEach(([trait, score]) => {
        traitScores[trait] = (traitScores[trait] || 0) + score;
      });
    });

    const careerScores = {};
    Object.entries(careerPaths).forEach(([career, config]) => {
      let score = 0;
      Object.entries(config.weights).forEach(([trait, weight]) => {
        score += (traitScores[trait] || 0) * weight;
      });
      careerScores[career] = score;
    });

    const sortedCareers = Object.entries(careerScores)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([career, score]) => ({ career, score, ...careerPaths[career] }));

    setResults(sortedCareers);
    setCurrentStep('results');
  };

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const startDomainQuiz = (career) => {
    setSelectedCareer(career);
    setDomainAnswers({});
    setCurrentQuestion(0);
    setCurrentStep('domainQuiz');
  };

  const handleDomainAnswer = (questionIndex, answerIndex) => {
    const newAnswers = { ...domainAnswers, [questionIndex]: answerIndex };
    setDomainAnswers(newAnswers);
    
    const quizQuestions = domainQuizzes[selectedCareer];
    if (questionIndex < quizQuestions.length - 1) {
      setCurrentQuestion(questionIndex + 1);
    } else {
      calculateDomainResults(newAnswers, quizQuestions);
    }
  };

  const calculateDomainResults = async (answers, quizQuestions) => {
    let correctCount = 0;
    const topicScores = {};

    Object.entries(answers).forEach(([questionIndex, answerIndex]) => {
      const question = quizQuestions[questionIndex];
      const isCorrect = answerIndex === question.correctAnswer;
      if (isCorrect) correctCount++;

      if (!topicScores[question.topic]) {
        topicScores[question.topic] = { correct: 0, total: 0 };
      }
      topicScores[question.topic].total++;
      if (isCorrect) topicScores[question.topic].correct++;
    });

    const score = Math.round((correctCount / quizQuestions.length) * 100);
    const percentile = Math.min(95, Math.max(5, score + Math.floor(Math.random() * 10) - 5));

    const weakAreas = Object.entries(topicScores)
      .map(([topic, scores]) => ({
        topic,
        accuracy: Math.round((scores.correct / scores.total) * 100)
      }))
      .filter(area => area.accuracy < 60)
      .sort((a, b) => a.accuracy - b.accuracy);

    const resultsData = { score, percentile, correctCount, totalQuestions: quizQuestions.length, weakAreas, answers };
    setDomainResults(resultsData);

    // Store achievement on blockchain if wallet is connected
    if (walletAddress && score >= 50) {
      try {
        await algorandAPI.storeAchievement(walletAddress, {
          career: selectedCareer,
          score: score,
          percentile: percentile,
          weakAreas: weakAreas.map(area => area.topic)
        });
      } catch (error) {
        console.error('Error storing achievement:', error);
      }
    }

    setCurrentStep('domainResults');
  };

  const mintNFTBadge = async () => {
    if (!walletAddress) {
      alert('Please connect your wallet first!');
      return;
    }

    setMintingBadge(true);
    try {
      const response = await algorandAPI.mintBadge(
        walletAddress,
        selectedCareer,
        domainResults.score,
        domainResults.percentile
      );

      if (response.success) {
        setBadgeMinted(true);
        alert(`Badge minted successfully! Asset ID: ${response.data.assetId}`);
      }
    } catch (error) {
      console.error('Error minting badge:', error);
      alert('Failed to mint badge. Make sure your wallet has enough ALGO for transaction fees.');
    } finally {
      setMintingBadge(false);
    }
  };

  const progress = ((currentQuestion + 1) / (currentStep === 'domainQuiz' ? domainQuizzes[selectedCareer].length : questions.length)) * 100;

  if (currentStep === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col p-4 relative overflow-hidden">
        {/* Header with Wallet */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <span className="text-xl font-bold text-white">Cred-AI-ble</span>
          </div>
          <WalletConnect />
        </div>

        {/* Dark Mode Toggle - Fixed Bottom Right */}
        <button
          onClick={toggleDarkMode}
          className="fixed bottom-8 right-8 z-50 p-4 bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl hover:bg-slate-700/80 transition-all duration-300 hover:scale-110 shadow-xl hover:shadow-2xl group"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="w-6 h-6 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
          ) : (
            <Moon className="w-6 h-6 text-blue-400 group-hover:rotate-180 transition-transform duration-500" />
          )}
        </button>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="max-w-3xl w-full relative mx-auto flex-1 flex items-center justify-center">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 p-8 md:p-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full">
                    <Sparkles className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">Discover Your Path</h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">AI-powered career discovery to unlock your potential in technology. Answer 8 questions to reveal your ideal tech career path.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 hover:border-purple-500/50 transition-all duration-300">
                  <Target className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <div className="font-semibold text-white mb-1">Precision Match</div>
                  <div className="text-sm text-slate-400">AI-driven analysis</div>
                </div>
                <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 hover:border-blue-500/50 transition-all duration-300">
                  <Zap className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                  <div className="font-semibold text-white mb-1">3 Minutes</div>
                  <div className="text-sm text-slate-400">Quick & seamless</div>
                </div>
                <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 hover:border-pink-500/50 transition-all duration-300">
                  <Rocket className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                  <div className="font-semibold text-white mb-1">Personalized</div>
                  <div className="text-sm text-slate-400">Tailored insights</div>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <button onClick={() => setCurrentStep('quiz')} className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                  <span>Begin Your Journey</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                {walletAddress && (
                  <button onClick={() => setCurrentStep('badges')} className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105">
                    <Trophy className="w-5 h-5" />
                    <span>View My Badges</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'results') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 py-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-full">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-white via-emerald-200 to-teal-200 bg-clip-text text-transparent">Your Career Matches</h1>
            <p className="text-slate-400 text-lg">Powered by advanced personality analysis</p>
          </div>
          <div className="space-y-6">
            {results.map((result, index) => {
              const Icon = result.icon;
              const matchPercentage = Math.round((result.score / results[0].score) * 100);
              return (
                <div key={result.career} className="group bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 hover:border-slate-600/50 transition-all duration-500 hover:scale-[1.02]">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className={`bg-gradient-to-br ${result.color} p-4 rounded-2xl shadow-lg`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-3xl font-bold text-white">{result.career}</h3>
                        {index === 0 && <span className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-full">Best Match</span>}
                        <span className="ml-auto text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">{matchPercentage}%</span>
                      </div>
                      <p className="text-slate-300 mb-5 text-lg">{result.description}</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {result.skills.map(skill => (
                          <span key={skill} className="px-4 py-2 bg-slate-700/50 text-slate-200 text-sm rounded-xl border border-slate-600/30 backdrop-blur-sm">{skill}</span>
                        ))}
                      </div>
                      <div className="relative bg-slate-700/30 rounded-full h-3 overflow-hidden mb-4">
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-600/20 to-transparent"></div>
                        <div className={`h-full bg-gradient-to-r ${result.color} rounded-full transition-all duration-1000 shadow-lg`} style={{ width: `${matchPercentage}%` }}></div>
                      </div>
                      <button onClick={() => startDomainQuiz(result.career)} className={`inline-flex items-center gap-2 bg-gradient-to-r ${result.color} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                        <Award className="w-5 h-5" />
                        <span>Take {result.career} Assessment</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-12 bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-10 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Start Learning?</h3>
            <p className="text-slate-300 mb-8 text-lg max-w-2xl mx-auto">Take a domain-specific assessment to see where you stand and receive a personalized learning roadmap tailored to your goals.</p>
            <button onClick={() => { setCurrentStep('welcome'); setCurrentQuestion(0); setAnswers({}); setResults(null); }} className="group inline-flex items-center gap-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Take Quiz Again</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'domainQuiz') {
    const quizQuestions = domainQuizzes[selectedCareer];
    const question = quizQuestions[currentQuestion];
    const careerInfo = careerPaths[selectedCareer];
    const Icon = careerInfo.icon;

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 py-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto relative">
          <div className="mb-8 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className={`bg-gradient-to-br ${careerInfo.color} p-3 rounded-xl`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">{selectedCareer} Assessment</h2>
            </div>
            <p className="text-slate-400">Test your knowledge and get your percentile score</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-slate-400">Question {currentQuestion + 1} of {quizQuestions.length}</span>
              <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{Math.round(progress)}% Complete</span>
            </div>
            <div className="relative bg-slate-800/50 rounded-full h-2.5 overflow-hidden backdrop-blur-sm border border-slate-700/50">
              <div className={`bg-gradient-to-r ${careerInfo.color} h-full rounded-full transition-all duration-500 shadow-lg`} style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 md:p-12 shadow-2xl">
            <div className="flex items-start gap-3 mb-6">
              <span className={`px-3 py-1 bg-gradient-to-r ${careerInfo.color} text-white text-xs font-semibold rounded-full`}>{question.difficulty}</span>
              <span className="px-3 py-1 bg-slate-700/50 text-slate-300 text-xs font-semibold rounded-full">{question.topic}</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 leading-tight">{question.question}</h2>

            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button key={index} onClick={() => handleDomainAnswer(currentQuestion, index)} className="group w-full text-left p-6 rounded-2xl bg-slate-700/30 border-2 border-slate-600/30 hover:border-purple-500/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm">
                  <div className="flex items-center gap-5">
                    <div className="w-10 h-10 rounded-xl border-2 border-slate-500 group-hover:border-purple-400 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-purple-500/20">
                      <div className="w-5 h-5 rounded-lg bg-transparent group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300" />
                    </div>
                    <span className="text-lg text-slate-200 group-hover:text-white transition-colors duration-300">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {currentQuestion > 0 && (
              <button onClick={() => setCurrentQuestion(currentQuestion - 1)} className="mt-8 inline-flex items-center gap-2 text-slate-400 hover:text-white font-medium transition-colors duration-300 group">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Previous Question
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'domainResults') {
    const careerInfo = careerPaths[selectedCareer];
    const quizQuestions = domainQuizzes[selectedCareer];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 py-12 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${careerInfo.color} rounded-full blur-xl opacity-50 animate-pulse`}></div>
                <div className={`relative bg-gradient-to-r ${careerInfo.color} p-4 rounded-full`}>
                  <Award className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">Assessment Complete!</h1>
            <p className="text-slate-400 text-lg">{selectedCareer} Skills Evaluation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">{domainResults.score}%</div>
              <div className="text-slate-400 text-sm">Your Score</div>
              <div className="mt-4 text-xs text-slate-500">{domainResults.correctCount} of {domainResults.totalQuestions} correct</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">{domainResults.percentile}th</div>
              <div className="text-slate-400 text-sm">Percentile</div>
              <div className="mt-4 text-xs text-slate-500">Better than {domainResults.percentile}% of learners</div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">{domainResults.weakAreas.length}</div>
              <div className="text-slate-400 text-sm">Focus Areas</div>
              <div className="mt-4 text-xs text-slate-500">Topics to improve</div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6" />
              Your Results Breakdown
            </h3>
            <div className="space-y-4">
              {quizQuestions.map((q, index) => {
                const userAnswer = domainResults.answers[index];
                const isCorrect = userAnswer === q.correctAnswer;
                return (
                  <div key={index} className={`p-5 rounded-2xl border-2 ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${isCorrect ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                        {isCorrect ? <CheckCircle className="w-6 h-6 text-emerald-400" /> : <XCircle className="w-6 h-6 text-red-400" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-slate-300 font-medium">Question {index + 1}</span>
                          <span className="px-2 py-1 bg-slate-700/50 text-slate-400 text-xs rounded-full">{q.topic}</span>
                        </div>
                        <p className="text-white mb-3">{q.question}</p>
                        <div className="space-y-2">
                          <div className={`text-sm ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                            Your answer: {q.options[userAnswer]}
                          </div>
                          {!isCorrect && (
                            <div className="text-sm text-emerald-400">
                              Correct answer: {q.options[q.correctAnswer]}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {domainResults.weakAreas.length > 0 && (
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <TrendingDown className="w-6 h-6 text-orange-400" />
                Areas to Focus On
              </h3>
              <div className="space-y-4">
                {domainResults.weakAreas.map((area, index) => (
                  <div key={index} className="p-5 rounded-2xl bg-slate-700/30 border border-slate-600/30">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-white font-semibold">{area.topic}</span>
                      <span className="text-orange-400 font-bold">{area.accuracy}%</span>
                    </div>
                    <div className="relative bg-slate-600/30 rounded-full h-2 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-500/20 to-transparent"></div>
                      <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000" style={{ width: `${area.accuracy}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mint NFT Badge Section */}
          {walletAddress && domainResults.score >= 50 && (
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-xl rounded-3xl border border-yellow-500/30 p-10 text-center mb-8">
              <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-white mb-3">Claim Your NFT Badge!</h3>
              <p className="text-slate-300 mb-6 text-lg max-w-2xl mx-auto">
                You scored {domainResults.score}%! Mint an NFT badge to permanently store this achievement on the Algorand blockchain.
              </p>
              {badgeMinted ? (
                <div className="inline-flex items-center gap-3 bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 px-8 py-4 rounded-2xl font-semibold">
                  <CheckCircle className="w-6 h-6" />
                  <span>Badge Minted Successfully!</span>
                </div>
              ) : (
                <button
                  onClick={mintNFTBadge}
                  disabled={mintingBadge}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {mintingBadge ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Minting NFT Badge...</span>
                    </>
                  ) : (
                    <>
                      <Award className="w-6 h-6" />
                      <span>Mint NFT Badge</span>
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {!walletAddress && domainResults.score >= 50 && (
            <div className="bg-purple-500/10 backdrop-blur-xl rounded-3xl border border-purple-500/30 p-10 text-center mb-8">
              <Award className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-3">Great Score! Connect Your Wallet</h3>
              <p className="text-slate-300 mb-6">
                Connect your Algorand wallet to mint an NFT badge and permanently store your achievement on the blockchain.
              </p>
              <WalletConnect />
            </div>
          )}

          <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-10 text-center">
            <h3 className="text-3xl font-bold text-white mb-4">What's Next?</h3>
            <p className="text-slate-300 mb-8 text-lg max-w-2xl mx-auto">
              Based on your results, we'll create a personalized learning roadmap with courses, tutorials, and resources to help you master {selectedCareer}.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button onClick={() => { setCurrentStep('results'); setDomainResults(null); setBadgeMinted(false); }} className="group inline-flex items-center gap-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span>Back to Career Results</span>
              </button>
              {walletAddress && (
                <button onClick={() => setCurrentStep('badges')} className="group inline-flex items-center gap-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105">
                  <Trophy className="w-5 h-5" />
                  <span>View My Badges</span>
                </button>
              )}
              <button onClick={() => { setCurrentStep('welcome'); setCurrentQuestion(0); setAnswers({}); setResults(null); setDomainResults(null); setBadgeMinted(false); }} className={`inline-flex items-center gap-3 bg-gradient-to-r ${careerInfo.color} text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105`}>
                <Rocket className="w-5 h-5" />
                <span>Start Over</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Badges view page
  if (currentStep === 'badges') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 py-12 relative overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <span className="text-xl font-bold text-white">Cred-AI-ble</span>
          </div>
          <WalletConnect />
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto relative pt-24">
          <BadgeDisplay />

          <div className="mt-8 text-center">
            <button
              onClick={() => setCurrentStep('welcome')}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-slate-400">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{Math.round(progress)}% Complete</span>
          </div>
          <div className="relative bg-slate-800/50 rounded-full h-2.5 overflow-hidden backdrop-blur-sm border border-slate-700/50">
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 h-full rounded-full transition-all duration-500 shadow-lg shadow-purple-500/50" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700/50 p-8 md:p-12 shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 leading-tight">{question.question}</h2>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)} className="group w-full text-left p-6 rounded-2xl bg-slate-700/30 border-2 border-slate-600/30 hover:border-purple-500/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm">
                <div className="flex items-center gap-5">
                  <div className="w-10 h-10 rounded-xl border-2 border-slate-500 group-hover:border-purple-400 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-purple-500/20">
                    <div className="w-5 h-5 rounded-lg bg-transparent group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300" />
                  </div>
                  <span className="text-lg text-slate-200 group-hover:text-white transition-colors duration-300">{option.text}</span>
                </div>
              </button>
            ))}
          </div>

          {currentQuestion > 0 && (
            <button onClick={() => setCurrentQuestion(currentQuestion - 1)} className="mt-8 inline-flex items-center gap-2 text-slate-400 hover:text-white font-medium transition-colors duration-300 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Previous Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareerQuizApp;
