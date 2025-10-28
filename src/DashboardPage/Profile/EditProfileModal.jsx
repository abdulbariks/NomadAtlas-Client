import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import useImageUpload from "../../customHook/useImageUpload";

const EditProfileModal = ({ isOpen, onClose, profile, onSave }) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: profile,
  });

  // Use separate hook instances for profile and background images
  const { picture: profilePicture, handleImageUpload: handleProfileImageUpload } = useImageUpload();
  const { picture: backgroundPicture, handleImageUpload: handleBackgroundImageUpload } = useImageUpload();

  // Create refs for file inputs
  const profileImageInputRef = useRef(null);
  const backgroundImageInputRef = useRef(null);

  console.log("profile picture", profilePicture);
  console.log("background picture", backgroundPicture);

  // Watch form values to update previews
  const formValues = watch();

  // Set image URLs when pictures update
  useEffect(() => {
    if (profilePicture) {
      setValue("profileImage", profilePicture);
    }
  }, [profilePicture, setValue]);

  useEffect(() => {
    if (backgroundPicture) {
      setValue("backgroundImage", backgroundPicture);
    }
  }, [backgroundPicture, setValue]);

  // Reset form when profile changes
  useEffect(() => {
    reset(profile);
  }, [profile, reset]);

  // Trigger file input click
  const triggerProfileImageInput = () => {
    profileImageInputRef.current?.click();
  };

  const triggerBackgroundImageInput = () => {
    backgroundImageInputRef.current?.click();
  };

  const onSubmit = (data) => {
    console.log("all updated data", data);
    onSave(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              {...register("name")}
              placeholder="Add your full name"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder:text-gray-400"
            />
            {!formValues.name && (
              <p className="text-sm text-gray-500 mt-1">Add your name</p>
            )}
          </div>

          {/* Role (Read-only - from database) */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Role
            </label>
            <input
              {...register("role")}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-50 placeholder:text-gray-400"
              readOnly
            />
            <p className="text-sm text-gray-500 mt-1">Role is assigned by system</p>
          </div>

          {/* Position (Editable - will save as status) */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Position / Title
            </label>
            <input
              {...register("status")}
              placeholder="Add your position or title (e.g., Senior Developer, Project Manager)"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder:text-gray-400"
            />
            {!formValues.status && (
              <p className="text-sm text-gray-500 mt-1">Add your position</p>
            )}
          </div>

          {/* About */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              About
            </label>
            <textarea
              {...register("about")}
              placeholder="Add information about yourself"
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none placeholder:text-gray-400"
            />
            {!formValues.about && (
              <p className="text-sm text-gray-500 mt-1">Add about information</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="Add email address"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-50 placeholder:text-gray-400"
              readOnly
            />
            <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone
            </label>
            <input
              {...register("phone")}
              placeholder="Add phone number"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder:text-gray-400"
            />
            {!formValues.phone && (
              <p className="text-sm text-gray-500 mt-1">Add phone number</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Location
            </label>
            <input
              {...register("location")}
              placeholder="Add your location"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder:text-gray-400"
            />
            {!formValues.location && (
              <p className="text-sm text-gray-500 mt-1">Add location</p>
            )}
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Profile Image
            </label>

            {/* Hidden file input for profile image */}
            <input
              type="file"
              ref={profileImageInputRef}
              onChange={handleProfileImageUpload}
              className="hidden"
              accept="image/*"
            />

            <div className="flex gap-2">
              <input
                {...register("profileImage")}
                placeholder="Profile image URL or upload using button"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={triggerProfileImageInput}
                className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition whitespace-nowrap"
              >
                Upload
              </button>
            </div>
            {!formValues.profileImage && !profilePicture && (
              <p className="text-sm text-gray-500 mt-1">Add profile image</p>
            )}
            {(profilePicture || formValues.profileImage) && (
              <div className="mt-2">
                <p className="text-sm text-green-600">Image preview:</p>
                <img
                  src={profilePicture || formValues.profileImage}
                  alt="Preview"
                  className="mt-1 h-20 w-20 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* Background Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Background Image
            </label>

            {/* Hidden file input for background image */}
            <input
              type="file"
              ref={backgroundImageInputRef}
              onChange={handleBackgroundImageUpload}
              className="hidden"
              accept="image/*"
            />

            <div className="flex gap-2">
              <input
                {...register("backgroundImage")}
                placeholder="Background image URL or upload using button"
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={triggerBackgroundImageInput}
                className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition whitespace-nowrap"
              >
                Upload
              </button>
            </div>
            {!formValues.backgroundImage && !backgroundPicture && (
              <p className="text-sm text-gray-500 mt-1">Add background image</p>
            )}
            {(backgroundPicture || formValues.backgroundImage) && (
              <div className="mt-2">
                <p className="text-sm text-green-600">Background preview:</p>
                <img
                  src={backgroundPicture || formValues.backgroundImage}
                  alt="Background Preview"
                  className="mt-1 h-20 w-full object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* Member Since (Read-only) */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Member Since
            </label>
            <input
              {...register("memberSince")}
              placeholder="Add member since date"
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-gray-50 placeholder:text-gray-400"
              readOnly
            />
            <p className="text-sm text-gray-500 mt-1">Member since cannot be changed</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 rounded-lg py-3 font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-cyan-600 text-white rounded-lg py-3 font-medium hover:bg-cyan-700 transition"
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