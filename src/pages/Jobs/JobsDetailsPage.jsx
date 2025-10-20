import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, [id]);

  if (!job) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Side Details */}
      <div className="col-span-2 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <p className="text-gray-600">{job.company}</p>
          {/* Tags */}
          <div className="flex gap-3 mt-3">
            <span className="badge badge-primary">{job.jobType}</span>
            <span className="badge badge-secondary">{job.location}</span>
            <span className="badge badge-accent">
              ${job.minSalary} - {job.maxSalary} {job.currency}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="p-5 border rounded-lg">
          <h2 className="font-semibold text-lg mb-2">About the Role</h2>
          <p className="text-gray-700">{job.description}</p>
        </div>

        {/* Requirements */}
        <div className="p-5 border rounded-lg">
          <h2 className="font-semibold text-lg mb-2">✅ Requirements</h2>
          <ul className="list-disc ml-6">
            {job.requirements.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>

        {/* Benefits */}
        <div className="p-5 border rounded-lg">
          <h2 className="font-semibold text-lg mb-2">🎁 Benefits</h2>
          <ul className="list-disc ml-6">
            {job.benefits.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>

        {/* Skills & Tags */}
        <div className="p-5 border rounded-lg">
          <h2 className="font-semibold text-lg mb-2">🛠 Skills & Technologies</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, i) => (
              <span key={i} className="badge badge-outline">
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Apply Section */}
        <div className="p-5 border rounded-lg">
          <textarea className="textarea textarea-bordered w-full" placeholder="Write a cover letter..."></textarea>
          <button className="btn btn-primary mt-3 w-full">Submit Application</button>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="space-y-6">
        {/* Statistics */}
        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold mb-2">📊 Job Statistics</h3>
          <p>Views: {job.views}</p>
          <p>Applications: {job.applications}</p>
          <p>Posted: {job.createdAt?.slice(0, 10)}</p>
        </div>

        {/* Company Info */}
        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold mb-2">🏢 About {job.company}</h3>
          <p>More info about the company can be added here...</p>
          <button className="btn btn-outline w-full mt-2">View Company Profile</button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
