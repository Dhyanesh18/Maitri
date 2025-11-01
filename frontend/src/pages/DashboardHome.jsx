import React from "react";

export default function DashboardHome() {
  return (
    <div className="p-6 w-full min-w-0 max-w-none">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl p-8 text-white mb-8">
        <h2 className="text-3xl font-bold mb-4">
          Welcome to Your Mental Wellness Journey
        </h2>
        <p className="text-lg opacity-90 mb-6">
          Take control of your mental health with personalized resources and
          professional support.
        </p>
        <button className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Start Today's Session
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Sessions Completed
              </p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Progress Score
              </p>
              <p className="text-2xl font-bold text-gray-900">85%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Time Practiced
              </p>
              <p className="text-2xl font-bold text-gray-900">24h</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-orange-100">
              <svg
                className="w-6 h-6 text-orange-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Mood Score</p>
              <p className="text-2xl font-bold text-gray-900">7.2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Today's Activities */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Today's Activities
            </h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-teal-50 rounded-lg">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <span className="text-2xl">🧘</span>
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-semibold text-gray-900">
                    Morning Meditation
                  </h4>
                  <p className="text-gray-600">
                    10 minutes • Breathing exercises
                  </p>
                </div>
                <button className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
                  Start
                </button>
              </div>

              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <span className="text-2xl">📝</span>
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-semibold text-gray-900">Mood Journal</h4>
                  <p className="text-gray-600">
                    Reflect on your feelings today
                  </p>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Write
                </button>
              </div>

              <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <span className="text-2xl">💬</span>
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-semibold text-gray-900">
                    Therapy Session
                  </h4>
                  <p className="text-gray-600">3:00 PM • Dr. Sarah Johnson</p>
                </div>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
                  Join
                </button>
              </div>
            </div>
          </div>

          {/* Progress Chart */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Weekly Progress
            </h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <p className="text-gray-600">
                  Progress chart will be displayed here
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <span className="text-xl mr-3">🎯</span>
                  <span className="font-medium">Set Daily Goal</span>
                </div>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <span className="text-xl mr-3">📚</span>
                  <span className="font-medium">Browse Resources</span>
                </div>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <span className="text-xl mr-3">👥</span>
                  <span className="font-medium">Join Community</span>
                </div>
              </button>
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <span className="text-xl mr-3">⚙️</span>
                  <span className="font-medium">Settings</span>
                </div>
              </button>
            </div>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Upcoming Sessions
            </h3>
            <div className="space-y-4">
              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Dr. Sarah Johnson
                    </h4>
                    <p className="text-sm text-gray-600">Individual Therapy</p>
                    <p className="text-sm text-teal-600">Today, 3:00 PM</p>
                  </div>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    Confirmed
                  </span>
                </div>
              </div>

              <div className="p-3 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Group Therapy
                    </h4>
                    <p className="text-sm text-gray-600">Anxiety Support</p>
                    <p className="text-sm text-teal-600">Tomorrow, 10:00 AM</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    Scheduled
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Quote */}
          <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Daily Inspiration
            </h3>
            <blockquote className="text-gray-700 italic mb-3">
              "The greatest revolution of our generation is the discovery that
              human beings, by changing the inner attitudes of their minds, can
              change the outer aspects of their lives."
            </blockquote>
            <cite className="text-sm text-gray-600">— William James</cite>
          </div>
        </div>
      </div>
    </div>
  );
}
