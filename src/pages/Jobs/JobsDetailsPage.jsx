"use client";
import React, { useEffect, useState } from "react";

import { useParams } from "react-router";
import axios from "axios";
import { Heart } from "lucide-react";

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
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
      {/* LEFT MAIN CONTENT */}
      <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">{job.title}</h1>
            <p className="text-gray-500">{job.company}</p>
          </div>
          <Heart className="text-gray-400 hover:text-red-500 cursor-pointer" />
        </div>

        {/* Tags */}
        <div className="flex gap-3 flex-wrap mb-5">
          <span className="px-3 py-1 bg-[#f97316] text-white rounded-lg text-sm">
            Full Time
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
            {job.location}
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
            ${job.salaryRange}
          </span>
          <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
            Posted {job.postedDate}
          </span>
        </div>

        {/* About */}
        <section className="mb-5">
          <h2 className="font-semibold mb-2 text-lg">About the Role</h2>
          <p className="text-gray-600 leading-relaxed">{job.description}</p>
        </section>

        {/* Requirements */}
        <section className="mb-5">
          <h2 className="font-semibold mb-2 text-lg">Requirements</h2>
          <ul className="list-disc ml-6 text-gray-600 space-y-1">
            {job.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </section>

        {/* Benefits */}
        <section className="mb-5">
          <h2 className="font-semibold mb-2 text-lg">Benefits</h2>
          <ul className="list-disc ml-6 text-gray-600 space-y-1">
            {job.benefits.map((ben, i) => (
              <li key={i}>{ben}</li>
            ))}
          </ul>
        </section>

        {/* Skills */}
        <section className="mb-5">
          <h2 className="font-semibold mb-2 text-lg">Skills & Technologies</h2>
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
        {/* Static AI Match */}
        <div className="bg-white shadow rounded-xl p-5">
          <h3 className="font-semibold mb-2">AI Match Analysis</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              Skill Match:{" "}
              <span className="font-semibold text-[#11c3c0]">85%</span>
            </p>
            <p>
              Flexibility Level:{" "}
              <span className="font-semibold text-[#11c3c0]">95%</span>
            </p>
            <p>
              Company Sentiment:{" "}
              <span className="font-semibold text-[#11c3c0]">88%</span>
            </p>
            <div className="border-t pt-2 mt-2">
              <p className="text-center font-bold text-lg text-green-600">
                89% Match
              </p>
            </div>
          </div>
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
          <p className="text-gray-600 text-sm mb-3">{job.companyInfo}</p>
          <button className="border border-[#11c3c0] text-[#11c3c0] px-4 py-1 rounded-lg hover:bg-[#11c3c0] hover:text-white transition">
            View Company Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsDetailsPage;
