import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  Heart,
  AlertCircle,
  Edit3,
  Save,
  Lock,
  Key,
  Trash,
} from "lucide-react";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    firstName: "Dhyaneshvar",
    lastName: "K",
    email: "dhyaneshvar.k@gmail.com",
    phone: "9892526542",
    dateOfBirth: "2005-01-15",
    therapist: "Chennai , India",
    emergencyContact: "Dhyaneshvar - Friend Ritovan",
    emergencyPhone: "9892525348",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save logic would go here
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Profile Header Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-[#1A3A37] rounded-2xl flex items-center justify-center shadow-sm">
                <span className="text-white text-4xl font-bold">
                  {profile.firstName[0]}
                  {profile.lastName[0]}
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-[#1A3A37] mb-1">
                  {profile.firstName} {profile.lastName}
                </h2>
                <p className="text-gray-600 mb-2">Member since January 2025</p>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4 text-gray-500" />
                    {profile.email}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-4 h-4 text-gray-500" />
                    {profile.phone}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 bg-[#1A3A37] text-white px-6 py-3 rounded-full font-medium hover:bg-[#154F4A] transition-colors shadow-sm"
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4" />
                  Save & Exit
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-50 p-3 rounded-xl">
                  <User className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-[#1A3A37]">
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-4 md:space-y-0">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={profile.firstName}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfile({ ...profile, firstName: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg text-sm transition-all ${
                      isEditing
                        ? "border-gray-300 bg-white focus:outline-none focus:border-[#1A3A37] focus:ring-1 focus:ring-[#1A3A37]"
                        : "border-gray-200 bg-gray-50 text-gray-600"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={profile.lastName}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfile({ ...profile, lastName: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg text-sm transition-all ${
                      isEditing
                        ? "border-gray-300 bg-white focus:outline-none focus:border-[#1A3A37] focus:ring-1 focus:ring-[#1A3A37]"
                        : "border-gray-200 bg-gray-50 text-gray-600"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg text-sm transition-all ${
                      isEditing
                        ? "border-gray-300 bg-white focus:outline-none focus:border-[#1A3A37] focus:ring-1 focus:ring-[#1A3A37]"
                        : "border-gray-200 bg-gray-50 text-gray-600"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg text-sm transition-all ${
                      isEditing
                        ? "border-gray-300 bg-white focus:outline-none focus:border-[#1A3A37] focus:ring-1 focus:ring-[#1A3A37]"
                        : "border-gray-200 bg-gray-50 text-gray-600"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={profile.dateOfBirth}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfile({ ...profile, dateOfBirth: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg text-sm transition-all ${
                      isEditing
                        ? "border-gray-300 bg-white focus:outline-none focus:border-[#1A3A37] focus:ring-1 focus:ring-[#1A3A37]"
                        : "border-gray-200 bg-gray-50 text-gray-600"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    value={profile.therapist}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfile({ ...profile, therapist: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg text-sm transition-all ${
                      isEditing
                        ? "border-gray-300 bg-white focus:outline-none focus:border-[#1A3A37] focus:ring-1 focus:ring-[#1A3A37]"
                        : "border-gray-200 bg-gray-50 text-gray-600"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-red-50 p-3 rounded-xl">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-[#1A3A37]">
                  Emergency Contact
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Contact Person
                  </label>
                  <input
                    type="text"
                    value={profile.emergencyContact}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        emergencyContact: e.target.value,
                      })
                    }
                    className={`w-full px-4 py-2 border rounded-lg text-sm transition-all ${
                      isEditing
                        ? "border-gray-300 bg-white focus:outline-none focus:border-[#1A3A37] focus:ring-1 focus:ring-[#1A3A37]"
                        : "border-gray-200 bg-gray-50 text-gray-600"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Emergency Phone
                  </label>
                  <input
                    type="tel"
                    value={profile.emergencyPhone}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfile({ ...profile, emergencyPhone: e.target.value })
                    }
                    className={`w-full px-4 py-2 border rounded-lg text-sm transition-all ${
                      isEditing
                        ? "border-gray-300 bg-white focus:outline-none focus:border-[#1A3A37] focus:ring-1 focus:ring-[#1A3A37]"
                        : "border-gray-200 bg-gray-50 text-gray-600"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Account Stats */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-50 p-3 rounded-xl">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-[#1A3A37]">
                  Account Summary
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Member since</span>
                  <span className="font-semibold text-[#1A3A37]">Jan 2025</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">
                    Sessions completed
                  </span>
                  <span className="font-semibold text-[#1A3A37]">24</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Hours practiced</span>
                  <span className="font-semibold text-[#1A3A37]">156h</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Current streak</span>
                  <span className="font-semibold text-[#1A3A37]">30 days</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-[#1A3A37] mb-4">
                Settings
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 hover:border-gray-300 border border-gray-200 transition-colors text-sm font-medium text-gray-700 flex items-center gap-3">
                  <Lock className="w-4 h-4 text-gray-600" />
                  Privacy Settings
                </button>
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 hover:border-gray-300 border border-gray-200 transition-colors text-sm font-medium text-gray-700 flex items-center gap-3">
                  <Key className="w-4 h-4 text-gray-600" />
                  Change Password
                </button>
                <button className="w-full text-left p-3 bg-red-50 rounded-lg hover:bg-red-100 border border-red-200 transition-colors text-sm font-medium text-red-600 flex items-center gap-3">
                  <Trash className="w-4 h-4" />
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Save/Cancel Actions - Visible when editing */}
        {isEditing && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex justify-end gap-3">
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-[#1A3A37] text-white rounded-full font-medium hover:bg-[#154F4A] transition-colors shadow-sm"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
