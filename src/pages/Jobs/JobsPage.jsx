"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Heart, ExternalLink } from "lucide-react";

const categories = ["All Categories", "Engineering", "Design", "Marketing", "Product"];

const jobData = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechVision Inc",
    type: "Full-time",
    location: "Remote • Worldwide",
    salary: "$100,000 - $120,000",
    category: "Engineering",
    skills: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
    flexibility: "95%",
    sentiment: "88%",
  },
  {
    id: 2,
    title: "UX/UI Designer",
    company: "DesignLab Studio",
    type: "Full-time",
    location: "Remote • Europe",
    salary: "$60,000 - $80,000",
    category: "Design",
    skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    flexibility: "90%",
    sentiment: "85%",
  },
 {
    id: 3,
    title: "Backend Developer (Node.js)",
    company: "CloudScale Systems",
    type: "Full-time",
    location: "Remote • Americas",
    salary: "$75,000 - $110,000",
    skills: ["Node.js", "PostgreSQL", "Docker", "AWS"],
    flexibility: "92%",
    sentiment: "90%",
  },
  {
    id: 4,
    title: "Product Manager",
    company: "InnovateX",
    type: "Full-time",
    location: "Remote • Worldwide",
    salary: "$90,000 - $130,000",
    skills: ["Agile", "Roadmapping", "Team Collaboration"],
    flexibility: "94%",
    sentiment: "87%",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "NextGen Cloud",
    type: "Contract",
    location: "Remote",
    salary: "$80,000 - $100,000",
    skills: ["Kubernetes", "CI/CD", "AWS", "Terraform"],
    flexibility: "93%",
    sentiment: "89%",
  },
];

const JobsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const filteredJobs =
    selectedCategory === "All Categories"
      ? jobData
      : jobData.filter((job) => job.category === selectedCategory);

  return (
    <div className="px-5 md:px-8 lg:px-10 py-10">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-xl font-medium text-gray-600">Find your perfect remote opportunity</h2>
        <p className="text-sm text-gray-500">✨ {jobData.length} remote positions available</p>
      </div>

      {/* AI-Powered Job Matching */}
      <div className="bg-[#EBFDFC] border border-[#11C3C0] py-4 px-6 rounded-lg mb-6">
        <h3 className="font-semibold text-[#11C3C0]">⚡ AI-Powered Job Matching</h3>
        <p className="text-sm text-gray-500">
          Get personalized job recommendations based on your skills & experience.
        </p>
      </div>

      {/* Search */}
      <div className="mb-5">
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 shadow-sm">
          <Search className="w-5 h-5 text-gray-400" />
          <input type="text" placeholder="Search jobs, companies, keywords..." className="w-full outline-none" />
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-sm rounded-full border transition ${
              selectedCategory === cat
                ? "bg-[#11C3C0] text-white"
                : "bg-white text-gray-700 border-gray-300 hover:bg-[#11C3C0]/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Job Cards */}
      <div className="space-y-6">
        {filteredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.01 }}
            className="border-1 border-gray-300 hover:border-[#45dedc] rounded-xl shadow-sm hover:shadow-lg p-6 bg-white transition"
          >
            {/* Top Section */}
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#11C3C0]/20 text-[#11C3C0] flex items-center justify-center rounded-full font-bold">
                    {job.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.company}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  We are looking for an experienced {job.title} to join our remote team.
                </p>
              </div>
              <Heart className="text-gray-400 hover:text-red-500 cursor-pointer" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="bg-orange-400 text-white px-2 py-1 text-xs rounded-full">{job.type}</span>
              <span className="bg-[#11C3C0] text-white px-2 py-1 text-xs rounded-full">{job.location}</span>
              <span className="bg-[#ff7750] text-white px-2 py-1 text-xs rounded-full">{job.salary}</span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mt-3">
              {job.skills.map((skill, i) => (
                <span key={i} className="bg-gray-100 px-2 py-1 text-xs rounded-full">{skill}</span>
              ))}
            </div>

            {/* Flexibility & Sentiment */}
            <div className="flex gap-6 text-sm text-gray-600 mt-4 border-t pt-3">
              <p>✨ Flexibility: {job.flexibility}</p>
              <p>💬 Sentiment: {job.sentiment}</p>
            </div>

            {/* Buttons */}
            <div className="mt-4 flex justify-between items-center">
              <button className="w-full bg-[#11C3C0] text-white py-2 rounded-lg hover:bg-[#0fa7a4] transition">
                View Details
              </button>
              <button className="flex items-center gap-1 ml-4 border px-4 py-2 rounded-lg hover:bg-gray-100">
                <ExternalLink size={16} /> Apply
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;
