import React from 'react';
import { Button, Card, Container, ProgressBar, Badge } from '../components';
import { useQuiz } from '../hooks/useQuiz';

export const QuizPage = ({ onComplete }) => {
  const {
    currentQuestion,
    setCurrentQuestion,
    answers,
    quizQuestions,
    handleAnswer,
    results,
    userPoints,
    userStreak,
  } = useQuiz();

  if (results) {
    return <QuizResultsPage onComplete={onComplete} />;
  }

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-8 md:py-16">
      <Container>
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-gray-900">Career Discovery</h1>
              <div className="flex items-center gap-4 text-sm">
                <Badge variant="success" icon="🔥">{userStreak} day streak</Badge>
                <Badge variant="primary" icon="⭐">{userPoints} pts</Badge>
              </div>
            </div>
            <p className="text-gray-600 mb-6">Question {currentQuestion + 1} of {quizQuestions.length}</p>
            <ProgressBar progress={progress} />
          </div>

          {/* Question Card */}
          <Card variant="default" className="mb-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
              {question.question}
            </h2>

            {/* Answer Options */}
            <div className="space-y-3">
              {question.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    answers[currentQuestion] === option
                      ? 'border-indigo-600 bg-indigo-50'
                      : 'border-gray-200 bg-white hover:border-indigo-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                        answers[currentQuestion] === option
                          ? 'border-indigo-600 bg-indigo-600'
                          : 'border-gray-300'
                      }`}
                    >
                      {answers[currentQuestion] === option && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-900 font-medium">{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Previous
            </Button>
            <Button
              onClick={() => currentQuestion === quizQuestions.length - 1 ? handleAnswer(answers[currentQuestion]) : setCurrentQuestion(currentQuestion + 1)}
              disabled={!answers[currentQuestion]}
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {currentQuestion === quizQuestions.length - 1 ? 'Complete Quiz' : 'Next'} →
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

const QuizResultsPage = ({ onComplete }) => {
  const { results, reset } = useQuiz();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 py-12 md:py-20">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-full blur-lg opacity-50"></div>
                <div className="relative bg-gradient-to-r from-indigo-600 to-violet-600 p-4 rounded-full">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Your Career Matches</h1>
            <p className="text-lg text-gray-600">Based on your psychometric assessment</p>
          </div>

          {/* Results Cards */}
          <div className="space-y-6 mb-12">
            {results.map((result, idx) => (
              <Card key={idx} variant="default" className="hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-4xl mb-3">{result.icon}</div>
                    <h2 className="text-3xl font-bold text-gray-900">{result.career}</h2>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                      {Math.round((result.score / results[0].score) * 100)}%
                    </div>
                    {idx === 0 && <Badge variant="success" icon="🏆">Best Match</Badge>}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{result.description}</p>
                <div className="flex flex-wrap gap-2">
                  {result.skills.map((skill) => (
                    <Badge key={skill} variant="default">{skill}</Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="grid md:grid-cols-2 gap-6">
            <Button
              variant="secondary"
              size="lg"
              onClick={reset}
              className="w-full"
            >
              Retake Quiz
            </Button>
            <Button
              size="lg"
              onClick={onComplete}
              className="w-full"
            >
              View Dashboard →
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};