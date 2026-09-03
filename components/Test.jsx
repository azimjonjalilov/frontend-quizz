"use client";

import { useState, useEffect } from "react";
import Result from "./Result";
import toast from "react-hot-toast";

const Test = ({ questions: { color, icon, questions, title } }) => {
  const [answeredQuestions, setAnsweredQuestions] = useState(1);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [statusDisabled, setStatusDisabled] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    if (questionIndex === questions.length) {
      toast.success("Congratulations! Quiz Completed 🎉", {
        duration: 4000,
        style: {
          borderRadius: "12px",
          background: "var(--card-bg)",
          color: "var(--text-main)",
          border: "1px solid var(--card-border)",
        },
      });
    }
  }, [questionIndex, questions.length]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedAnswer == null) {
      toast.error("Please select an answer to proceed", {
        style: {
          borderRadius: "12px",
          background: "var(--card-bg)",
          color: "var(--text-main)",
          border: "1px solid var(--card-border)",
        },
      });
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
    <div className="test-grid">
      <div className="test-header-meta">
        <span className="question-badge">
          Question {answeredQuestions} of {questions.length}
        </span>
        <h2 className="question-text">{currentQuestion.question}</h2>

        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      <div className="test-form-container">
        <form onSubmit={handleSubmit}>
          <ul className="options-list">
            {currentQuestion.options.map((option, index) => {
              const alphabet = String.fromCharCode(65 + index);

              let statusClass = "";

              if (answerStatus === "correct" && option === selectedAnswer) {
                statusClass = "correct";
              } else if (answerStatus === "incorrect") {
                if (option === selectedAnswer) {
                  statusClass = "incorrect";
                }
                if (option === currentQuestion.answer) {
                  statusClass = "correct";
                }
              }

              const isSelected = selectedAnswer === option;

              return (
                <li key={option}>
                  <label
                    className={`option-card ${
                      isSelected ? "selected" : ""
                    } ${statusClass}`}
                  >
                    <span className="option-letter">{alphabet}</span>
                    <input
                      type="radio"
                      name="option"
                      checked={isSelected}
                      onChange={() => setSelectedAnswer(option)}
                      disabled={statusDisabled}
                      style={{ display: "none" }}
                    />
                    <span className="option-text">{option}</span>

                    {statusClass === "correct" && (
                      <div className="status-icon">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--success-color)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                          <polyline points="22 4 12 14.01 9 11.01"></polyline>
                        </svg>
                      </div>
                    )}

                    {statusClass === "incorrect" && (
                      <div className="status-icon">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--error-color)"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="15" y1="9" x2="9" y2="15"></line>
                          <line x1="9" y1="9" x2="15" y2="15"></line>
                        </svg>
                      </div>
                    )}
                  </label>
                </li>
              );
            })}
          </ul>

          {!showNextButton ? (
            <button className="btn-primary" type="submit">
              Submit Answer
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          ) : (
            <button
              type="button"
              className="btn-primary"
              onClick={handleNextQuestion}
            >
              {questions.length === answeredQuestions
                ? "View Final Results"
                : "Next Question"}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Test;
