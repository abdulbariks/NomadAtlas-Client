import React from "react";
import { Bookmark, MapPin } from "lucide-react";

const SimilarJobsCard = () => {
  const similarJobs = [
    {
      id: 1,
      title: "Backend Developer (Node.js)",
      company: "CloudScale Systems",
      location: "Remote - Americas",
    },
    {
      id: 2,
      title: "DevOps Engineer",
      company: "InfraCloud Solutions",
      location: "Remote - Worldwide",
    },
  ];

  return (
    <div className="bg-base-100 border border-gray-300 rounded-2xl p-5 ">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Bookmark className="text-blue-500" size={20} />
        <h2 className="font-semibold text-lg text-gray-800">Similar Jobs</h2>
      </div>

      {/* Job List */}
      <div className="space-y-3">
        {similarJobs.map((job) => (
          <div
            key={job.id}
            className="border border-gray-300  rounded-lg p-3 hover:bg-gray-50 transition cursor-pointer"
          >
            <h3 className="text-gray-800 font-medium">{job.title}</h3>
            <p className="text-sm text-gray-500">{job.company}</p>
            <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
              <MapPin size={14} />
              <span>{job.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarJobsCard;
