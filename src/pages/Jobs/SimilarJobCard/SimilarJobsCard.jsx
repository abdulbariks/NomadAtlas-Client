import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { Building2, MapPin, Clock4 } from "lucide-react";

const SimilarJobsCard = ({ category, jobId }) => {
  const [similarJobs, setSimilarJobs] = useState([]);

  useEffect(() => {
    if (category && jobId) {
      axios
        .get(`https://nomad-atlas-server-one.vercel.app/api/jobs/similar/${category}/${jobId}`)
        .then((res) => setSimilarJobs(res.data))
        .catch((err) => console.error(err));
    }
  }, [category, jobId]);

  if (!similarJobs.length) return null;

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200">
      <h3 className="font-semibold text-lg mb-3">Similar Jobs</h3>
      <div className="space-y-3">
        {similarJobs.map((job) => (
          <Link
            to={`/jobs/${job._id}`}
            key={job._id}
            className="block border-b last:border-none pb-2 hover:bg-gray-50 rounded-md p-2 transition"
          >
            <h4 className="font-semibold text-gray-800">{job.title}</h4>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <Building2 size={14} /> {job.company}
            </p>
            <p className="text-xs text-gray-500 flex items-center gap-1">
              <MapPin size={12} /> {job.location} • <Clock4 size={12} /> {job.jobType}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SimilarJobsCard;
