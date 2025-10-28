import React, { useState } from "react";
import { Mail, MapPin, Phone, Calendar } from "lucide-react";
import EditProfileModal from "./EditProfileModal";
import { GoPencil, GoPerson } from "react-icons/go";

const MyProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    role: "Senior Product Designer",
    about:
      "Passionate designer with 8+ years of experience creating user-centered digital products. Focused on building intuitive interfaces that solve real problems.",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    memberSince: "January 2023",
    profileImage: "",
    backgroundImage: "",
  });

  const handleSave = (updatedProfile) => {
    setProfile(updatedProfile);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden">
        {/* Header */}
        {/* Header */}
        <div
          className="relative p-6 sm:p-8 h-48 flex items-end"
          style={{
            backgroundImage: profile.backgroundImage
              ? `url(${profile.backgroundImage})`
              : "linear-gradient(to right, #06b6d4, #0891b2)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-cyan-600/50"></div>

          <div className="relative top-24 flex items-center justify-between w-full">
            {/* Left section: Image + Info */}
            <div className="flex items-center space-x-6">
              {/* Profile image */}
              <div className="size-32 rounded-xl overflow-hidden border-4 border-white shadow-lg -mt-12 sm:-mt-16">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-cyan-600 flex items-center justify-center text-gray-100 text-5xl">
                    <GoPerson />
                  </div>
                )}
              </div>

              {/* Name and role */}
              <div>
                <h2 className="text-2xl font-bold text-black">{profile.name}</h2>
                <p className="text-gray-600">{profile.role}</p>
              </div>
            </div>

            {/* Right section: Edit button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-white bg-cyan-600 flex justify-center items-center gap-2 font-medium px-4 py-2 rounded-lg hover:bg-cyan-700 transition"
            >
              <GoPencil /> Edit Profile
            </button>
          </div>
        </div>


        {/* Body */}
        <div className="p-6 space-y-6 mt-16">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">About</h3>
            <p className="text-gray-600 leading-relaxed">{profile.about}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Contact Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-center space-x-3">
                <Mail className="text-cyan-500 w-5 h-5" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p>{profile.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-cyan-500 w-5 h-5" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p>{profile.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-cyan-500 w-5 h-5" />
                <div>
                  <p className="font-semibold">Location</p>
                  <p>{profile.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="text-cyan-500 w-5 h-5" />
                <div>
                  <p className="font-semibold">Member Since</p>
                  <p>{profile.memberSince}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        profile={profile}
        onSave={handleSave}
      />
    </div>
  );
};

export default MyProfile;
