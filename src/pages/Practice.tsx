import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Target, 
  Clock, 
  CheckCircle,
  XCircle,
  RotateCcw,
  ArrowRight,
  Award,
  TrendingUp,
  Play,
  Pause,
  ArrowLeft,
  Star,
  Trophy
} from 'lucide-react';

const Practice: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('grammar');
  const [currentExercise, setCurrentExercise] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [isActive, setIsActive] = useState(false);
  const [exerciseStarted, setExerciseStarted] = useState(false);

  const categories = [
    { id: 'grammar', name: 'Grammar', icon: '📝', count: 45, color: 'from-primary-500 to-primary-600' },
    { id: 'vocabulary', name: 'Vocabulary', icon: '📚', count: 38, color: 'from-accent-500 to-accent-600' },
    { id: 'punctuation', name: 'Punctuation', icon: '❓', count: 22, color: 'from-secondary-500 to-secondary-600' },
    { id: 'style', name: 'Writing Style', icon: '🎨', count: 31, color: 'from-orange-500 to-orange-600' },
  ];

  const exercises = {
    grammar: [
      {
        question: "Choose the correct form of the verb:",
        sentence: "The team _____ working on the project for three months.",
        options: ["has been", "have been", "is been", "are been"],
        correct: 0,
        explanation: "Use 'has been' because 'team' is treated as a singular collective noun, and we need present perfect continuous tense."
      },
      {
        question: "Select the proper subject-verb agreement:",
        sentence: "Neither the manager nor the employees _____ satisfied with the decision.",
        options: ["was", "were", "is", "are"],
        correct: 1,
        explanation: "When using 'neither...nor', the verb agrees with the subject closest to it. 'Employees' is plural, so use 'were'."
      },
      {
        question: "Identify the correct pronoun usage:",
        sentence: "Between you and _____, this project seems challenging.",
        options: ["I", "me", "myself", "mine"],
        correct: 1,
        explanation: "After prepositions like 'between', use object pronouns. 'Me' is the correct object form of 'I'."
      }
    ],
    vocabulary: [
      {
        question: "Choose the word that best fits the context:",
        sentence: "The CEO's speech was very _____ and inspired the entire team.",
        options: ["eloquent", "elegant", "efficient", "effective"],
        correct: 0,
        explanation: "'Eloquent' means fluent and persuasive in speaking, which best describes an inspiring speech."
      },
      {
        question: "Select the most appropriate synonym:",
        sentence: "The company decided to _____ the old policy.",
        options: ["abandon", "desert", "leave", "quit"],
        correct: 0,
        explanation: "'Abandon' is the most formal and appropriate word for discontinuing a policy in a business context."
      }
    ],
    punctuation: [
      {
        question: "Choose the correctly punctuated sentence:",
        sentence: "Which sentence uses commas correctly?",
        options: [
          "The meeting, which was scheduled for 3 PM was postponed.",
          "The meeting which was scheduled for 3 PM, was postponed.",
          "The meeting, which was scheduled for 3 PM, was postponed.",
          "The meeting which was scheduled for 3 PM was postponed."
        ],
        correct: 2,
        explanation: "Non-restrictive clauses (which provide additional information) should be set off by commas on both sides."
      }
    ],
    style: [
      {
        question: "Choose the most concise version:",
        sentence: "Which sentence is most concise and clear?",
        options: [
          "Due to the fact that it was raining, we cancelled the event.",
          "Because it was raining, we cancelled the event.",
          "Owing to the rain, we cancelled the event.",
          "As a result of the rain, we cancelled the event."
        ],
        correct: 1,
        explanation: "'Because' is the most direct and concise way to express causation in this context."
      }
    ]
  };

  const currentSet = exercises[selectedCategory as keyof typeof exercises] || exercises.grammar;

  const startExercise = () => {
    setExerciseStarted(true);
    setIsActive(true);
    setTimeLeft(300);
    setAnswers({});
    setShowResults(false);
  };

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex.toString()
    }));
  };

  const submitExercise = () => {
    setShowResults(true);
    setIsActive(false);
  };

  const resetExercise = () => {
    setAnswers({});
    setShowResults(false);
    setCurrentExercise(0);
    setTimeLeft(300);
    setIsActive(false);
    setExerciseStarted(false);
  };

  const startTimer = () => {
    if (!exerciseStarted) {
      startExercise();
    } else {
      setIsActive(!isActive);
    }
  };

  const nextExercise = () => {
    // In a real app, this would load the next set of exercises
    setSelectedCategory(prev => {
      const categories = ['grammar', 'vocabulary', 'punctuation', 'style'];
      const currentIndex = categories.indexOf(prev);
      return categories[(currentIndex + 1) % categories.length];
    });
    resetExercise();
  };

  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      submitExercise();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateScore = () => {
    let correct = 0;
    currentSet.forEach((exercise, index) => {
      if (answers[index] && parseInt(answers[index]) === exercise.correct) {
        correct++;
      }
    });
    return Math.round((correct / currentSet.length) * 100);
  };

  if (showResults) {
    const score = calculateScore();
    const correctAnswers = Math.floor(currentSet.length * score / 100);
    
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
            {score >= 80 ? <Trophy className="w-10 h-10 text-white" /> : <Award className="w-10 h-10 text-white" />}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Exercise Complete!</h1>
          <p className="text-xl text-gray-600 mb-8">You scored {score}% on this {selectedCategory} exercise</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-600">{Object.keys(answers).length}</div>
              <div className="text-gray-600">Questions Answered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent-600">{correctAnswers}</div>
              <div className="text-gray-600">Correct Answers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary-600">{formatTime(300 - timeLeft)}</div>
              <div className="text-gray-600">Time Taken</div>
            </div>
          </div>

          {/* Performance Badge */}
          <div className="mb-8">
            {score >= 90 && (
              <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full">
                <Star className="w-4 h-4 mr-2" />
                Excellent Performance!
              </div>
            )}
            {score >= 70 && score < 90 && (
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full">
                <CheckCircle className="w-4 h-4 mr-2" />
                Good Job!
              </div>
            )}
            {score < 70 && (
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full">
                <BookOpen className="w-4 h-4 mr-2" />
                Keep Practicing!
              </div>
            )}
          </div>

          <div className="space-y-4 mb-8">
            {currentSet.map((exercise, index) => {
              const userAnswer = answers[index] ? parseInt(answers[index]) : -1;
              const isCorrect = userAnswer === exercise.correct;
              return (
                <div key={index} className={`border rounded-xl p-4 text-left ${
                  isCorrect ? 'border-accent-200 bg-accent-50' : 'border-red-200 bg-red-50'
                }`}>
                  <div className="flex items-start space-x-3">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-accent-600 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-2">{exercise.question}</p>
                      <p className="text-gray-700 mb-3">"{exercise.sentence}"</p>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="font-medium">Your answer:</span> {userAnswer >= 0 ? exercise.options[userAnswer] : 'Not answered'}
                        </p>
                        {!isCorrect && (
                          <p className="text-sm">
                            <span className="font-medium">Correct answer:</span> {exercise.options[exercise.correct]}
                          </p>
                        )}
                        <p className="text-sm text-gray-600">{exercise.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center space-x-4">
            <button 
              onClick={resetExercise}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200"
            >
              Try Again
            </button>
            <button 
              onClick={nextExercise}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Next Exercise
            </button>
            <button 
              onClick={() => navigate('/')}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/')}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Practice Exercises</h1>
            <p className="mt-2 text-gray-600">Improve your English skills with targeted practice sessions.</p>
          </div>
        </div>
        <div className={`mt-4 sm:mt-0 flex items-center space-x-4 ${timeLeft < 60 ? 'text-red-600' : 'text-gray-600'}`}>
          <Clock className="w-5 h-5" />
          <span className="text-xl font-mono font-bold">{formatTime(timeLeft)}</span>
          <button 
            onClick={startTimer}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title={!exerciseStarted ? 'Start Exercise' : isActive ? 'Pause Timer' : 'Resume Timer'}
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Category Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => {
              setSelectedCategory(category.id);
              resetExercise();
            }}
            className={`p-6 rounded-2xl text-left transition-all duration-200 transform hover:scale-105 ${
              selectedCategory === category.id
                ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                : 'bg-white hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <div className="text-3xl mb-3">{category.icon}</div>
            <h3 className={`text-lg font-semibold mb-1 ${
              selectedCategory === category.id ? 'text-white' : 'text-gray-900'
            }`}>
              {category.name}
            </h3>
            <p className={`text-sm ${
              selectedCategory === category.id ? 'text-white/80' : 'text-gray-600'
            }`}>
              {category.count} exercises
            </p>
          </button>
        ))}
      </div>

      {/* Exercise Content */}
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        {!exerciseStarted ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to practice {selectedCategory}?
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              This exercise contains {currentSet.length} questions. You'll have 5 minutes to complete them all.
            </p>
            <button
              onClick={startExercise}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200 flex items-center space-x-2 mx-auto"
            >
              <Play className="w-5 h-5" />
              <span>Start Exercise</span>
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 capitalize">{selectedCategory} Practice</h2>
                <p className="text-gray-600">Answer all questions to complete the exercise</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(Object.keys(answers).length / currentSet.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">{Object.keys(answers).length}/{currentSet.length}</span>
              </div>
            </div>

            <div className="space-y-8">
              {currentSet.map((exercise, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">Question {index + 1}</h3>
                      {answers[index] && (
                        <CheckCircle className="w-5 h-5 text-accent-600" />
                      )}
                    </div>
                    <p className="text-gray-700 mb-3">{exercise.question}</p>
                    <p className="text-xl text-gray-900 font-medium leading-relaxed bg-gray-50 p-4 rounded-lg">
                      {exercise.sentence}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {exercise.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleAnswer(index, optionIndex)}
                        className={`p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                          answers[index] === optionIndex.toString()
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            answers[index] === optionIndex.toString()
                              ? 'border-primary-500 bg-primary-500'
                              : 'border-gray-300'
                          }`}>
                            {answers[index] === optionIndex.toString() && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <span className="font-medium">{option}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <button 
                onClick={resetExercise}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset</span>
              </button>
              <button 
                onClick={submitExercise}
                disabled={Object.keys(answers).length === 0}
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <span>Submit Exercise</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Practice;