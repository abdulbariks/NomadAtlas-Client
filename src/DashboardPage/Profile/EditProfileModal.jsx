import React from "react";
import { useForm } from "react-hook-form";

const EditProfileModal = ({ isOpen, onClose, profile, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: profile });

  const onSubmit = (data) => {
    onSave(data);
  };

  if (!isOpen) return null;

  return (
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
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <input
              {...register("role")}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* About */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">About</label>
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
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                {...register("email")}
                type="email"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
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
              onClick={onClose}
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
  );
};

export default EditProfileModal;
