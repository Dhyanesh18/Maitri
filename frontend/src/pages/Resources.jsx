import React from "react";

export default function Resources() {
  return (
    <div className="p-6 w-full min-w-0 max-w-none">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Resources</h1>
        <p className="text-gray-600">
          Explore helpful materials for your mental wellness journey
        </p>
      </div>

      {/* Resource Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#F9E6D0] rounded-xl p-6 text-center">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-xl font-bold text-[#1A3A37] mb-2">Articles</h3>
          <p className="text-gray-700 mb-4">
            Expert-written content on mental health topics
          </p>
          <button className="bg-[#1A3A37] text-white px-4 py-2 rounded-lg hover:bg-[#154F4A]">
            Browse Articles
          </button>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 text-center">
          <div className="text-4xl mb-4">🎧</div>
          <h3 className="text-xl font-bold text-blue-800 mb-2">Guided Audio</h3>
          <p className="text-gray-700 mb-4">
            Meditation and relaxation audio sessions
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Listen Now
          </button>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 text-center">
          <div className="text-4xl mb-4">📹</div>
          <h3 className="text-xl font-bold text-purple-800 mb-2">
            Video Library
          </h3>
          <p className="text-gray-700 mb-4">Educational videos and exercises</p>
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
            Watch Videos
          </button>
        </div>
      </div>

      {/* Featured Content */}
      <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Featured Content
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-[#1A3A37] rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl">📖</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">
                  Understanding Anxiety
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  A comprehensive guide to recognizing and managing anxiety
                  symptoms.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>15 min read</span>
                  <span className="mx-2">•</span>
                  <span>Dr. Emily Rodriguez</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl">🧘</span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 mb-2">
                  5-Minute Breathing Exercise
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Quick relaxation technique for stress relief and mindfulness.
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>5 min audio</span>
                  <span className="mx-2">•</span>
                  <span>Guided meditation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resource Collections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Self-Help Tools */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Self-Help Tools
          </h3>
          <div className="space-y-3">
            <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <span className="text-xl mr-3">🎯</span>
              <span className="font-medium">Goal Setting Worksheet</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <span className="text-xl mr-3">📝</span>
              <span className="font-medium">Mood Tracking Template</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <span className="text-xl mr-3">🔄</span>
              <span className="font-medium">Daily Routine Planner</span>
            </div>
            <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
              <span className="text-xl mr-3">💭</span>
              <span className="font-medium">Thought Record Sheet</span>
            </div>
          </div>
        </div>

        {/* Educational Series */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Educational Series
          </h3>
          <div className="space-y-3">
            <div className="p-3 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900">
                Cognitive Behavioral Therapy
              </h4>
              <p className="text-sm text-gray-600">
                6-part series on CBT techniques
              </p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#1A3A37] h-2 rounded-full"
                    style={{ width: "66%" }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">4 of 6 completed</p>
              </div>
            </div>

            <div className="p-3 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900">
                Mindfulness Fundamentals
              </h4>
              <p className="text-sm text-gray-600">
                Introduction to mindfulness practice
              </p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "100%" }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Completed</p>
              </div>
            </div>

            <div className="p-3 border border-gray-200 rounded-lg">
              <h4 className="font-semibold text-gray-900">Stress Management</h4>
              <p className="text-sm text-gray-600">
                Practical stress reduction strategies
              </p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "25%" }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">1 of 4 completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Access</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              <div className="flex items-center">
                <span className="text-xl mr-3">🆘</span>
                <div>
                  <div className="font-medium text-red-800">
                    Crisis Resources
                  </div>
                  <div className="text-sm text-red-600">
                    Emergency support contacts
                  </div>
                </div>
              </div>
            </button>

            <button className="w-full text-left p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <div className="flex items-center">
                <span className="text-xl mr-3">📞</span>
                <div>
                  <div className="font-medium text-green-800">
                    Hotline Numbers
                  </div>
                  <div className="text-sm text-green-600">
                    24/7 support lines
                  </div>
                </div>
              </div>
            </button>

            <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
              <div className="flex items-center">
                <span className="text-xl mr-3">💬</span>
                <div>
                  <div className="font-medium text-blue-800">
                    Community Forums
                  </div>
                  <div className="text-sm text-blue-600">
                    Connect with peers
                  </div>
                </div>
              </div>
            </button>

            <button className="w-full text-left p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <div className="flex items-center">
                <span className="text-xl mr-3">📱</span>
                <div>
                  <div className="font-medium text-purple-800">Mobile Apps</div>
                  <div className="text-sm text-purple-600">
                    Recommended wellness apps
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
