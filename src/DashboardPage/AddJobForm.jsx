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
    PostedTime: new Date().toISOString().slice(0, 10), // reset to today
    lastDate: "",
  });
  
  const [skillInput, setSkillInput] = useState("");



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
  

   // ✅ Add Skill
  const handleAddSkill = () => {
    if (skillInput.trim() !== "") {
      setJobData({ ...jobData, skills: [...jobData.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  // ✅ Remove Skill
  const handleRemoveSkill = (index) => {
    const updated = [...jobData.skills];
    updated.splice(index, 1);
    setJobData({ ...jobData, skills: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://nomad-atlas-server-delta.vercel.app/api/jobs", {
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
    <div className="max-w-3xl mx-auto mt-8 bg-gradient-to-br from-cyan-50 via-white to-cyan-50/30  p-6 rounded-xl border-2 border-gray-100">
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


        {/* Apply / Posted Date */}

   <div className="grid grid-cols-2 gap-4">
   <div>
  <label className="font-medium text-sm">Posted Date</label>
  <input
    type="date"
    name="postedTime"
    className="input input-bordered w-full mt-1"
    value={jobData.PostedTime}
    onChange={handleChange}
  />
</div>

{/* Last Date to Apply */}
<div >
  <label className="font-medium text-sm">Application Deadline *</label>
  <input
    type="date"
    name="lastDate"
    className="input input-bordered w-full mt-1"
    value={jobData.lastDate}
    onChange={handleChange}
    required
  />
</div>
</div>


         {/* ✅ Skills Tag Input */}
        <div>
          <label className="font-medium text-sm">Skills (Press Enter to Add)</label>
          <div className="flex gap-2 mt-1">
            <input
              type="text"
              placeholder="e.g. React, TypeScript"
              className="input input-bordered w-full"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSkill())}
            />
            <button type="button" onClick={handleAddSkill} className="btn btn-outline">
              Add
            </button>
          </div>

          {/* ✅ Show Skill Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {jobData.skills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-blue-100 dark:bg-blue-600 text-blue-700 dark:text-white px-3 py-1 rounded-full text-sm"
              >
                {skill}
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => handleRemoveSkill(index)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
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
        <button type="submit" className="btn bg-[#11c3c0] hover:bg-[#0ca5a3] text-white w-full">
          Create Job
        </button>
      </form>
    </div>
  );
};

export default AddJobForm;
