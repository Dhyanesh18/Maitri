import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Brain,
  Heart,
  Activity,
  Calendar,
  TrendingUp,
  Award,
  Zap,
  CheckCircle,
  ArrowRight,
  BarChart3,
  X,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function DashboardHome() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quizTaken, setQuizTaken] = useState(false);
  const [showQuizDialog, setShowQuizDialog] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [journalStats, setJournalStats] = useState({
    total_entries: 0,
    current_streak: 0,
    longest_streak: 0,
  });
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResults, setQuizResults] = useState(null);

  const quizQuestions = [
    {
      id: 1,
      question: "How would you rate your overall mood today?",
      category: "mood",
      options: [
        { value: 5, label: "Very positive and energetic" },
        { value: 4, label: "Generally good" },
        { value: 3, label: "Neutral, neither good nor bad" },
        { value: 2, label: "Somewhat low" },
        { value: 1, label: "Very low and unmotivated" },
      ],
    },
    {
      id: 2,
      question: "How well did you sleep last night?",
      category: "sleep",
      options: [
        { value: 5, label: "Excellent, I feel fully rested" },
        { value: 4, label: "Good, slept through the night" },
        { value: 3, label: "Okay, had some interruptions" },
        { value: 2, label: "Poor, woke up several times" },
        { value: 1, label: "Very poor, barely slept" },
      ],
    },
    {
      id: 3,
      question: "How are your stress levels today?",
      category: "stress",
      options: [
        { value: 5, label: "Very relaxed and calm" },
        { value: 4, label: "Mostly calm with minor stress" },
        { value: 3, label: "Moderate stress levels" },
        { value: 2, label: "Quite stressed" },
        { value: 1, label: "Extremely stressed and overwhelmed" },
      ],
    },
    {
      id: 4,
      question: "How connected do you feel to others?",
      category: "social",
      options: [
        { value: 5, label: "Very connected and supported" },
        { value: 4, label: "Fairly connected" },
        { value: 3, label: "Somewhat isolated" },
        { value: 2, label: "Quite lonely" },
        { value: 1, label: "Very isolated and alone" },
      ],
    },
    {
      id: 5,
      question: "How would you describe your anxiety level?",
      category: "anxiety",
      options: [
        { value: 5, label: "Not anxious at all" },
        { value: 4, label: "Slightly anxious" },
        { value: 3, label: "Moderately anxious" },
        { value: 2, label: "Very anxious" },
        { value: 1, label: "Extremely anxious" },
      ],
    },
    {
      id: 6,
      question: "How motivated do you feel today?",
      category: "motivation",
      options: [
        { value: 5, label: "Highly motivated and productive" },
        { value: 4, label: "Fairly motivated" },
        { value: 3, label: "Neutral motivation" },
        { value: 2, label: "Low motivation" },
        { value: 1, label: "No motivation at all" },
      ],
    },
    {
      id: 7,
      question: "How are you managing daily tasks?",
      category: "functioning",
      options: [
        { value: 5, label: "Managing everything easily" },
        { value: 4, label: "Handling most tasks well" },
        { value: 3, label: "Struggling with some tasks" },
        { value: 2, label: "Difficulty with most tasks" },
        { value: 1, label: "Unable to complete basic tasks" },
      ],
    },
  ];

  // --- Generate Activity Data ---
  const generateActivityData = () => {
    const WEEKS = 52;
    const DAYS = 7;
    return Array.from({ length: WEEKS }, (_, weekIndex) =>
      Array.from({ length: DAYS }, () => {
        // Show activity (green) only for last 6-7 weeks, rest white
        return weekIndex >= WEEKS - 7 ? Math.floor(Math.random() * 5) + 1 : 0;
      })
    );
  };
  const activityData = useMemo(generateActivityData, []);

  const getActivityColor = (level) => {
    const shades = [
      "bg-gray-100",
      "bg-green-300",
      "bg-green-400",
      "bg-green-500",
      "bg-green-600",
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

  useEffect(() => {
    fetchJournalStats();
  }, []);

  const fetchJournalStats = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/journals/stats",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setJournalStats(data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch journal stats:", error);
    }
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setQuizResults(null);
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

  const calculateResults = () => {
    const categoryScores = {};
    let totalScore = 0;
    let maxScore = 0;

    quizQuestions.forEach((q) => {
      const answer = selectedAnswers[q.id] || 0;
      totalScore += answer;
      maxScore += 5;

      if (!categoryScores[q.category]) {
        categoryScores[q.category] = { total: 0, count: 0 };
      }
      categoryScores[q.category].total += answer;
      categoryScores[q.category].count += 1;
    });

    const percentageScore = Math.round((totalScore / maxScore) * 100);

    // Calculate category averages
    const categories = {};
    Object.keys(categoryScores).forEach((cat) => {
      categories[cat] = Math.round(
        (categoryScores[cat].total / (categoryScores[cat].count * 5)) * 100
      );
    });

    // Determine wellness level
    let wellnessLevel = "";
    let wellnessColor = "";
    let recommendations = [];

    if (percentageScore >= 80) {
      wellnessLevel = "Excellent";
      wellnessColor = "text-green-600";
      recommendations = [
        "You're doing great! Keep up your current wellness practices.",
        "Consider sharing your strategies with others who might benefit.",
        "Continue your regular self-care routines.",
      ];
    } else if (percentageScore >= 60) {
      wellnessLevel = "Good";
      wellnessColor = "text-blue-600";
      recommendations = [
        "You're managing well overall. Focus on areas that need attention.",
        "Try incorporating more stress-relief activities into your routine.",
        "Maintain your current positive habits.",
      ];
    } else if (percentageScore >= 40) {
      wellnessLevel = "Fair";
      wellnessColor = "text-orange-600";
      recommendations = [
        "Consider talking to someone about how you're feeling.",
        "Try establishing a regular sleep schedule.",
        "Engage in activities that bring you joy.",
        "Consider reaching out to supportive friends or family.",
      ];
    } else {
      wellnessLevel = "Needs Attention";
      wellnessColor = "text-red-600";
      recommendations = [
        "Your wellness needs attention. Consider speaking with a mental health professional.",
        "Prioritize self-care and don't hesitate to ask for help.",
        "Start with small, manageable steps to improve your wellbeing.",
        "Reach out to trusted friends, family, or a counselor.",
      ];
    }

    setQuizResults({
      percentageScore,
      wellnessLevel,
      wellnessColor,
      categories,
      recommendations,
      totalAnswered: Object.keys(selectedAnswers).length,
      totalQuestions: quizQuestions.length,
    });
    setQuizCompleted(true);
  };

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / quizQuestions.length) * 100;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      mood: Brain,
      sleep: Activity,
      stress: Heart,
      social: TrendingUp,
      anxiety: Zap,
      motivation: Award,
      functioning: CheckCircle,
    };
    return icons[category] || Brain;
  };

  const getCategoryLabel = (category) => {
    const labels = {
      mood: "Mood",
      sleep: "Sleep Quality",
      stress: "Stress Management",
      social: "Social Connection",
      anxiety: "Anxiety Level",
      motivation: "Motivation",
      functioning: "Daily Functioning",
    };
    return labels[category] || category;
  };

  if (showQuiz && !quizCompleted) {
    const question = quizQuestions[currentQuestion];
    const hasAnswer = selectedAnswers[question.id] !== undefined;

    return (
      <div className="min-h-screen bg-linear-to-br from-teal-50 to-blue-50 p-6">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-700">
                Daily Wellness Check
              </h2>
              <span className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-teal-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              {question.question}
            </h3>

            <div className="space-y-3">
              {question.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelectAnswer(option.value)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedAnswers[question.id] === option.value
                      ? "border-teal-600 bg-teal-50"
                      : "border-gray-200 hover:border-teal-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                        selectedAnswers[question.id] === option.value
                          ? "border-teal-600 bg-teal-600"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedAnswers[question.id] === option.value && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="text-gray-700">{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-3 rounded-lg font-medium text-gray-700 bg-white border-2 border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!hasAnswer}
              className="px-6 py-3 rounded-lg font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {currentQuestion === quizQuestions.length - 1 ? "Submit" : "Next"}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (quizCompleted && quizResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Results Header */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Your Wellness Score
              </h2>
              <p className="text-gray-600">
                Based on {quizResults.totalAnswered} responses
              </p>
            </div>

            {/* Overall Score */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <svg className="transform -rotate-90 w-48 h-48">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#e5e7eb"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="#0d9488"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 88}`}
                    strokeDashoffset={`${
                      2 * Math.PI * 88 * (1 - quizResults.percentageScore / 100)
                    }`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-gray-900">
                    {quizResults.percentageScore}
                  </span>
                  <span className="text-gray-600">out of 100</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h3
                className={`text-2xl font-bold ${quizResults.wellnessColor} mb-2`}
              >
                {quizResults.wellnessLevel}
              </h3>
              <p className="text-gray-600">Your overall wellness status today</p>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-teal-600" />
              Category Breakdown
            </h3>

            <div className="space-y-4">
              {Object.entries(quizResults.categories).map(
                ([category, score]) => {
                  const Icon = getCategoryIcon(category);
                  return (
                    <div key={category}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5 text-gray-600" />
                          <span className="font-medium text-gray-700">
                            {getCategoryLabel(category)}
                          </span>
                        </div>
                        <span className="font-semibold text-gray-900">
                          {score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            score >= 80
                              ? "bg-green-500"
                              : score >= 60
                              ? "bg-blue-500"
                              : score >= 40
                              ? "bg-orange-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${score}%` }}
                        />
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Zap className="w-6 h-6 text-teal-600" />
              Personalized Recommendations
            </h3>

            <div className="space-y-3">
              {quizResults.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-teal-50 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => {
                setShowQuiz(false);
                setQuizCompleted(false);
              }}
              className="flex-1 px-6 py-3 rounded-lg font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors"
            >
              Return to Dashboard
            </button>
            <button
              onClick={handleStartQuiz}
              className="flex-1 px-6 py-3 rounded-lg font-medium text-teal-600 bg-white border-2 border-teal-600 hover:bg-teal-50 transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard View
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-8 text-white mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Welcome back, {user?.full_name || "User"}!
          </h2>
          <p className="text-lg opacity-90 mb-6">
            Take control of your mental health with personalized resources and
            professional support.
          </p>
          <button
            onClick={handleStartQuiz}
            className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            <CheckCircle className="w-5 h-5" />
            Start Daily Wellness Check
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* ...existing stats cards... */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Journal Entries
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {journalStats.total_entries}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100">
                <Activity className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Current Streak
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {journalStats.current_streak} days
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Longest Streak
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {journalStats.longest_streak} days
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Wellness Score
                </p>
                <p className="text-2xl font-bold text-gray-900">--</p>
              </div>
            </div>
          </div>
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
