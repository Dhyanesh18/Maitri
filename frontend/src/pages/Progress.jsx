import React from "react";

export default function Progress() {
  return (
    <div className="p-6 w-full min-w-0 max-w-none">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Progress Tracking
        </h1>
        <p className="text-gray-600">
          Monitor your mental wellness journey and achievements
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
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
          <h3 className="text-2xl font-bold text-gray-900">24</h3>
          <p className="text-gray-600">Sessions Completed</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
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
          <h3 className="text-2xl font-bold text-gray-900">78%</h3>
          <p className="text-gray-600">Overall Progress</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-purple-600"
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
          <h3 className="text-2xl font-bold text-gray-900">156h</h3>
          <p className="text-gray-600">Time Invested</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-orange-600"
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
          <h3 className="text-2xl font-bold text-gray-900">8.2</h3>
          <p className="text-gray-600">Average Mood</p>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Monthly Progress
        </h2>
        <div className="h-80 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📈</div>
            <p className="text-gray-600 text-lg">
              Interactive progress chart coming soon
            </p>
            <p className="text-gray-500 text-sm">
              Track your mood, sessions, and goals over time
            </p>
          </div>
        </div>
      </div>

      {/* Goals & Milestones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Goals */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Current Goals
          </h2>
          <div className="space-y-4">
            <div className="p-4 bg-[#F9E6D0] rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-[#1A3A37]">
                  Daily Meditation
                </h3>
                <span className="text-sm text-[#1A3A37]">7/7 days</span>
              </div>
              <div className="w-full bg-[#1A3A37]/20 rounded-full h-2">
                <div
                  className="bg-[#1A3A37] h-2 rounded-full"
                  style={{ width: "100%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Complete! Great consistency this week.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-blue-800">
                  Weekly Therapy Sessions
                </h3>
                <span className="text-sm text-blue-800">2/2 sessions</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: "100%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                On track with your therapy schedule!
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-purple-800">
                  Mood Journaling
                </h3>
                <span className="text-sm text-purple-800">5/7 days</span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{ width: "71%" }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Good progress! Try to journal daily.
              </p>
            </div>
          </div>
        </div>

        {/* Recent Milestones */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Recent Milestones
          </h2>
          <div className="space-y-4">
            <div className="flex items-center p-3 bg-green-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 text-xl">🏆</span>
              </div>
              <div>
                <h4 className="font-semibold text-green-800">30-Day Streak</h4>
                <p className="text-sm text-gray-600">
                  Completed daily check-ins for a month
                </p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-blue-600 text-xl">🎯</span>
              </div>
              <div>
                <h4 className="font-semibold text-blue-800">
                  First Month Complete
                </h4>
                <p className="text-sm text-gray-600">
                  Finished your first month of therapy
                </p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-purple-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-purple-600 text-xl">🧘</span>
              </div>
              <div>
                <h4 className="font-semibold text-purple-800">
                  Mindfulness Master
                </h4>
                <p className="text-sm text-gray-600">
                  Completed 50 meditation sessions
                </p>
              </div>
            </div>

            <div className="flex items-center p-3 bg-orange-50 rounded-lg">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-orange-600 text-xl">📈</span>
              </div>
              <div>
                <h4 className="font-semibold text-orange-800">Mood Improver</h4>
                <p className="text-sm text-gray-600">
                  Average mood increased by 2 points
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
