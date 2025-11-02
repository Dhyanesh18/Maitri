import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingDown,
  TrendingUp,
  Brain,
  Heart,
  Shield,
  BookOpen,
  Target,
  Calendar,
  Star,
  User,
  Activity,
  Lightbulb,
} from "lucide-react";

export default function Resources() {
  // Sample data for 15 days of progress
  const progressData = [
    { day: "Day 1", depression: 7, stress: 8, anxiety: 9 },
    { day: "Day 2", depression: 6, stress: 7, anxiety: 8 },
    { day: "Day 3", depression: 6, stress: 6, anxiety: 7 },
    { day: "Day 4", depression: 5, stress: 6, anxiety: 6 },
    { day: "Day 5", depression: 5, stress: 5, anxiety: 6 },
    { day: "Day 6", depression: 4, stress: 5, anxiety: 5 },
    { day: "Day 7", depression: 4, stress: 4, anxiety: 5 },
    { day: "Day 8", depression: 3, stress: 4, anxiety: 4 },
    { day: "Day 9", depression: 3, stress: 3, anxiety: 4 },
    { day: "Day 10", depression: 2, stress: 3, anxiety: 3 },
    { day: "Day 11", depression: 2, stress: 2, anxiety: 3 },
    { day: "Day 12", depression: 2, stress: 2, anxiety: 2 },
    { day: "Day 13", depression: 1, stress: 2, anxiety: 2 },
    { day: "Day 14", depression: 1, stress: 1, anxiety: 1 },
    { day: "Day 15", depression: 1, stress: 1, anxiety: 1 },
  ];

  // Calculate improvement percentages
  const depressionImprovement = Math.round(
    ((progressData[0].depression - progressData[14].depression) /
      progressData[0].depression) *
      100
  );
  const stressImprovement = Math.round(
    ((progressData[0].stress - progressData[14].stress) /
      progressData[0].stress) *
      100
  );
  const anxietyImprovement = Math.round(
    ((progressData[0].anxiety - progressData[14].anxiety) /
      progressData[0].anxiety) *
      100
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1A3A37] mb-2">
            Your Progress
          </h1>
          <p className="text-gray-600">
            Track your mental wellness journey and discover personalized
            recommendations
          </p>
        </div>

        {/* Progress Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Depression Progress */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
            <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#1A3A37]">
              {depressionImprovement}%
            </h3>
            <p className="text-gray-600 text-sm font-medium">
              Depression Improvement
            </p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <TrendingDown className="w-4 h-4 text-green-500" />
              <p className="text-green-500 text-xs">Great progress!</p>
            </div>
          </div>

          {/* Stress Progress */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
            <div className="bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Heart className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-2xl font-bold text-[#1A3A37]">
              {stressImprovement}%
            </h3>
            <p className="text-gray-600 text-sm font-medium">
              Stress Reduction
            </p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <TrendingDown className="w-4 h-4 text-green-500" />
              <p className="text-green-500 text-xs">Excellent work!</p>
            </div>
          </div>

          {/* Anxiety Progress */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm text-center">
            <div className="bg-purple-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#1A3A37]">
              {anxietyImprovement}%
            </h3>
            <p className="text-gray-600 text-sm font-medium">
              Anxiety Reduction
            </p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <TrendingDown className="w-4 h-4 text-green-500" />
              <p className="text-green-500 text-xs">Amazing journey!</p>
            </div>
          </div>
        </div>

        {/* Progress Chart */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-50 p-3 rounded-xl">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1A3A37]">
                15-Day Progress Overview
              </h2>
              <p className="text-gray-600 text-sm">
                Track your mental wellness scores over time (Scale: 1-10, lower
                is better)
              </p>
            </div>
          </div>

          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={progressData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#666" fontSize={12} />
                <YAxis stroke="#666" fontSize={12} domain={[0, 10]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="depression"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                  name="Depression"
                />
                <Line
                  type="monotone"
                  dataKey="stress"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                  name="Stress"
                />
                <Line
                  type="monotone"
                  dataKey="anxiety"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 4 }}
                  name="Anxiety"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-50 p-3 rounded-xl">
              <Lightbulb className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#1A3A37]">
                Personalized Recommendations
              </h2>
              <p className="text-gray-600 text-sm">
                Based on your progress and current needs
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Recommended Activities */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-50 p-3 rounded-xl">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A3A37]">
                    Recommended Activities
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Personalized for your progress
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-50 p-2 rounded-lg shrink-0">
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Morning Meditation
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Continue your 10-minute morning routine - it's showing
                        great results!
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>10 min daily</span>
                        <span className="mx-2">•</span>
                        <span className="text-green-600">85% effective</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-50 p-2 rounded-lg shrink-0">
                      <Calendar className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Evening Journaling
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Your journal entries are helping track emotional
                        patterns.
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>15 min daily</span>
                        <span className="mx-2">•</span>
                        <span className="text-blue-600">
                          Current streak: 7 days
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-50 p-2 rounded-lg shrink-0">
                      <Activity className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Breathing Exercises
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Try the 4-7-8 technique when feeling anxious.
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>3-5 min sessions</span>
                        <span className="mx-2">•</span>
                        <span className="text-purple-600">As needed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Resources */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-50 p-3 rounded-xl">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A3A37]">
                    Learning Resources
                  </h3>
                  <p className="text-gray-600 text-sm">Expand your knowledge</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-50 p-2 rounded-lg shrink-0">
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Cognitive Behavioral Therapy
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Learn CBT techniques to manage negative thought
                        patterns.
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>6-part series</span>
                        <span className="mx-2">•</span>
                        <span className="text-green-600">4 of 6 completed</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 p-2 rounded-lg shrink-0">
                      <Brain className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Mindfulness Guide
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Deepen your mindfulness practice with guided exercises.
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>Interactive guide</span>
                        <span className="mx-2">•</span>
                        <span className="text-blue-600">12 exercises</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="bg-red-50 p-2 rounded-lg shrink-0">
                      <Heart className="w-4 h-4 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Stress Management
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Advanced techniques for handling stress triggers.
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>4-module course</span>
                        <span className="mx-2">•</span>
                        <span className="text-red-600">Not started</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Insights */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-orange-50 p-3 rounded-xl">
                  <User className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1A3A37]">
                    Personal Insights
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Based on your patterns
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-50 p-2 rounded-lg shrink-0">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Best Performance
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Your mood is most stable during morning hours.
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>Peak time: 8-10 AM</span>
                        <span className="mx-2">•</span>
                        <span className="text-green-600">92% accuracy</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 p-2 rounded-lg shrink-0">
                      <Calendar className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Weekly Pattern
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Weekends show improved stress levels - maintain this
                        balance.
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>Weekend improvement</span>
                        <span className="mx-2">•</span>
                        <span className="text-blue-600">35% better</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-50 p-2 rounded-lg shrink-0">
                      <Shield className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Focus Area
                      </h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Social connections can boost your overall wellbeing.
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>Improvement area</span>
                        <span className="mx-2">•</span>
                        <span className="text-purple-600">High impact</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
