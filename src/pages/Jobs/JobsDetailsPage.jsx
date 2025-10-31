import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router";
import axios from "axios";
import {
  Heart,
  Check,
  FileText,
  HandHeart,
  BrainCircuit,
  Building2,
  MapPin,
  CalendarDays,
  CircleDollarSign,
  Globe,
  Send,
  ArrowRight,
  Clock4,
  Share2,
  Link,
  Mail,
  Linkedin,
} from "lucide-react";
import { motion } from "framer-motion";
import SimilarJobsCard from "./SimilarJobCard/SimilarJobsCard";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite, fetchFavorites } from "../../redux/favoritejobSlice";
import { toast } from "react-hot-toast";

const JobsDetailsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const dispatch = useDispatch();
  const { items: favorites } = useSelector((state) => state.favorites);
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);

  // Fetch favorites on page load or user change
  useEffect(() => {
    if (user?.email) {
      dispatch(fetchFavorites(user.email));
    }
  }, [dispatch, user?.email]);

  useEffect(() => {
    // Fetch job details from backend
    axios
      .get(`http://localhost:5000/api/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const isFavorite = (jobId) => favorites.some((f) => f.jobId === jobId);

  const handleFavoriteToggle = () => {
    if (!user) return toast.error("Please login to save favorites");

    const fav = favorites.find((f) => f.jobId === job._id);

    if (fav) {
      dispatch(removeFavorite(fav._id));
      toast.success("Removed from favorites ");
    } else {
      dispatch(
        addFavorite({
          userEmail: user.email,
          jobId: job._id,
          title: job.title,
          company: job.company,
          category: job.category,
          location: job.location,
        })
      );
      toast.success("Added to favorites");
    }
  };

  const handleSubmitApplication = async () => {
    if (!user) return toast.error("Please login first");

    const formData = new FormData();
    formData.append("jobId", job._id);
    formData.append("applicantEmail", user.email);
    formData.append("message", message);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/applications", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Application submitted successfully!");
      setMessage("");
      setImage(null);
    } catch (err) {
      toast.error("Failed to submit application");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`Check out this job: ${job.title}`);
    const body = encodeURIComponent(
      `I found this interesting job on NomadAtlas:\n\n${window.location.href}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(linkedInUrl, "_blank");
  };

  if (!job)
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  return (
    <motion.div
      className="mx-5 md:mx-8 lg:mx-10 py-6 grid md:grid-cols-3 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* LEFT MAIN CONTENT */}
      <div className="md:col-span-2">
        {/* Header */}
        <motion.div
          className="bg-base-100 p-5 mb-6 rounded-2xl border border-gray-300"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex justify-between items-center mb-3">
            {/* Title + Company */}
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">{job.title}</h1>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Building2 size={14} /> {job.company}
              </p>
              <div className="flex items-center gap-4 my-2">
                <span className=" text-gray-500 text-sm flex items-center gap-1">
                  <MapPin size={14} /> {job.location || "Remote"}
                </span>
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <CalendarDays size={14} /> Posted {job.postedTime}
                </span>
              </div>
            </div>
            <button
              onClick={() => handleFavoriteToggle(job)}
              className={`p-2 rounded-full transition ${
                isFavorite(job._id)
                  ? "bg-[#11c3c0] text-white"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              <Heart fill={isFavorite(job._id) ? "#11c3c0" : "none"} strokeWidth={2} />
            </button>
          </div>

          {/* Icons + Info */}
          <div className="flex flex-wrap gap-3 mb-5">
            <span className="px-3 py-1 bg-orange-300 text-gray-700 rounded-lg text-sm flex items-center gap-1">
              <Clock4 size={14} /> {job.jobType || "Full Time"}
            </span>

            <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm flex items-center gap-1">
              <CircleDollarSign size={14} /> ${job.minSalary} -${job.maxSalary}
            </span>
          </div>

          {/* Buttons with Icon Hover Effect */}
          <div className="flex flex-wrap gap-4 mt-4">
            {/* Apply Button with Motion + Icon Change */}
            <motion.a
              href={job.applicationUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="bg-[#11c3c0] hover:bg-[#09a4a1] text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition group"
            >
              <Send className="w-4 h-4 group-hover:hidden" />
              <ArrowRight className="w-4 h-4 hidden group-hover:block" />
              Apply Now
            </motion.a>

            {/* Company Site Button */}
            {/* <motion.a
              href={job.companyProfile || "#"}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ x: 3 }}
              className="border border-gray-400 hover:border-[#11c3c0] hover:text-[#11c3c0] text-[#11c3c0] px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
            >
              <Globe className="w-4 h-4" />
              Company Site
            </motion.a> */}
          </div>
        </motion.div>

        <motion.div
          className="bg-base-100 py-6 px-5 rounded-2xl border-1 border-gray-300 mb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {/* About */}
          <motion.section
            className="mb-5 p-5 rounded-2xl border-1 border-cyan-100 bg-cyan-50/80"
            whileHover={{ scale: 1.01 }}
          >
            <h2 className="font-semibold mb-2 text-lg">About the Role</h2>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </motion.section>

          {/* Requirements */}
          <motion.section
            className="mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="font-semibold mb-2 flex items-center gap-1 text-xl text-gray-800">
              <FileText className="text-cyan-500" size={20} />
              Requirements
            </h2>
            <ul className="list-none ml-2 text-gray-700">
              {job.requirements.map((req, i) => (
                <li key={i} className="flex items-start">
                  <Check className="min-w-4 text-green-600 mr-2 mt-1 max-w-4" />{" "}
                  <span className="text-sm sm:text-base leading-snug">{req}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Benefits */}
          <motion.section
            className="mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 className="font-semibold mb-2 text-xl flex items-center gap-1 text-gray-800">
              <HandHeart className="text-orange-400" size={20} />
              Benefits
            </h2>
            <ul className="list-disc ml-2 text-gray-700">
              {job.benefits.map((ben, i) => (
                <li key={i} className="flex items-start">
                  <Check className="min-w-4 text-green-600 mr-2 mt-1 max-w-4" />{" "}
                  <span className="text-sm sm:text-base leading-snug">{ben}</span>
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Skills */}
          <motion.section
            className="mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h2 className="font-semibold mb-3 text-xl flex items-center gap-1 text-gray-800">
              <BrainCircuit className="text-blue-400" size={20} />
              Skills & Technologies
            </h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1 bg-gray-100 rounded-lg text-sm"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.section>
        </motion.div>

        {/* Apply Section */}
        <motion.section
          className="border-t pt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="font-semibold mb-2 text-lg">Apply for this position</h2>
          <textarea
            className="w-full border rounded-lg p-3 mb-3"
            placeholder="Tell us why you're a great fit..."
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-3 w-full border p-2 rounded-lg"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSubmitApplication}
            className="w-full bg-[#11c3c0] hover:bg-[#23a3a1] text-white font-semibold py-2 rounded-lg transition"
          >
            Submit Application
          </motion.button>
        </motion.section>
      </div>

      {/* RIGHT SIDEBAR */}
      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Share Job*/}
        <motion.div
          className="bg-white rounded-2xl border border-gray-300 p-6"
          whileHover={{ scale: 1.01 }}
        >
          {/* Title */}
          <div className="flex items-center gap-2 mb-4">
            <Share2 size={18} className="text-gray-600" />
            <h3 className="font-semibold text-gray-700">Share Job</h3>
          </div>

          {/* Options */}
          <div className="space-y-2">
            <motion.button
              onClick={handleCopyLink}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-600 px-4 py-2 border border-gray-300 rounded-lg transition"
            >
              <Link size={16} />
              Copy Link
            </motion.button>

            <motion.button
              onClick={handleEmailShare}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-600 px-4 py-2 border border-gray-300 rounded-lg transition"
            >
              <Mail size={16} />
              Share via Email
            </motion.button>

            <motion.button
              onClick={handleLinkedInShare}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-600 px-4 py-2 border border-gray-300 rounded-lg transition"
            >
              <Linkedin size={16} />
              Share on LinkedIn
            </motion.button>
          </div>
        </motion.div>

        {/* similar job card */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <SimilarJobsCard category={job.category} jobId={job._id} />
        </motion.div>

        {/* Job Stats
        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="font-semibold mb-3">Job Statistics</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>👁 Views: {job.stats.views}</li>
            <li>📨 Applications: {job.stats.applications}</li>
            <li>📅 Posted: {job.postedDate}</li>
          </ul>
        </div> */}

        {/* Company Info */}
        {/* <div className="bg-white shadow rounded-xl p-5">
          <h3 className="font-semibold mb-2">About {job.company}</h3>
          <p className="text-gray-600 text-sm mb-3">
            A leading company known for innovation and excellent work culture.
          </p>
          <button className="border border-[#11c3c0] text-[#11c3c0] px-4 py-1 rounded-lg hover:bg-[#11c3c0] hover:text-white transition">
            View Company Profile
          </button>
        </div> */}
      </motion.div>
    </motion.div>
  );
};

export default JobsDetailsPage;
