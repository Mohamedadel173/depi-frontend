import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";

export default function Quiz({ setProgress }) {
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback(
    (selectedAnswer) => {
      setUserAnswers((prevUserAnswers) => {
        const newAnswers = [...prevUserAnswers, selectedAnswer];

        if (setProgress) {
          const progressPercentage = (newAnswers.length / QUESTIONS.length) * 100;
          setProgress(progressPercentage);
        }

        return newAnswers;
      });
    },
    [setProgress]
  );

  const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

  useEffect(() => {
    if (setProgress) setProgress(0);
  }, [setProgress]);

  if (quizIsComplete) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 space-y-6">
        <div className="bg-white p-8 rounded-lg shadow text-center max-w-sm w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-purple-800">
            🎉 You completed the quiz!
          </h2>
        </div>

        {/* Back to Levels Button */}
        <Link
          to="/levels"
          className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-6 rounded-lg transition-all"
        >
          Back to Levels
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
        cardStyle={{
          fontFamily: 'Poppins, sans-serif',
          color: '#111827',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          width: '100%',
        }}
        buttonStyle={{
          fontFamily: 'Poppins, sans-serif',
          backgroundColor: '#2E1A6D',
          color: '#ffffff',
          padding: '12px 16px',
          borderRadius: '8px',
          width: '100%',
          marginTop: '12px',
          transition: 'all 0.3s',
          textAlign: 'center',
        }}
      />
    </div>
  );
}
