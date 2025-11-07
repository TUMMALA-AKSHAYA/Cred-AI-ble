import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [userPoints, setUserPoints] = useState(1250);
  const [userStreak, setUserStreak] = useState(7);
  const [userBadges, setUserBadges] = useState([1, 2, 3]);

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
  ];

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

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResults(null);
    setSelectedCareer(null);
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
        quizQuestions,
        careerPaths,
        handleAnswer,
        calculateResults,
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
};
