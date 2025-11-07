import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowLeft, Sparkles, Brain, Code, TrendingUp, Zap, Target, Rocket, Award, CheckCircle, XCircle, TrendingDown, BookOpen, Wallet, LogOut, Loader, Flame, Crown, Gift, BarChart3, Settings, Moon, Sun } from 'lucide-react';

const CredAIbleApp = () => {
  // Wallet & Auth State
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [userBalance, setUserBalance] = useState(0);
  const [darkMode, setDarkMode] = useState(true);

  // Navigation State
  const [currentStep, setCurrentStep] = useState('welcome');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  
  // Quiz State
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [domainAnswers, setDomainAnswers] = useState({});
  const [domainResults, setDomainResults] = useState(null);
  const [loading, setLoading] = useState(false);

  // Gamification State
  const [userPoints, setUserPoints] = useState(1250);
  const [userStreak, setUserStreak] = useState(7);
  const [userBadges, setUserBadges] = useState([1, 2, 3]);
  const [achievements, setAchievements] = useState([]);
  const [showAchievementPopup, setShowAchievementPopup] = useState(false);
  const [latestAchievement, setLatestAchievement] = useState(null);

  // Data
  const badges = [
    { id: 1, name: 'Career Explorer', icon: '🔍', description: 'Complete your first quiz', color: 'from-blue-500 to-blue-600' },
    { id: 2, name: 'Quick Learner', icon: '⚡', description: 'Score 80% or higher', color: 'from-yellow-500 to-yellow-600' },
    { id: 3, name: 'Skill Master', icon: '🏆', description: 'Complete 3 quizzes', color: 'from-purple-500 to-purple-600' },
    { id: 4, name: 'Blockchain Pro', icon: '⛓️', description: 'Verify credentials on-chain', color: 'from-green-500 to-green-600' },
  ];

  const leaderboard = [
    { rank: 1, name: 'You', points: userPoints, streak: userStreak, icon: '👑' },
    { rank: 2, name: 'Alex Chen', points: 2850, streak: 15, icon: '🥈' },
    { rank: 3, name: 'Jordan Smith', points: 2650, streak: 12, icon: '🥉' },
    { rank: 4, name: 'Morgan Lee', points: 2100, streak: 8 },
    { rank: 5, name: 'Casey Rivera', points: 1890, streak: 6 },
  ];

  const allAchievements = [
    { id: 1, name: 'First Steps', icon: '👣', description: 'Take your first quiz', points: 100, unlocked: true },
    { id: 2, name: 'Perfectionist', icon: '💯', description: 'Score 100% on any quiz', points: 250, unlocked: true },
    { id: 3, name: 'Week Warrior', icon: '🔥', description: 'Maintain 7-day streak', points: 500, unlocked: true },
    { id: 4, name: 'Badge Collector', icon: '🎖️', description: 'Earn all 4 badges', points: 1000, unlocked: false },
    { id: 5, name: 'Blockchain Pioneer', icon: '⛓️', description: 'Mint your first NFT', points: 300, unlocked: false },
  ];

  const domainQuizzes = {
    "AI/Machine Learning": [
      { id: 1, difficulty: "beginner", topic: "ML Fundamentals", question: "What is supervised learning?", options: ["Learning without labeled data", "Learning from labeled training data", "Learning through trial and error", "Learning by observing patterns"], correctAnswer: 1 },
      { id: 2, difficulty: "beginner", topic: "ML Fundamentals", question: "Which of these is a classification algorithm?", options: ["Linear Regression", "K-Means", "Logistic Regression", "PCA"], correctAnswer: 2 },
      { id: 3, difficulty: "intermediate", topic: "Neural Networks", question: "What is the purpose of an activation function?", options: ["To normalize input data", "To introduce non-linearity", "To reduce overfitting", "To calculate loss"], correctAnswer: 1 },
      { id: 4, difficulty: "intermediate", topic: "Data Processing", question: "What does feature scaling help with?", options: ["Increasing model accuracy", "Speeding up gradient descent convergence", "Reducing dataset size", "Adding more features"], correctAnswer: 1 },
      { id: 5, difficulty: "intermediate", topic: "Model Evaluation", question: "What is overfitting?", options: ["Model performs poorly on all data", "Model performs well on training but poor on test data", "Model is too simple", "Model has too few parameters"], correctAnswer: 1 },
    ],
    "Web Development": [
      { id: 1, difficulty: "beginner", topic: "HTML/CSS", question: "What does CSS stand for?", options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"], correctAnswer: 1 },
      { id: 2, difficulty: "beginner", topic: "JavaScript", question: "Which keyword is used to declare a constant in JavaScript?", options: ["var", "let", "const", "constant"], correctAnswer: 2 },
      { id: 3, difficulty: "intermediate", topic: "React", question: "What is the virtual DOM in React?", options: ["A copy of the real DOM", "A lightweight representation of the DOM kept in memory", "A database for storing components", "A CSS framework"], correctAnswer: 1 },
      { id: 4, difficulty: "intermediate", topic: "HTTP", question: "Which HTTP method is used to update existing data?", options: ["GET", "POST", "PUT", "DELETE"], correctAnswer: 2 },
      { id: 5, difficulty: "beginner", topic: "HTML/CSS", question: "What does the div tag represent?", options: ["A division or section", "A data input field", "A document image", "A division calculation"], correctAnswer: 0 },
    ],
    "Backend Engineering": [
      { id: 1, difficulty: "beginner", topic: "APIs", question: "What does REST stand for?", options: ["Remote Execution System Transfer", "Representational State Transfer", "Rapid Execution Service Transfer", "Real-time Event System Transfer"], correctAnswer: 1 },
      { id: 2, difficulty: "beginner", topic: "Databases", question: "Which of these is a relational database?", options: ["MongoDB", "Redis", "PostgreSQL", "Cassandra"], correctAnswer: 2 },
      { id: 3, difficulty: "intermediate", topic: "System Design", question: "What is the purpose of load balancing?", options: ["To reduce database size", "To distribute traffic across multiple servers", "To compress data", "To encrypt connections"], correctAnswer: 1 },
      { id: 4, difficulty: "intermediate", topic: "Security", question: "What is JWT used for?", options: ["Database queries", "User authentication and authorization", "File compression", "Email validation"], correctAnswer: 1 },
      { id: 5, difficulty: "beginner", topic: "Node.js", question: "What is Node.js?", options: ["A JavaScript framework", "A JavaScript runtime built on Chrome's V8 engine", "A database", "A CSS preprocessor"], correctAnswer: 1 },
    ],
    "Data Science": [
      { id: 1, difficulty: "beginner", topic: "Statistics", question: "What is the mean of a dataset?", options: ["The middle value", "The most frequent value", "The average value", "The range of values"], correctAnswer: 2 },
      { id: 2, difficulty: "beginner", topic: "Python", question: "Which library is used for data manipulation in Python?", options: ["NumPy", "Pandas", "Matplotlib", "Seaborn"], correctAnswer: 1 },
      { id: 3, difficulty: "intermediate", topic: "Statistics", question: "What does correlation measure?", options: ["The average of two variables", "The relationship between two variables", "The variance of data", "The probability distribution"], correctAnswer: 1 },
      { id: 4, difficulty: "intermediate", topic: "Data Visualization", question: "What is a histogram used for?", options: ["Showing relationships between variables", "Displaying the distribution of numerical data", "Comparing categories", "Showing trends over time"], correctAnswer: 1 },
      { id: 5, difficulty: "beginner", topic: "SQL", question: "What SQL command is used to retrieve data?", options: ["GET", "FETCH", "SELECT", "RETRIEVE"], correctAnswer: 2 },
    ],
    "UI/UX Design": [
      { id: 1, difficulty: "beginner", topic: "Design Principles", question: "What does UI stand for?", options: ["Universal Interface", "User Interface", "Unique Interaction", "Unified Integration"], correctAnswer: 1 },
      { id: 2, difficulty: "beginner", topic: "Design Principles", question: "What is the purpose of whitespace in design?", options: ["To waste space", "To improve readability and focus", "To make designs look empty", "To reduce file size"], correctAnswer: 1 },
      { id: 3, difficulty: "intermediate", topic: "User Research", question: "What is a user persona?", options: ["A real user", "A fictional character representing a user type", "A user's profile picture", "A user's account settings"], correctAnswer: 1 },
      { id: 4, difficulty: "intermediate", topic: "Prototyping", question: "What is a wireframe?", options: ["A final design", "A low-fidelity sketch of layout and structure", "A coding framework", "A type of font"], correctAnswer: 1 },
      { id: 5, difficulty: "beginner", topic: "Color Theory", question: "What are complementary colors?", options: ["Colors next to each other on the color wheel", "Colors opposite each other on the color wheel", "Shades of the same color", "Black and white"], correctAnswer: 1 },
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

  // Wallet Functions
  const handleConnectWallet = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockAddress = 'PBOQ6GQA3BXVTXZPC52DYUAGTSX5WKCFWL7JCEJPUH3OIB6ACWDWDGC44M';
      setWalletAddress(mockAddress.substring(0, 10) + '...' + mockAddress.substring(mockAddress.length - 6));
      setWalletConnected(true);
      setUserBalance(10.5);
    } catch (error) {
      console.error('Wallet connection failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = () => {
    setWalletConnected(false);
    setWalletAddress('');
    setCurrentStep('welcome');
  };

  // Gamification Functions
  const unlockAchievement = (achievementId, name, points) => {
    setLatestAchievement({ name, points });
    setShowAchievementPopup(true);
    setUserPoints(prev => prev + points);
    setTimeout(() => setShowAchievementPopup(false), 3000);
  };

  // Quiz Functions
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
    unlockAchievement(1, 'First Steps', 100);
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
    setLoading(true);
    try {
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

      await new Promise(resolve => setTimeout(resolve, 2000));

      const newBadges = [...userBadges];
      if (!newBadges.includes(1)) newBadges.push(1);
      if (score >= 80 && !newBadges.includes(2)) {
        newBadges.push(2);
        unlockAchievement(2, 'Perfectionist', 250);
      }
      if (userBadges.length >= 2 && !newBadges.includes(3)) newBadges.push(3);

      setUserBadges(newBadges);
      setUserPoints(prev => prev + 100);
      setUserStreak(prev => prev + 1);

      const weakAreas = Object.entries(topicScores)
        .map(([topic, scores]) => ({
          topic,
          accuracy: Math.round((scores.correct / scores.total) * 100)
        }))
        .filter(area => area.accuracy < 60)
        .sort((a, b) => a.accuracy - b.accuracy);

      setDomainResults({ score, percentile, correctCount, totalQuestions: quizQuestions.length, weakAreas, answers });
      setCurrentStep('domainResults');
    } finally {
      setLoading(false);
    }
  };

  const progress = ((currentQuestion + 1) / (currentStep === 'domainQuiz' ? domainQuizzes[selectedCareer].length : questions.length)) * 100;

  const bgClass = darkMode ? 'bg-gray-950' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-gray-900';
  const cardClass = darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200';

  // WELCOME PAGE
  if (currentStep === 'welcome') {
    return (
      <div className={`min-h-screen ${bgClass} relative overflow-hidden`}>
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10">
          {/* Header with Theme Toggle */}
          <div className="flex justify-between items-center p-6 max-w-6xl mx-auto">
            <h1 className={`text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`}>Cred-AI-ble</h1>
            <button onClick={() => setDarkMode(!darkMode)} className={`p-3 rounded-xl ${cardClass} border hover:scale-110 transition`}>
              {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-blue-600" />}
            </button>
          </div>

          {/* Main Content */}
          <div className="flex items-center justify-center min-h-[calc(100vh-100px)] p-4">
            <div className="max-w-2xl w-full">
              <div className={`${cardClass} border rounded-3xl shadow-2xl p-8 md:p-12 backdrop-blur-xl`}>
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                      <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-full">
                        <Sparkles className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  </div>
                  <h1 className={`text-5xl md:text-6xl font-bold mb-4 ${textClass}`}>Discover Your Path</h1>
                  <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8`}>
                    AI-powered career discovery + blockchain-verified credentials. In 5 minutes.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className={`${cardClass} border rounded-2xl p-4 text-center hover:scale-105 transition`}>
                    <Target className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Precision</p>
                    <p className={`text-lg font-bold ${textClass}`}>99%</p>
                  </div>
                  <div className={`${cardClass} border rounded-2xl p-4 text-center hover:scale-105 transition`}>
                    <Zap className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Speed</p>
                    <p className={`text-lg font-bold ${textClass}`}>5 min</p>
                  </div>
                  <div className={`${cardClass} border rounded-2xl p-4 text-center hover:scale-105 transition`}>
                    <Rocket className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Impact</p>
                    <p className={`text-lg font-bold ${textClass}`}>Real</p>
                  </div>
                </div>

                {/* Wallet Connection */}
                {!walletConnected ? (
                  <div className={`${cardClass} border rounded-2xl p-6 mb-8 hover:border-purple-500 transition`}>
                    <Wallet className="w-8 h-8 text-purple-500 mx-auto mb-3" />
                    <p className={`text-center mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Connect your Algorand wallet</p>
                    <button
                      onClick={handleConnectWallet}
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50"
                    >
                      {loading ? 'Connecting...' : 'Connect Wallet'}
                    </button>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 mb-8">
                    <p className="text-sm text-green-600 font-semibold mb-2">✓ Wallet Connected</p>
                    <p className="text-lg font-mono font-bold text-green-700 mb-4">{walletAddress}</p>
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm text-green-600">Balance</p>
                        <p className="text-lg font-bold text-green-700">{userBalance.toFixed(2)} ALGO</p>
                      </div>
                      <div>
                        <p className="text-sm text-green-600">Points</p>
                        <p className="text-lg font-bold text-green-700">{userPoints}</p>
                      </div>
                      <div>
                        <p className="text-sm text-green-600">Streak</p>
                        <p className="text-lg font-bold text-green-700">🔥 {userStreak}</p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    if (!walletConnected) {
                      alert('Please connect your wallet first');
                      return;
                    }
                    setCurrentStep('quiz');
                    setCurrentQuestion(0);
                  }}
                  className={`w-full group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 ${!walletConnected ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span>Start Your Journey</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {walletConnected && (
                  <button
                    onClick={handleDisconnect}
                    className={`mt-4 w-full ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'} font-semibold transition flex items-center justify-center gap-2`}
                  >
                    <LogOut size={16} />
                    Disconnect Wallet
                  </button>
                )}
              </div>

              {/* Leaderboard Preview */}
              <div className={`${cardClass} border rounded-2xl p-6 mt-8 backdrop-blur-xl`}>
                <div className="flex items-center gap-2 mb-4">
                  <Crown className="w-5 h-5 text-yellow-500" />
                  <h3 className={`text-lg font-bold ${textClass}`}>Top Performers</h3>
                </div>
                <div className="space-y-2">
                  {leaderboard.slice(0, 3).map((user, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/50 transition">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{user.icon || ['🥇', '🥈', '🥉'][idx]}</span>
                        <div>
                          <p className={`font-semibold ${textClass}`}>{user.name}</p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.points} pts • 🔥 {user.streak}</p>
                        </div>
                      </div>
                      <p className={`font-bold text-lg ${textClass}`}>#{user.rank}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // QUIZ PAGE
  if (currentStep === 'quiz') {
    const question = questions[currentQuestion];
    return (
      <div className={`min-h-screen ${bgClass} p-4 py-12`}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{Math.round(progress)}%</span>
            </div>
            <div className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-full h-3 overflow-hidden`}>
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 h-3 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <div className={`${cardClass} border rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-xl`}>
            <h2 className={`text-3xl md:text-4xl font-bold mb-10 leading-tight ${textClass}`}>{question.question}</h2>

            <div className="space-y-4 mb-8">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`group w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                    answers[currentQuestion] === index
                      ? `${darkMode ? 'border-purple-500 bg-purple-500/20' : 'border-purple-500 bg-purple-100'}`
                      : `${darkMode ? 'border-gray-700 bg-gray-800 hover:border-purple-500' : 'border-gray-300 bg-gray-50 hover:border-purple-500'}`
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-xl border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      answers[currentQuestion] === index
                        ? 'border-purple-500 bg-purple-500'
                        : `border-gray-500 group-hover:border-purple-500`
                    }`}>
                      {answers[currentQuestion] === index && <CheckCircle size={20} className="text-white" />}
                    </div>
                    <span className={`text-lg font-semibold group-hover:text-purple-500 transition ${textClass}`}>{option.text}</span>
                  </div>
                </button>
              ))}
            </div>

            {currentQuestion > 0 && (
              <button
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="inline-flex items-center gap-2 text-purple-500 hover:text-purple-400 font-semibold transition"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // RESULTS PAGE
  if (currentStep === 'results') {
    return (
      <div className={`min-h-screen ${bgClass} p-4 py-12`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 p-4 rounded-full">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <h1 className={`text-5xl font-bold mb-3 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent`}>Your Career Matches</h1>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Powered by advanced AI analysis</p>
          </div>

          <div className="space-y-6 mb-12">
            {results.map((result, index) => {
              const Icon = result.icon;
              const matchPercentage = Math.round((result.score / results[0].score) * 100);
              return (
                <div key={result.career} className={`group ${cardClass} border rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]`}>
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className={`bg-gradient-to-br ${result.color} p-4 rounded-2xl shadow-lg`}>
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className={`text-3xl font-bold ${textClass}`}>{result.career}</h3>
                        {index === 0 && <span className="px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold rounded-full">Best Match</span>}
                        <span className={`ml-auto text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent`}>{matchPercentage}%</span>
                      </div>
                      <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-5 text-lg`}>{result.description}</p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {result.skills.map(skill => (
                          <span key={skill} className={`px-4 py-2 ${darkMode ? 'bg-gray-800 text-gray-200' : 'bg-gray-100 text-gray-800'} text-sm rounded-xl border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>{skill}</span>
                        ))}
                      </div>
                      <div className={`relative ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-full h-3 overflow-hidden mb-4`}>
                        <div className={`h-full bg-gradient-to-r ${result.color} rounded-full`} style={{ width: `${matchPercentage}%` }}></div>
                      </div>
                      <button onClick={() => startDomainQuiz(result.career)} className={`inline-flex items-center gap-2 bg-gradient-to-r ${result.color} text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                        <Award className="w-5 h-5" />
                        <span>Take Assessment</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={`${cardClass} border rounded-3xl p-10 text-center`}>
            <h3 className={`text-3xl font-bold ${textClass} mb-4`}>Ready to Earn Badges?</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8 text-lg max-w-2xl mx-auto`}>Take a domain-specific assessment to validate your skills and earn blockchain-verified NFT badges.</p>
          </div>
        </div>
      </div>
    );
  }

  // DOMAIN QUIZ
  if (currentStep === 'domainQuiz') {
    const quizQuestions = domainQuizzes[selectedCareer];
    const question = quizQuestions[currentQuestion];
    const careerInfo = careerPaths[selectedCareer];
    const Icon = careerInfo.icon;

    return (
      <div className={`min-h-screen ${bgClass} p-4 py-12`}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className={`bg-gradient-to-br ${careerInfo.color} p-3 rounded-xl`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h2 className={`text-2xl font-bold ${textClass}`}>{selectedCareer}</h2>
            </div>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Validate your knowledge</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Question {currentQuestion + 1} of {quizQuestions.length}</span>
              <span className="text-sm font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{Math.round(progress)}%</span>
            </div>
            <div className={`w-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} rounded-full h-3 overflow-hidden`}>
              <div className={`bg-gradient-to-r ${careerInfo.color} h-3 rounded-full transition-all duration-500`} style={{ width: `${progress}%` }}></div>
            </div>
          </div>

          <div className={`${cardClass} border rounded-3xl p-8 md:p-12 shadow-2xl`}>
            <div className="flex items-start gap-3 mb-6">
              <span className={`px-3 py-1 bg-gradient-to-r ${careerInfo.color} text-white text-xs font-semibold rounded-full`}>{question.difficulty}</span>
              <span className={`px-3 py-1 ${darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'} text-xs font-semibold rounded-full`}>{question.topic}</span>
            </div>

            <h2 className={`text-3xl md:text-4xl font-bold mb-10 leading-tight ${textClass}`}>{question.question}</h2>

            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleDomainAnswer(currentQuestion, index)}
                  className={`group w-full text-left p-6 rounded-2xl border-2 transition-all duration-300 ${
                    domainAnswers[currentQuestion] === index
                      ? `${darkMode ? 'border-purple-500 bg-purple-500/20' : 'border-purple-500 bg-purple-100'}`
                      : `${darkMode ? 'border-gray-700 bg-gray-800 hover:border-purple-500' : 'border-gray-300 bg-gray-50 hover:border-purple-500'}`
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-xl border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      domainAnswers[currentQuestion] === index
                        ? 'border-purple-500 bg-purple-500'
                        : `border-gray-500 group-hover:border-purple-500`
                    }`}>
                      {domainAnswers[currentQuestion] === index && <CheckCircle size={20} className="text-white" />}
                    </div>
                    <span className={`text-lg font-semibold group-hover:text-purple-500 transition ${textClass}`}>{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {currentQuestion > 0 && (
              <button
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="inline-flex items-center gap-2 text-purple-500 hover:text-purple-400 font-semibold transition mt-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // DOMAIN RESULTS
  if (currentStep === 'domainResults') {
    const careerInfo = careerPaths[selectedCareer];
    const Icon = careerInfo.icon;

    return (
      <div className={`min-h-screen ${bgClass} p-4 py-12`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${careerInfo.color} rounded-full blur-xl opacity-50 animate-pulse`}></div>
                <div className={`relative bg-gradient-to-r ${careerInfo.color} p-4 rounded-full`}>
                  <Award className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>
            <h1 className={`text-5xl font-bold mb-3 ${textClass}`}>Assessment Complete! 🎉</h1>
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{selectedCareer} Skills Evaluation</p>
          </div>

          {/* Achievement Popup */}
          {showAchievementPopup && latestAchievement && (
            <div className="fixed top-8 right-8 animate-bounce">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-3">
                  <Gift className="w-6 h-6" />
                  <div>
                    <p className="font-bold">{latestAchievement.name} Unlocked!</p>
                    <p className="text-sm">+{latestAchievement.points} Points</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className={`${cardClass} border rounded-3xl p-8 text-center hover:scale-105 transition`}>
              <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">{domainResults.score}%</div>
              <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Your Score</div>
              <div className={`mt-4 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{domainResults.correctCount} of {domainResults.totalQuestions} correct</div>
            </div>

            <div className={`${cardClass} border rounded-3xl p-8 text-center hover:scale-105 transition`}>
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">{domainResults.percentile}th</div>
              <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Percentile</div>
              <div className={`mt-4 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>Better than {domainResults.percentile}% learners</div>
            </div>

            <div className={`${cardClass} border rounded-3xl p-8 text-center hover:scale-105 transition`}>
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">{userBadges.length}</div>
              <div className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Badges Earned</div>
              <div className={`mt-4 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>{userBadges.length} of {badges.length} total</div>
            </div>
          </div>

          {/* Badges Section */}
          <div className={`${cardClass} border rounded-3xl p-8 mb-8`}>
            <h3 className={`text-2xl font-bold ${textClass} mb-6 flex items-center gap-3`}>
              <Award className="w-6 h-6" />
              Your Badges
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`rounded-2xl p-6 text-center transform transition-all ${
                    userBadges.includes(badge.id)
                      ? `bg-gradient-to-br ${badge.color} text-white shadow-lg scale-100`
                      : `${darkMode ? 'bg-gray-800' : 'bg-gray-200'} opacity-50 grayscale`
                  }`}
                >
                  <p className="text-4xl mb-2">{badge.icon}</p>
                  <p className="font-bold text-sm">{badge.name}</p>
                  <p className="text-xs opacity-80 mt-1">{badge.description}</p>
                  {userBadges.includes(badge.id) && <p className="text-xs font-bold mt-2">✓ Earned</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className={`${cardClass} border rounded-3xl p-8`}>
            <h3 className={`text-2xl font-bold ${textClass} mb-6 flex items-center gap-3`}>
              <Crown className="w-6 h-6" />
              Leaderboard
            </h3>
            <div className="space-y-2">
              {leaderboard.map((user, idx) => (
                <div key={idx} className={`flex items-center justify-between p-4 rounded-lg ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'} transition`}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{user.icon || ['🥇', '🥈', '🥉'][idx]}</span>
                    <div>
                      <p className={`font-semibold ${textClass}`}>{user.name}</p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.points} pts • 🔥 {user.streak}</p>
                    </div>
                  </div>
                  <p className={`font-bold text-lg ${textClass}`}>#{user.rank}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${cardClass} border rounded-3xl p-10 text-center mt-8`}>
            <h3 className={`text-3xl font-bold ${textClass} mb-4`}>🎊 Congratulations!</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-8 text-lg`}>Your NFT badge has been minted to the blockchain</p>
            <button
              onClick={() => {
                setCurrentStep('welcome');
                setCurrentQuestion(0);
                setAnswers({});
                setResults(null);
                setDomainResults(null);
              }}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
            >
              Share Your Achievement
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CredAIbleApp;