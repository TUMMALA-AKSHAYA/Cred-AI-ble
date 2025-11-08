import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [domainAnswers, setDomainAnswers] = useState({});
  const [domainResults, setDomainResults] = useState(null);
  const [userPoints, setUserPoints] = useState(1250);
  const [userStreak, setUserStreak] = useState(7);
  const [userBadges, setUserBadges] = useState([1, 2, 3]);

  // 8 Career Discovery Questions
  const quizQuestions = [
    {
      id: 1,
      category: 'personality',
      question: 'When solving a complex problem, you prefer to:',
      options: [
        { text: 'Break it into smaller logical steps', traits: { analytical: 3, systematic: 2 } },
        { text: 'Visualize and create a mental model', traits: { creative: 3, visual: 2 } },
        { text: 'Research existing solutions first', traits: { research: 3, methodical: 2 } },
        { text: 'Jump in and experiment', traits: { handson: 3, experimental: 2 } },
      ],
    },
    {
      id: 2,
      category: 'work_style',
      question: 'Your ideal work environment is:',
      options: [
        { text: 'Quiet space for deep focus', traits: { analytical: 2, systematic: 2 } },
        { text: 'Collaborative team setting', traits: { social: 3, communication: 2 } },
        { text: 'Flexible with variety', traits: { creative: 2, adaptable: 3 } },
        { text: 'Independent with clear goals', traits: { independent: 3, goaloriented: 2 } },
      ],
    },
    {
      id: 3,
      category: 'technical',
      question: 'Which statement resonates most with you?',
      options: [
        { text: 'I love working with data and finding patterns', traits: { analytical: 3, data: 3 } },
        { text: 'I enjoy creating visual and interactive experiences', traits: { creative: 3, visual: 3, design: 2 } },
        { text: 'I\'m fascinated by how systems work internally', traits: { systematic: 3, technical: 3 } },
        { text: 'I like building things people can use', traits: { handson: 3, practical: 2 } },
      ],
    },
    {
      id: 4,
      category: 'learning',
      question: 'You learn best by:',
      options: [
        { text: 'Reading documentation and theory', traits: { research: 3, theoretical: 2 } },
        { text: 'Watching tutorials and videos', traits: { visual: 3, guided: 2 } },
        { text: 'Building projects hands-on', traits: { handson: 3, practical: 3 } },
        { text: 'Taking structured courses', traits: { systematic: 2, goaloriented: 2 } },
      ],
    },
    {
      id: 5,
      category: 'interest',
      question: 'What excites you most about technology?',
      options: [
        { text: 'Making computers think and learn (AI/ML)', traits: { analytical: 3, data: 3, research: 2 } },
        { text: 'Creating beautiful websites and apps', traits: { creative: 3, visual: 3, design: 3 } },
        { text: 'Protecting systems from threats', traits: { systematic: 3, analytical: 2, technical: 2 } },
        { text: 'Building scalable backend systems', traits: { systematic: 3, technical: 3, logical: 2 } },
      ],
    },
    {
      id: 6,
      category: 'strength',
      question: 'People often come to you for:',
      options: [
        { text: 'Analyzing problems logically', traits: { analytical: 3, logical: 3 } },
        { text: 'Creative ideas and design input', traits: { creative: 3, innovative: 2 } },
        { text: 'Technical troubleshooting', traits: { technical: 3, systematic: 2 } },
        { text: 'Explaining complex things simply', traits: { communication: 3, teaching: 2 } },
      ],
    },
    {
      id: 7,
      category: 'motivation',
      question: 'What motivates you most in projects?',
      options: [
        { text: 'Solving challenging puzzles', traits: { analytical: 3, challenge: 2 } },
        { text: 'Seeing your creation come to life', traits: { creative: 2, visual: 2, practical: 3 } },
        { text: 'Optimizing and improving efficiency', traits: { systematic: 3, optimization: 3 } },
        { text: 'Making an impact on users', traits: { empathy: 3, userFocused: 2 } },
      ],
    },
    {
      id: 8,
      category: 'technical_depth',
      question: 'Do you enjoy math and statistics?',
      options: [
        { text: 'Yes, I love working with numbers', traits: { analytical: 3, data: 3, mathematical: 3 } },
        { text: 'It\'s okay, I can handle it', traits: { analytical: 1, logical: 1 } },
        { text: 'Not really my strength', traits: { creative: 2, visual: 2 } },
        { text: 'I prefer visual/creative thinking', traits: { creative: 3, design: 2 } },
      ],
    },
  ];

  // Domain Quizzes - 8 questions per career
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

  const careerPaths = {
    'AI/Machine Learning': {
      icon: '🤖',
      color: 'from-purple-500 to-pink-500',
      description: 'Build intelligent systems that learn and make predictions',
      skills: ['Python', 'TensorFlow', 'Statistics', 'Data Analysis'],
      weights: { analytical: 3, data: 3, research: 2, mathematical: 3, systematic: 2 },
    },
    'Web Development': {
      icon: '💻',
      color: 'from-blue-500 to-cyan-500',
      description: 'Create beautiful, interactive websites and web applications',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'UI/UX Design'],
      weights: { creative: 3, visual: 3, handson: 2, practical: 3, design: 2 },
    },
    'Backend Engineering': {
      icon: '⚙️',
      color: 'from-emerald-500 to-teal-500',
      description: 'Build scalable server systems and APIs that power applications',
      skills: ['Node.js/Python', 'Databases', 'System Design', 'APIs'],
      weights: { systematic: 3, technical: 3, logical: 2, optimization: 3, analytical: 2 },
    },
    'Data Science': {
      icon: '📊',
      color: 'from-orange-500 to-red-500',
      description: 'Extract insights from data and build predictive models',
      skills: ['Python', 'SQL', 'Statistics', 'Data Visualization'],
      weights: { analytical: 3, data: 3, mathematical: 3, research: 2, systematic: 2 },
    },
    'UI/UX Design': {
      icon: '🎨',
      color: 'from-violet-500 to-purple-500',
      description: 'Design user experiences and beautiful interfaces',
      skills: ['Figma', 'User Research', 'Prototyping', 'Visual Design'],
      weights: { creative: 3, visual: 3, design: 3, empathy: 2, userFocused: 3 },
    },
  };

  const handleAnswer = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const traitScores = {};
    Object.values(answers).forEach((answer) => {
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
    setUserPoints((prev) => prev + 100);
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

  const calculateDomainResults = (answers, quizQuestions) => {
    let correctCount = 0;
    const topicScores = {};

    Object.entries(answers).forEach(([questionIndex, answerIndex]) => {
      const question = quizQuestions[parseInt(questionIndex)];
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

    const strongAreas = Object.entries(topicScores)
      .map(([topic, scores]) => ({
        topic,
        accuracy: Math.round((scores.correct / scores.total) * 100)
      }))
      .filter(area => area.accuracy >= 80)
      .sort((a, b) => b.accuracy - a.accuracy);

    setDomainResults({ score, percentile, correctCount, totalQuestions: quizQuestions.length, weakAreas, strongAreas, answers });
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
    setSelectedCareer(null);
    setDomainAnswers({});
    setDomainResults(null);
  };

  return (
    <QuizContext.Provider
      value={{
        currentQuestion,
        setCurrentQuestion,
        answers,
        setAnswers,
        results,
        setResults,
        selectedCareer,
        setSelectedCareer,
        domainAnswers,
        setDomainAnswers,
        domainResults,
        setDomainResults,
        quizQuestions,
        domainQuizzes,
        careerPaths,
        handleAnswer,
        handleDomainAnswer,
        calculateResults,
        calculateDomainResults,
        reset,
        userPoints,
        setUserPoints,
        userStreak,
        setUserStreak,
        userBadges,
        setUserBadges,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
