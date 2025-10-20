import React, { useState } from "react";

const AddJobForm = () => {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    description: "",
    category: "",
    jobType: "",
    minSalary: "",
    maxSalary: "",
    currency: "USD",
    location: "",
    applicationUrl: "",
    skills: [],
    requirements: [""],
    benefits: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData({ ...jobData, [name]: value });
  };

  const handleArrayChange = (index, field, value) => {
    const updated = [...jobData[field]];
    updated[index] = value;
    setJobData({ ...jobData, [field]: updated });
  };

  const addField = (field) => {
    setJobData({ ...jobData, [field]: [...jobData[field], ""] });
  };

  const removeField = (field, index) => {
    const updated = [...jobData[field]];
    updated.splice(index, 1);
    setJobData({ ...jobData, [field]: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });
      if (res.ok) {
        alert("✅ Job Created Successfully!");
        setJobData({
          title: "",
          company: "",
          description: "",
          category: "",
          jobType: "",
          minSalary: "",
          maxSalary: "",
          currency: "USD",
          location: "",
          applicationUrl: "",
          skills: [],
          requirements: [""],
          benefits: [""],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
        Create New Job Posting
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Job Title */}
        <div>
          <label className="font-medium text-sm">Job Title *</label>
          <input
            type="text"
            name="title"
            placeholder="e.g. Senior Frontend Developer"
            className="input input-bordered w-full mt-1"
            value={jobData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Company Name */}
        <div>
          <label className="font-medium text-sm">Company Name *</label>
          <input
            type="text"
            name="company"
            placeholder="e.g. TechVision Inc"
            className="input input-bordered w-full mt-1"
            value={jobData.company}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="font-medium text-sm">Job Description *</label>
          <textarea
            name="description"
            placeholder="Describe the role, responsibilities, and what makes it great..."
            className="textarea textarea-bordered w-full mt-1"
            value={jobData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category & Job Type */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-sm">Category *</label>
            <select
              name="category"
              className="select select-bordered w-full mt-1"
              value={jobData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option>Engineering</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Writing</option>
              <option>Developer</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label className="font-medium text-sm">Job Type *</label>
            <select
              name="jobType"
              className="select select-bordered w-full mt-1"
              value={jobData.jobType}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option>Full Time</option>
              <option>Part Time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>
        </div>

        {/* Salary */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-sm">Min Salary *</label>
            <input
              type="number"
              name="minSalary"
              placeholder="80000"
              className="input input-bordered w-full mt-1"
              value={jobData.minSalary}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="font-medium text-sm">Max Salary *</label>
            <input
              type="number"
              name="maxSalary"
              placeholder="120000"
              className="input input-bordered w-full mt-1"
              value={jobData.maxSalary}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Currency */}
        <div>
          <label className="font-medium text-sm">Currency</label>
          <input
            type="text"
            name="currency"
            placeholder="USD"
            className="input input-bordered w-full mt-1"
            value={jobData.currency}
            onChange={handleChange}
          />
        </div>

        {/* Location */}
        <div>
          <label className="font-medium text-sm">Location *</label>
          <input
            type="text"
            name="location"
            placeholder="e.g. Remote - Worldwide"
            className="input input-bordered w-full mt-1"
            value={jobData.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Application URL */}
        <div>
          <label className="font-medium text-sm">Application URL *</label>
          <input
            type="url"
            name="applicationUrl"
            placeholder="https://example.com/apply"
            className="input input-bordered w-full mt-1"
            value={jobData.applicationUrl}
            onChange={handleChange}
            required
          />
        </div>

        {/* Requirements */}
        <div>
          <label className="font-medium text-sm">Requirements</label>
          {jobData.requirements.map((req, i) => (
            <div key={i} className="flex gap-2 mt-2">
              <input
                type="text"
                value={req}
                onChange={(e) =>
                  handleArrayChange(i, "requirements", e.target.value)
                }
                placeholder="e.g. 5+ years of experience"
                className="input input-bordered w-full"
              />
              <button
                type="button"
                onClick={() => removeField("requirements", i)}
                className="btn btn-error"
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField("requirements")}
            className="btn btn-outline mt-2"
          >
            + Add Requirement
          </button>
        </div>

        {/* Benefits */}
        <div>
          <label className="font-medium text-sm">Benefits</label>
          {jobData.benefits.map((b, i) => (
            <div key={i} className="flex gap-2 mt-2">
              <input
                type="text"
                value={b}
                onChange={(e) =>
                  handleArrayChange(i, "benefits", e.target.value)
                }
                placeholder="e.g. Flexible working hours"
                className="input input-bordered w-full"
              />
              <button
                type="button"
                onClick={() => removeField("benefits", i)}
                className="btn btn-error"
              >
                -
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addField("benefits")}
            className="btn btn-outline mt-2"
          >
            + Add Benefit
          </button>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full">
          Create Job
        </button>
      </form>
    </div>
  );
};

export default AddJobForm;
