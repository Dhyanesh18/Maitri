import React, { useState, useMemo } from "react";
import {
  Calendar,
  BookOpen,
  Heart,
  TrendingUp,
  Edit3,
  CheckCircle,
} from "lucide-react";

export default function DashboardHome() {
  const [quizTaken, setQuizTaken] = useState(true);

  // --- Generate Activity Data ---
  const generateActivityData = () => {
    const WEEKS = 16;
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
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Less</span>
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <div
                    key={lvl}
                    className={`w-3 h-3 rounded ${getActivityColor(lvl)}`}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <div className="flex justify-center">
              <div className="inline-flex gap-1">
                {activityData.map((week, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    {week.map((day, j) => (
                      <div
                        key={j}
                        className={`w-3 h-3 rounded ${getActivityColor(
                          day
                        )} hover:scale-110 transition-transform cursor-pointer`}
                        title={`Activity level: ${day}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
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
                onClick={() => setQuizTaken(true)}
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

            <button className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition">
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
      </div>
    </div>
  );
}
