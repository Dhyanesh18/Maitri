import React, { useState } from "react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-01-15",
    therapist: "Dr. Sarah Johnson",
    emergencyContact: "Jane Doe - Sister",
    emergencyPhone: "+1 (555) 987-6543",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  return (
    <div className="p-6 w-full min-w-0 max-w-none">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Profile Settings
          </h1>
          <p className="text-gray-600">
            Manage your personal information and preferences
          </p>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-[#1A3A37] text-white px-4 py-2 rounded-lg hover:bg-[#154F4A]"
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Personal Information
            </h2>

            {/* Profile Picture */}
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-[#1A3A37] rounded-full flex items-center justify-center mr-4">
                <span className="text-white text-2xl font-bold">
                  {profile.firstName[0]}
                  {profile.lastName[0]}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {profile.firstName} {profile.lastName}
                </h3>
                <p className="text-gray-600">Member since January 2025</p>
                {isEditing && (
                  <button className="text-[#1A3A37] text-sm hover:underline mt-1">
                    Change Photo
                  </button>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={profile.firstName}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({ ...profile, firstName: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:ring-[#1A3A37]"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={profile.lastName}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({ ...profile, lastName: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:ring-[#1A3A37]"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:ring-[#1A3A37]"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:ring-[#1A3A37]"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={profile.dateOfBirth}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({ ...profile, dateOfBirth: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:ring-[#1A3A37]"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Therapist
                </label>
                <input
                  type="text"
                  value={profile.therapist}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({ ...profile, therapist: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:ring-[#1A3A37]"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={handleSave}
                  className="bg-[#1A3A37] text-white px-6 py-2 rounded-lg hover:bg-[#154F4A]"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Emergency Contact */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Emergency Contact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Person
                </label>
                <input
                  type="text"
                  value={profile.emergencyContact}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({ ...profile, emergencyContact: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:ring-[#1A3A37]"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Phone
                </label>
                <input
                  type="tel"
                  value={profile.emergencyPhone}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile({ ...profile, emergencyPhone: e.target.value })
                  }
                  className={`w-full px-3 py-2 border rounded-lg ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:ring-[#1A3A37]"
                      : "border-gray-200 bg-gray-50"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Account Stats */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Account Summary
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Member since</span>
                <span className="font-medium">Jan 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sessions completed</span>
                <span className="font-medium">24</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hours practiced</span>
                <span className="font-medium">156h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Current streak</span>
                <span className="font-medium">30 days</span>
              </div>
            </div>
          </div>

          {/* Account Settings */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Account Settings
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Notifications</span>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>

              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Privacy Settings</span>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>

              <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Change Password</span>
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </button>

              <button className="w-full text-left p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                <span className="font-medium text-red-600">Delete Account</span>
              </button>
            </div>
          </div>

          {/* Support */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-[#F9E6D0] rounded-lg hover:bg-[#F5E1CC] transition-colors">
                <div className="flex items-center">
                  <span className="text-xl mr-3">💬</span>
                  <span className="font-medium text-[#1A3A37]">
                    Contact Support
                  </span>
                </div>
              </button>

              <button className="w-full text-left p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="flex items-center">
                  <span className="text-xl mr-3">❓</span>
                  <span className="font-medium text-blue-800">FAQ & Help</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
