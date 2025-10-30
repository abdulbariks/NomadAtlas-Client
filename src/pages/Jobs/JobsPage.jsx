import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobs, setCategory, setSearchQuery } from "../../redux/jobSlice";
import { motion } from "framer-motion";
import { Search, Heart, ExternalLink,Funnel,Building2 } from "lucide-react";
import { Link } from "react-router";
import { addFavorite, removeFavorite,fetchFavorites } from "../../redux/favoritejobSlice";


import { toast } from "react-hot-toast"; 


const categories = ["All Categories", "Engineering", "Design", "Marketing", "Product", "Developer"];

const JobsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { jobs, loading, error, selectedCategory, searchQuery } = useSelector((state) => state.jobs);
  // const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const { items: favorites } = useSelector((state) => state.favorites);
  

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);


      useEffect(() => {
  if (user?.email) {
    dispatch(fetchFavorites(user.email));
  }
}, [dispatch, user?.email]);

  // filter job
  const filteredJobs = jobs.filter((job) => {
    const matchesCategory =
      selectedCategory === "All Categories" || job.category === selectedCategory;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // add favorite job
  const isFavorite = (jobId) => favorites.some(f => f.jobId === jobId);


  const handleFavoriteToggle = (job) => {
  if (!user) return toast.error("Please login to save favorites");

  const fav = favorites.find(f => f.jobId === job._id);
  
  if (fav) {
    dispatch(removeFavorite(fav._id));
    toast.success("Removed from favorites");
  } else {
    dispatch(addFavorite({
      userEmail: user.email,
      jobId: job._id,
      title: job.title,
      company: job.company,
      category: job.category,
      location: job.location
    }));
    toast.success("Added to favorites");
  }
};



  if (loading) return <p className="text-center mt-10">Loading jobs...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="h-screen flex flex-col ">
      
      <h1 className="text-lg md:hidden block font-bold md:text text-center text-gray-700 mt-8 ">Find your dream job here</h1>
      {/* ✅ Mobile Top Bar with Search + Filter Button */}
      <div className="md:hidden flex items-center justify-between px-4 py-3    ">
  
        
        <div className="relative w-full max-w-xs">
          
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full border border-gray-300  rounded-lg py-2 pl-9 pr-4 text-sm focus:ring-2 focus:ring-[#93eeed]"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>
        {/* <button
          onClick={() => setMobileFilterOpen(true)}
          className="ml-3 flex items-center border px-3 py-2 rounded-lg text-sm hover:bg-gray-100"
        >
          <Filter size={16} className="mr-1" /> Filters
        </button> */}
      </div>

      {/* ✅ Mobile Filter Drawer
      {mobileFilterOpen && (
        <div className="fixed inset-0 bg-black/40 z-50 flex">
          <div className="bg-white w-72 h-full p-6 overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X size={20} />
              </button>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => dispatch(setCategory(cat))}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-2 ${
                  selectedCategory === cat ? "bg-primary text-white" : "hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )} */}

      {/* ✅ Main Layout */}
      <div className="flex flex-1 overflow-hidden">
       
        
        {/* ✅ Desktop Sidebar */}
        <div className="w-80 bg-white border-r border-r-gray-300 p-6 hidden md:block sticky top-0 h-screen overflow-y-auto">
         
          
          <h1 className="text-lg  font-bold md:text text-center text-gray-700 ">Find your dream job here</h1>
         
           <div className="relative w-full max-w-xs mt-6 mb-4">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search jobs..."
            className="w-full border border-gray-300 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#93eeed]"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </div>

          <h3 className="font-semibold text-lg flex   gap-2 items-center mb-4"><Funnel size={17} /> Filters</h3>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => dispatch(setCategory(cat))}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-2 ${
                selectedCategory === cat ? "bg-[#11c3c0] text-white" : "hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
          <p className="text-sm text-gray-500 mt-4">
            Showing <span className="text-[#11c3c0]">{filteredJobs.length}</span> jobs
          </p>
        </div>

        {/* ✅ Job Cards */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {filteredJobs.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">No jobs found.</p>
          ) : (

            
            filteredJobs.map((job, index) => (
              <motion.div
                key={job._id || index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.01 }}
                className="border border-gray-200 hover:border-[#75fbf8] rounded-xl  p-6 bg-white transition mb-6"
              >
                {/* ✅ Card Content */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-base-100 text-[#11c3c0] flex items-center justify-center rounded-full font-bold">
                      {job.company?.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{job.title}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1"><Building2 size={14} />{job.company}</p>
                    </div>
                  </div>
             <button
               onClick={() => handleFavoriteToggle(job)}
               className={`p-2 rounded-full transition ${
               isFavorite(job._id) ? "bg-[#11c3c0] text-white" : "bg-gray-100 text-gray-400"
                }`}
              >
            <Heart fill={isFavorite(job._id) ? "#11c3c0" : "none"} strokeWidth={2} />
            </button>


                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="bg-orange-300 text-gray-700 px-2 py-1 text-xs rounded-full">
                    {job.jobType}
                  </span>
                  <span className="bg-[#11c3c0] text-white px-2 py-1 text-xs rounded-full">
                    {job.location}
                  </span>
                  <span className="bg-orange-300 text-gray-700 px-2 py-1 text-xs rounded-full">
                    ${job.minSalary} - {job.maxSalary}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {job.skills?.map((skill, i) => (
                    <span key={i} className="bg-gray-100 px-2 py-1 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex justify-between items-center">


                  <Link to={`/jobs/${job._id}`} className="block w-full"><button className="w-full md:px-10 bg-[#11c3c0] text-white py-2 rounded-lg hover:bg-[#23a3a1] transition">
                    View Details
                  </button></Link>
                  <button className="flex items-center gap-1 ml-4 border px-4 py-2 rounded-lg hover:bg-gray-100">
                    <ExternalLink size={16} /> Apply
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;
