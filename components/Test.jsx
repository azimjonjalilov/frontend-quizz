"use client";

import { useState, useEffect } from "react";
import Result from "./Result";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, XCircle, ChevronRight, ArrowRight } from "lucide-react";

const Test = ({ questions: { color, icon, questions, title } }) => {
  const [answeredQuestions, setAnsweredQuestions] = useState(1);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [statusDisabled, setStatusDisabled] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    if (questionIndex === questions.length && questions.length > 0) {
      toast.success("Congratulations! Quiz Completed 🎉", {
        duration: 4000,
      });
    }
  }, [questionIndex, questions.length]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedAnswer == null) {
      toast.error("Please select an answer to proceed");
      return;
    }

    const correctAnswer = questions[questionIndex].answer;

    if (selectedAnswer === correctAnswer) {
      setAnswerStatus("correct");
      setCorrectAnswerCount((prev) => prev + 1);
    } else {
      setAnswerStatus("incorrect");
    }
    setShowNextButton(true);
    setStatusDisabled(true);
  };

  const handleNextQuestion = () => {
    setQuestionIndex((prev) => prev + 1);
    setAnsweredQuestions((prev) => prev + 1);
    setSelectedAnswer(null);
    setShowNextButton(false);
    setAnswerStatus(null);
    setStatusDisabled(false);
  };

  if (questionIndex === questions.length) {
    return (
      <Result
        title={title}
        color={color}
        icon={icon}
        correctAnswerCount={correctAnswerCount}
        questions={questions}
      />
    );
  }

  const currentQuestion = questions[questionIndex];
  const progressPercent = Math.round((answeredQuestions / questions.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        <div className="flex flex-col h-full">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 font-medium text-sm w-max mb-8">
            Question {answeredQuestions} of {questions.length}
          </div>
          
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 dark:text-white leading-tight mb-8">
            {currentQuestion.question}
          </h2>

          <div className="mt-auto pt-8">
            <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              {currentQuestion.options.map((option, index) => {
                const alphabet = String.fromCharCode(65 + index);
                
                let isCorrect = false;
                let isIncorrect = false;

                if (answerStatus === "correct" && option === selectedAnswer) {
                  isCorrect = true;
                } else if (answerStatus === "incorrect") {
                  if (option === selectedAnswer) isIncorrect = true;
                  if (option === currentQuestion.answer) isCorrect = true;
                }

                const isSelected = selectedAnswer === option;

                let stateClasses = "border-slate-200 dark:border-slate-800 hover:border-violet-600 hover:bg-slate-50 dark:hover:bg-slate-900";
                let letterClasses = "bg-slate-100 dark:bg-slate-800 text-slate-500 group-hover:bg-violet-100 group-hover:text-violet-600 dark:group-hover:bg-violet-900/50 dark:group-hover:text-violet-400";
                
                if (isSelected && !answerStatus) {
                  stateClasses = "border-violet-600 ring-2 ring-violet-600/20";
                  letterClasses = "bg-violet-600 text-white";
                } else if (isCorrect) {
                  stateClasses = "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20";
                  letterClasses = "bg-emerald-500 text-white";
                } else if (isIncorrect) {
                  stateClasses = "border-rose-500 bg-rose-50 dark:bg-rose-950/20";
                  letterClasses = "bg-rose-500 text-white";
                }

                return (
                  <label
                    key={option}
                    className={`group relative flex items-center p-4 cursor-pointer rounded-xl border-2 transition-all duration-200 ${stateClasses} ${statusDisabled ? 'pointer-events-none' : ''}`}
                  >
                    <input
                      type="radio"
                      name="option"
                      className="sr-only"
                      checked={isSelected}
                      onChange={() => setSelectedAnswer(option)}
                      disabled={statusDisabled}
                    />
                    
                    <span className={`flex items-center justify-center w-10 h-10 rounded-lg text-lg font-medium mr-4 transition-colors ${letterClasses}`}>
                      {alphabet}
                    </span>
                    
                    <span className="text-lg text-slate-900 dark:text-slate-100 font-medium flex-1">
                      {option}
                    </span>

                    {isCorrect && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500 ml-4 animate-in zoom-in" />
                    )}
                    {isIncorrect && (
                      <XCircle className="w-6 h-6 text-rose-500 ml-4 animate-in zoom-in" />
                    )}
                  </label>
                );
              })}
            </div>

            {!showNextButton ? (
              <Button type="submit" className="w-full h-14 text-lg bg-violet-600 hover:bg-violet-700">
                Submit Answer
              </Button>
            ) : (
              <Button
                type="button"
                className="w-full h-14 text-lg bg-violet-600 hover:bg-violet-700"
                onClick={handleNextQuestion}
              >
                {questions.length === answeredQuestions ? "View Final Results" : "Next Question"}
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Test;
