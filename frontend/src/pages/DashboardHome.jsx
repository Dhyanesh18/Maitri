import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Calendar,
  BookOpen,
  Heart,
  TrendingUp,
  Edit3,
  CheckCircle,
  X,
  Zap,
  Flame,
} from "lucide-react";

export default function DashboardHome() {
  const navigate = useNavigate();
  const [quizTaken, setQuizTaken] = useState(false);
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const quizQuestions = [
    {
      id: 1,
      question: "How have you been feeling emotionally today?",
      options: [
        "Very stressed and anxious",
        "Somewhat overwhelmed",
        "Neutral",
        "Mostly positive",
        "Excellent and energized",
      ],
    },
    {
      id: 2,
      question: "How well did you sleep last night?",
      options: ["Very poorly", "Poorly", "Okay", "Well", "Excellently"],
    },
    {
      id: 3,
      question: "How motivated do you feel to work on your goals?",
      options: [
        "Not motivated at all",
        "Slightly motivated",
        "Moderately motivated",
        "Very motivated",
        "Extremely motivated",
      ],
    },
    {
      id: 4,
      question: "How would you rate your physical activity today?",
      options: [
        "Sedentary",
        "Minimal activity",
        "Moderate activity",
        "Active",
        "Very active",
      ],
    },
    {
      id: 5,
      question: "How connected do you feel to your support system?",
      options: [
        "Very isolated",
        "Somewhat isolated",
        "Neutral",
        "Well supported",
        "Strongly connected",
      ],
    },
  ];

  // --- Generate Activity Data ---
  const generateActivityData = () => {
    const WEEKS = 52;
    const DAYS = 7;
    return Array.from({ length: WEEKS }, () =>
      Array.from({ length: DAYS }, () => Math.floor(Math.random() * 5))
    );
  };
  const activityData = useMemo(generateActivityData, []);

  const getActivityColor = (level) => {
    const shades = [
      "bg-gray-100",
      "bg-teal-100",
      "bg-teal-200",
      "bg-teal-300",
      "bg-teal-400",
    ];
    return shades[level] || "bg-gray-100";
  };

  const articles = [
    {
      title: "Managing Daily Stress",
      desc: "Simple techniques to reduce stress and find balance.",
      readTime: "5 min read",
    },
    {
      title: "Building Resilience",
      desc: "Strengthen your ability to bounce back from challenges.",
      readTime: "6 min read",
    },
    {
      title: "Mindful Breathing",
      desc: "Learn breathing exercises to calm your mind.",
      readTime: "4 min read",
    },
    {
      title: "Sleep & Wellness",
      desc: "Improve your sleep quality for better mental health.",
      readTime: "7 min read",
    },
  ];

  const handleStartQuiz = () => {
    setShowQuizDialog(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
  };

  const handleSelectAnswer = (option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestion]: option,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmitQuiz = () => {
    setQuizTaken(true);
    setShowQuizDialog(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});

    // Show success toast
    toast.success("Quiz completed! Your wellness check is recorded.", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
    });
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* --- Welcome Section --- */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A3A37] mb-2">
            Welcome Back, Sarah
          </h1>
          <p className="text-gray-600">
            Continue your wellness journey with today's activities and insights.
          </p>
        </div>

        {/* --- Activity Heatmap --- */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#1A3A37] mb-1">
                Your Activity
              </h2>
              <p className="text-gray-600 text-sm">
                Keep up the consistency 🌱
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-gray-400" />
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <div
                    key={lvl}
                    className={`w-3 h-3 rounded ${getActivityColor(lvl)}`}
                  />
                ))}
              </div>
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
          </div>

          <div className="w-full">
            <div className="flex gap-0.5 pb-2 w-full justify-between">
              {activityData.map((week, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-0.5 flex-1 items-center"
                >
                  {week.map((day, j) => (
                    <div
                      key={j}
                      className={`w-full aspect-square rounded-sm ${getActivityColor(
                        day
                      )} hover:scale-125 transition-transform cursor-pointer`}
                      title={`Week ${i + 1}, Day ${
                        j + 1
                      }: Activity level ${day}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Daily Quiz & Support --- */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Daily Quiz Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-50 p-3 rounded-xl">
                {quizTaken ? (
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                ) : (
                  <Calendar className="w-5 h-5 text-blue-600" />
                )}
              </div>
              <span className="text-xs text-gray-500 font-medium">
                DAILY CHECK-IN
              </span>
            </div>

            <h3 className="text-lg font-bold text-[#1A3A37] mb-2">
              {quizTaken ? "Check-in Complete" : "Daily Wellness Quiz"}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {quizTaken
                ? "Great job! You've completed today's wellness check."
                : "Take a quick 2-minute quiz to check your wellbeing."}
            </p>

            {!quizTaken ? (
              <button
                onClick={handleStartQuiz}
                className="bg-[#1A3A37] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#154F4A] transition-colors"
              >
                Start Check-in
              </button>
            ) : (
              <div className="flex items-center text-teal-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                <span>7-day streak</span>
              </div>
            )}
          </div>

          {/* Support Card */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-rose-50 p-3 rounded-xl">
                <Heart className="w-5 h-5 text-rose-500" />
              </div>
              <span className="text-xs text-gray-500 font-medium">SUPPORT</span>
            </div>

            <h3 className="text-lg font-bold text-[#1A3A37] mb-2">
              Need Support?
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Access breathing exercises and guided meditation instantly.
            </p>

            <button className="border border-[#1A3A37] text-[#1A3A37] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#1A3A37] hover:text-white transition-colors">
              Get Help Now
            </button>
          </div>
        </div>

        {/* --- Journal Section --- */}
        <section className="bg-white rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="bg-green-100 p-4 rounded-xl">
                <Edit3 className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  Journal Your Thoughts
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Reflect on your emotions and track your growth daily.
                </p>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>15 entries this month</span>
                  <span>Last entry: 2 days ago</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/dashboard/progress")}
              className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition"
            >
              Start Writing
            </button>
          </div>
        </section>

        {/* --- Articles Section --- */}
        <section>
          <header className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Wellness Resources
              </h2>
              <p className="text-gray-500 text-sm">
                Expert tips and guides for your mental wellbeing
              </p>
            </div>
            <button className="text-green-700 font-semibold hover:underline">
              View All →
            </button>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {articles.map((a, i) => (
              <article
                key={i}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md p-6 transition cursor-pointer"
              >
                <div className="text-4xl mb-3">{a.icon}</div>
                <h4 className="font-semibold text-gray-800 mb-1">{a.title}</h4>
                <p className="text-gray-600 text-sm mb-4">{a.desc}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-1" /> {a.readTime}
                  </span>
                  <span className="text-green-600 font-semibold hover:underline">
                    Read →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* --- Quiz Dialog --- */}
        {showQuizDialog && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Dialog Header */}
              <div className="bg-[#1A3A37] p-6 text-white flex items-center justify-between sticky top-0 z-10">
                <div>
                  <h3 className="text-2xl font-bold">Daily Wellness Quiz</h3>
                  <p className="text-gray-200 text-sm">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </p>
                </div>
                <button
                  onClick={() => setShowQuizDialog(false)}
                  className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-colors shrink-0"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="h-1 bg-gray-200">
                <div
                  className="h-full bg-[#1A3A37] transition-all"
                  style={{
                    width: `${
                      ((currentQuestion + 1) / quizQuestions.length) * 100
                    }%`,
                  }}
                />
              </div>

              {/* Question Content */}
              <div className="p-8">
                {/* Question Text */}
                <h4 className="text-xl font-bold text-[#1A3A37] mb-8">
                  {quizQuestions[currentQuestion].question}
                </h4>

                {/* Options */}
                <div className="space-y-3 mb-8">
                  {quizQuestions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(option)}
                      className={`w-full text-left p-4 border-2 rounded-xl transition-all ${
                        selectedAnswers[currentQuestion] === option
                          ? "border-[#1A3A37] bg-[#1A3A37]/5"
                          : "border-gray-200 bg-gray-50 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            selectedAnswers[currentQuestion] === option
                              ? "border-[#1A3A37] bg-[#1A3A37]"
                              : "border-gray-300"
                          }`}
                        >
                          {selectedAnswers[currentQuestion] === option && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <span className="font-medium text-gray-700">
                          {option}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center gap-3">
                  <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestion === 0}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>

                  <div className="text-sm text-gray-500">
                    {Object.keys(selectedAnswers).length} of{" "}
                    {quizQuestions.length} answered
                  </div>

                  {currentQuestion === quizQuestions.length - 1 ? (
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={
                        Object.keys(selectedAnswers).length !==
                        quizQuestions.length
                      }
                      className="px-6 py-2 bg-[#1A3A37] text-white rounded-full font-medium hover:bg-[#154F4A] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Submit Quiz
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      disabled={!selectedAnswers[currentQuestion]}
                      className="px-6 py-2 bg-[#1A3A37] text-white rounded-full font-medium hover:bg-[#154F4A] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
