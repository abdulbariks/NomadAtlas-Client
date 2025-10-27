import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, MapPin, Phone, Calendar } from "lucide-react";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: profile,
  });

  const onSubmit = (data) => {
    setProfile(data);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden shadow">
        {/* Header */}
        <div
          className="relative p-6 sm:p-8"
          style={{
            backgroundImage: profile.backgroundImage
              ? `url(${profile.backgroundImage})`
              : "linear-gradient(to right, #06b6d4, #0891b2)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-cyan-600/50"></div>
          <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden border-4 border-white shadow-lg">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-cyan-100 flex items-center justify-center text-cyan-700 text-5xl">
                    👤
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                <p className="text-cyan-100">{profile.role}</p>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 sm:mt-0 bg-white text-cyan-600 font-medium px-4 py-2 rounded-lg hover:bg-cyan-50 transition"
            >
              ✏️ Edit Profile
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
              Edit Profile
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Full Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Role
                </label>
                <input
                  {...register("role")}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* About */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  About
                </label>
                <textarea
                  {...register("about")}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                ></textarea>
              </div>

              {/* Profile Image URL */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Profile Image URL
                </label>
                <input
                  {...register("profileImage")}
                  placeholder="Paste image URL"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Background Image URL */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Background Image URL
                </label>
                <input
                  {...register("backgroundImage")}
                  placeholder="Paste background image URL"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Phone
                  </label>
                  <input
                    {...register("phone")}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Location
                  </label>
                  <input
                    {...register("location")}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Member Since
                  </label>
                  <input
                    {...register("memberSince")}
                    className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
