import React from "react";
import { Link } from "react-router-dom";

export default function Sessions() {
  return (
    <div className="p-6 w-full min-w-0 max-w-none">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Therapy Sessions
        </h1>
        <p className="text-gray-600">
          Manage your therapy appointments and session history
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <button className="bg-[#1A3A37] text-white p-6 rounded-xl hover:bg-[#154F4A] transition-colors">
          <div className="text-center">
            <div className="text-3xl mb-2">📅</div>
            <h3 className="font-semibold">Book Session</h3>
            <p className="text-sm opacity-90">Schedule new appointment</p>
          </div>
        </button>

        <button className="bg-blue-600 text-white p-6 rounded-xl hover:bg-blue-700 transition-colors">
          <div className="text-center">
            <div className="text-3xl mb-2">💻</div>
            <h3 className="font-semibold">Join Session</h3>
            <p className="text-sm opacity-90">Start video call</p>
          </div>
        </button>

        <button className="bg-purple-600 text-white p-6 rounded-xl hover:bg-purple-700 transition-colors">
          <div className="text-center">
            <div className="text-3xl mb-2">📝</div>
            <h3 className="font-semibold">Session Notes</h3>
            <p className="text-sm opacity-90">Review past sessions</p>
          </div>
        </button>
      </div>

      {/* Upcoming Sessions */}
      <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Upcoming Sessions
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-[#1A3A37] rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-semibold">SJ</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  Dr. Sarah Johnson
                </h3>
                <p className="text-gray-600">Individual Therapy</p>
                <p className="text-sm text-[#1A3A37]">
                  Today, 3:00 PM - 4:00 PM
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-[#1A3A37] text-white px-4 py-2 rounded-lg hover:bg-[#154F4A]">
                Join
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                Reschedule
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                <span className="text-white font-semibold">GT</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Group Therapy</h3>
                <p className="text-gray-600">Anxiety Support Group</p>
                <p className="text-sm text-[#1A3A37]">
                  Tomorrow, 10:00 AM - 11:30 AM
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Join
              </button>
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Session History */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Recent Sessions
        </h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Dr. Sarah Johnson</h4>
              <p className="text-sm text-gray-600">
                Individual Therapy - Nov 1, 2025
              </p>
            </div>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
              Completed
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Dr. Michael Chen</h4>
              <p className="text-sm text-gray-600">
                CBT Session - Oct 29, 2025
              </p>
            </div>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
              Completed
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Group Therapy</h4>
              <p className="text-sm text-gray-600">
                Mindfulness Group - Oct 27, 2025
              </p>
            </div>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
              Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
