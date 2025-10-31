import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFavorites, removeFavorite } from "../../redux/favoritejobSlice";
import { Link } from "react-router";
import { Heart, Building2, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const FavoriteJobsPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: favorites, loading, error } = useSelector((state) => state.favorites);

  // Fetch favorites on page load
  useEffect(() => {
    if (user?.email) {
      dispatch(fetchFavorites(user.email));
    }
  }, [dispatch, user?.email]);

  // Remove favorite with SweetAlert confirmation
  const handleRemove = (favoriteId) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you want to remove this job from your favorites?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#11c3c0",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeFavorite(favoriteId));
        MySwal.fire("Removed!", "Job has been removed from favorites.", "success");
      }
    });
  };

  if (!user)
    return (
      <p className="text-center mt-10 text-gray-500">
        Please login to see your favorite jobs.
      </p>
    );
  if (loading)
    return <p className="text-center mt-10 text-gray-500">Loading favorites...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen rounded-lg bg-gradient-to-br from-[#11c3c0]/10 via-blue-50 to-[#11c3c0]/10 p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Your Favorite Jobs</h1>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
          <Heart size={64} className="text-gray-400" strokeWidth={1.5} />
          <h2 className="text-xl font-semibold text-gray-700">
            No favorite jobs yet
          </h2>
          <p className="text-gray-500">
            Start exploring jobs and save your favorites
          </p>
          <Link to="/jobs">
            <button className="bg-[#11c3c0] hover:bg-[#0ea3a0] text-white px-6 py-2 rounded-md transition">
              Browse Jobs
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((fav, index) => (
            <motion.div
              key={fav._id || index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold">{fav.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Building2 size={14} /> {fav.company}
                    </p>
                  </div>
                  <Heart
                    className="cursor-pointer text-[#11c3c0] hover:text-red-500"
                    fill="#11c3c0"
                    onClick={() => handleRemove(fav._id)}
                  />
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="bg-gray-100 px-2 py-1 text-xs rounded-full">
                    {fav.category}
                  </span>
                  <span className="bg-[#11c3c0] text-white px-2 py-1 text-xs rounded-full">
                    {fav.location}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Link to={`/jobs/${fav.jobId}`} className="flex-1">
                  <button className="w-full bg-[#11c3c0] text-white py-2 rounded-lg hover:bg-[#23a3a1] transition">
                    View Details
                  </button>
                </Link>
                {/* <a
                  href="#"
                  className="flex items-center gap-1 border px-3 py-2 rounded-lg hover:bg-gray-100"
                >
                  <ExternalLink size={14} /> Apply
                </a> */}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteJobsPage;
