import React, { useEffect, useState } from "react";
import { Mail, MapPin, Phone, Calendar } from "lucide-react";
import EditProfileModal from "./EditProfileModal";
import { GoPencil, GoPerson } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
// import useAxiosSecure from "../../customHook/useAxiosSecure";
import NomadAtlasLoader from "../../components/Home/NomadAtlasLoader";
import { fetchUserByEmail } from "../../redux/userSlice";

const MyProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  // Get the current user data from Redux store
  const { currentUser, loading, error } = useSelector((state) => state.users);
  // const axiosSecure = useAxiosSecure();

  // Get the logged-in user's email from your auth state
  const { user: authUser } = useSelector((state) => state.auth); // Adjust this based on your auth slice

  console.log("currentUser", currentUser);

  useEffect(() => {
    if (authUser?.email) {
      dispatch(fetchUserByEmail(authUser.email));
    }
  }, [dispatch, authUser?.email]);

  // Use actual user data from Redux or fallback to default
  const [profile, setProfile] = useState({
    name: currentUser?.name || "Add A Name",
    role: currentUser?.role || "Role can't be changed",
    status: currentUser?.status || "Add Your Position",
    about: currentUser?.about || "Add About Yourself",
    email: currentUser?.email || "Add A Email",
    phone: currentUser?.phone || "Add A Phone Number",
    location: currentUser?.location || "Add Your Location",
    memberSince: currentUser?.createdAt ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Add Your Joining Date In the Website",
    profileImage: currentUser?.photoURL || "",
    backgroundImage: currentUser?.backgroundImage || "",
  });

  console.log("profile data", profile)
  // Update profile state when currentUser changes
  useEffect(() => {
    if (currentUser) {
      setProfile({
        name: currentUser.name || "Add A Name",
        role: currentUser.role || "Role can't be changed",
        status: currentUser.status || "Add Your Position",
        about: currentUser.about || "Add About Yourself",
        email: currentUser.email,
        phone: currentUser.phone || "Add A Phone Number",
        location: currentUser.location || "Add Your Location",
        memberSince: currentUser.createdAt ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : "Add Your Joining Date In the Website",
        profileImage: currentUser.photoURL || "",
        backgroundImage: currentUser.backgroundImage || "",
      });
    }
  }, [currentUser]);

  const handleSave = (updatedProfile) => {
    setProfile(updatedProfile);
    setIsModalOpen(false);
  };

  if (loading) return <NomadAtlasLoader />;

  if (error) {
    let errMsg =
      typeof error === "string" ? error : error?.message || "Failed to fetch user data";
    return <p className="text-center text-red-500 mt-6">{errMsg}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white border border-gray-300 rounded-2xl w-full max-w-3xl overflow-hidden">
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

          <div className="relative flex flex-col sm:flex-row items-center sm:justify-between w-full gap-4 sm:gap-0 px-4 top-20 sm:top-28">
            {/* Left section: Image + Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3 sm:gap-6">
              {/* Profile image */}
              <div className="size-28 md:size-32 sm:w-40 sm:h-40 rounded-xl overflow-hidden border-4 border-white shadow-lg -mt-12 sm:-mt-16">
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
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-black">{profile.name} ( {profile.role === "admin" ? `${profile.role}` : ""} )</h2>
                <p className="md:text-gray-600 text-gray-200 text-base">{profile.status}</p>
              </div>
            </div>

            {/* Right section: Edit button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-white bg-cyan-600 flex justify-center items-center gap-2 font-medium px-4 py-2 rounded-lg hover:bg-cyan-700 transition w-full sm:w-auto"
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