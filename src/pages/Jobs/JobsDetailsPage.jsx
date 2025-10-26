"use client";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import axios from "axios";
import { Heart,Check,FileText,HandHeart,BrainCircuit ,Building2,MapPin, CalendarDays, CircleDollarSign, Globe, Send,ArrowRight,Clock4, Share2, Link, Mail, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import SimilarJobsCard from "./SimilarJobCard/SimilarJobsCard";

const JobsDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    // Fetch job details from backend
    axios
      .get(`http://localhost:5000/api/jobs/${id}`)
      .then((res) => setJob(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!job)
    return <div className="text-center mt-20 text-gray-500">Loading...</div>;

  return (
    <div className="mx-5 md:mx-8 lg:mx-10 py-6 grid md:grid-cols-3 gap-4 ">
      {/* LEFT MAIN CONTENT */}
      <div className="md:col-span-2   ">
        {/* Header */}

      <div className="bg-base-100 p-5 mb-6 rounded-2xl border border-gray-300 ">
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
    <Heart className="text-gray-400 hover:text-red-500 cursor-pointer" />
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
      className="bg-[#11c3c0] hover:bg-[#09a4a1] text-white px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
    >
      <Send className="w-4 h-4 group-hover:hidden" />
      <ArrowRight className="w-4 h-4 hidden group-hover:block" />
      Apply Now
    </motion.a>

    {/* Company Site Button */}
    <motion.a
      href={job.companyProfile
 || "#"}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ x: 3 }}
      className="border border-gray-400 hover:border-[#11c3c0] hover:text-[#11c3c0] text-[#11c3c0] px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition"
    >
      <Globe className="w-4 h-4" />
      Company Site
    </motion.a>
  </div>
</div>


         <div className="bg-base-100 py-6 px-5 rounded-2xl border-1 border-gray-300 mb-4">
        {/* About */}
        <section className="mb-5   p-5 rounded-2xl border-1 border-cyan-100 bg-cyan-50/80">
          <h2 className="font-semibold mb-2 text-lg">About the Role</h2>
          <p className="text-gray-700 leading-relaxed">{job.description}</p>
        </section>

        {/* Requirements */}
        <section className="mb-5">
        <h2 className="font-semibold mb-2 flex items-center gap-1 text-xl text-gray-800"> <FileText className="text-cyan-500" size={20} />Requirements</h2>
          <ul className="list-none ml-2 text-gray-700 ">
            {job.requirements.map((req, i) => (
              <li key={i} className="flex items-start"> <Check className="min-w-4 text-green-600 mr-2 mt-1 max-w-4" /> <span className="text-sm sm:text-base leading-snug">{req}</span></li>
            ))}
          </ul>
        </section>

        {/* Benefits */}
        <section className="mb-5">
          <h2 className="font-semibold mb-2 text-xl flex items-center gap-1 text-gray-800">  <HandHeart className="text-orange-400" size={20} />Benefits</h2>
          <ul className="list-disc ml-2 text-gray-700  ">
            {job.benefits.map((ben, i) => (
              <li key={i} className="flex items-start" > <Check className="min-w-4 text-green-600 mr-2 mt-1 max-w-4" /> 
                <span className="text-sm sm:text-base leading-snug">{ben}</span></li>
            ))}
          </ul>
        </section>

        {/* Skills */}
        <section className="mb-5">
          <h2 className="font-semibold mb-3 text-xl flex items-center gap-1 text-gray-800"> <BrainCircuit className="text-blue-400" size={20} />Skills & Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 rounded-lg text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
        </div>

        {/* Apply Section */}
        <section className="border-t pt-4">
          <h2 className="font-semibold mb-2 text-lg">Apply for this position</h2>
          <textarea
            className="w-full border rounded-lg p-3 mb-3"
            placeholder="Tell us why you're a great fit..."
            rows={3}
          ></textarea>
          <button className="w-full bg-[#11c3c0] hover:bg-[#23a3a1] text-white font-semibold py-2 rounded-lg transition">
            Submit Application
          </button>
        </section>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="space-y-6">
        {/* Share Job*/}
        <div className="bg-white rounded-2xl border border-gray-300 p-6">
      
      {/* Title */}
      <div className="flex items-center gap-2 mb-4">
        <Share2 size={18} className="text-gray-600" />
        <h3 className="font-semibold text-gray-700">Share Job</h3>
      </div>

      {/* Options */}
      <div className="space-y-2">

        {/* Copy Link */}
        <button className="w-full flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-600 px-4 py-2 border border-gray-300 rounded-lg transition">
          <Link size={16} />
          Copy Link
        </button>

        {/* Share via Email */}
        <button className="w-full flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-600 px-4 py-2 border border-gray-300 rounded-lg transition">
          <Mail size={16} />
          Share via Email
        </button>

        {/* Share on LinkedIn */}
        <button className="w-full flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-600 px-4 py-2 border border-gray-300 rounded-lg transition">
          <Linkedin size={16} />
          Share on LinkedIn
        </button>

      </div>
    </div>
  
     {/* similar job card */}

     <div>
      <SimilarJobsCard/>
     </div>

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
        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="font-semibold mb-2">About {job.company}</h3>
          <p className="text-gray-600 text-sm mb-3">
            A leading company known for innovation and excellent work culture.
          </p>
          <button className="border border-[#11c3c0] text-[#11c3c0] px-4 py-1 rounded-lg hover:bg-[#11c3c0] hover:text-white transition">
            View Company Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsDetailsPage;
