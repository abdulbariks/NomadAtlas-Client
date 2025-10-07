import React, { useState } from "react";
import {
  Briefcase,
  Globe,
  Zap,
  Users,
  Wrench,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const resourceTypes = [
  { value: "job", label: "Job Platform", icon: Briefcase, color: "green" },
  { value: "visa", label: "Visa Resource", icon: Globe, color: "indigo" },
  {
    value: "productivity",
    label: "Productivity Tool",
    icon: Zap,
    color: "purple",
  },
  { value: "community", label: "Community", icon: Users, color: "blue" },
  {
    value: "internalTool",
    label: "Internal Tool",
    icon: Wrench,
    color: "orange",
  },
];

const AddResource = () => {
  const [type, setType] = useState("");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleTypeChange = (selectedType) => {
    setType(selectedType);
    setFormData({ type: selectedType });
    setSuccess(false);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("http://localhost:5000/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ type });
        setTimeout(() => setSuccess(false), 3000);
      } else {
        const err = await res.json();
        setError(err.message || "Failed to add resource");
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const selectedResource = resourceTypes.find((rt) => rt.value === type);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Wrench className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Add New Resource
          </h1>
          <p className="text-gray-600 text-lg">
            Expand our platform with helpful resources for digital nomads
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
            <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-800">Success!</p>
              <p className="text-green-700 text-sm">
                Resource added successfully
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
            <div>
              <p className="font-semibold text-red-800">Error</p>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
          {/* Type Selection */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Select Resource Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {resourceTypes.map((rt) => {
                const Icon = rt.icon;
                const isSelected = type === rt.value;
                return (
                  <button
                    key={rt.value}
                    onClick={() => handleTypeChange(rt.value)}
                    className={`p-4 rounded-xl transition-all duration-200 flex flex-col items-center gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-white text-blue-600 shadow-lg scale-105"
                        : "bg-white/10 hover:bg-white/20 backdrop-blur"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-sm font-medium text-center">
                      {rt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          {type && (
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* Resource Type Header */}
              {selectedResource && (
                <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
                  <div
                    className={`w-12 h-12 rounded-xl bg-${selectedResource.color}-100 flex items-center justify-center`}
                  >
                    {React.createElement(selectedResource.icon, {
                      className: `w-6 h-6 text-${selectedResource.color}-600`,
                    })}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {selectedResource.label}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Fill in the details below
                    </p>
                  </div>
                </div>
              )}

              {/* Common Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="Name"
                  name="name"
                  placeholder="e.g., Remote OK"
                  formData={formData}
                  onChange={handleChange}
                  required
                />
                <Input
                  label="Link"
                  name="link"
                  placeholder="https://example.com"
                  formData={formData}
                  onChange={handleChange}
                  required
                />
              </div>

              <TextArea
                label="Description"
                name="desc"
                placeholder="Brief description of this resource..."
                formData={formData}
                onChange={handleChange}
                required
              />

              {/* Conditional Fields Based on Type */}
              {type === "job" && (
                <div className="bg-green-50 rounded-2xl p-6 space-y-4 border border-green-200">
                  <h4 className="font-semibold text-green-800 flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Job Platform Details
                  </h4>
                  <Input
                    label="Logo URL"
                    name="logo"
                    placeholder="https://example.com/logo.png"
                    formData={formData}
                    onChange={handleChange}
                  />
                </div>
              )}

              {type === "visa" && (
                <div className="bg-indigo-50 rounded-2xl p-6 space-y-4 border border-indigo-200">
                  <h4 className="font-semibold text-indigo-800 flex items-center gap-2">
                    <Globe className="w-5 h-5" />
                    Visa Information
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Country"
                      name="country"
                      placeholder="e.g., Portugal"
                      formData={formData}
                      onChange={handleChange}
                    />
                    <Input
                      label="Visa Type"
                      name="visaType"
                      placeholder="e.g., Digital Nomad Visa"
                      formData={formData}
                      onChange={handleChange}
                    />
                    <Input
                      label="Duration"
                      name="duration"
                      placeholder="e.g., 1 Year"
                      formData={formData}
                      onChange={handleChange}
                    />
                    <Input
                      label="Minimum Income"
                      name="income"
                      placeholder="e.g., €2,800/month"
                      formData={formData}
                      onChange={handleChange}
                    />
                    <Input
                      label="Flag Emoji"
                      name="flag"
                      placeholder="🇵🇹"
                      formData={formData}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {type === "productivity" && (
                <div className="bg-purple-50 rounded-2xl p-6 space-y-4 border border-purple-200">
                  <h4 className="font-semibold text-purple-800 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Tool Details
                  </h4>
                  <Input
                    label="Logo URL"
                    name="logo"
                    placeholder="https://example.com/logo.png"
                    formData={formData}
                    onChange={handleChange}
                  />
                </div>
              )}

              {type === "community" && (
                <div className="bg-blue-50 rounded-2xl p-6 space-y-4 border border-blue-200">
                  <h4 className="font-semibold text-blue-800 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Community Details
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Icon URL"
                      name="icon"
                      placeholder="https://example.com/icon.png"
                      formData={formData}
                      onChange={handleChange}
                    />
                    <Input
                      label="Color Theme"
                      name="color"
                      placeholder="e.g., blue, orange"
                      formData={formData}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {type === "internalTool" && (
                <div className="bg-orange-50 rounded-2xl p-6 space-y-4 border border-orange-200">
                  <h4 className="font-semibold text-orange-800 flex items-center gap-2">
                    <Wrench className="w-5 h-5" />
                    Internal Tool Settings
                  </h4>
                  <Input
                    label="Color Theme"
                    name="color"
                    placeholder="e.g., blue, green, purple"
                    formData={formData}
                    onChange={handleChange}
                  />
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Adding Resource...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Add Resource
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {/* Empty State */}
          {!type && (
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-lg">
                Select a resource type above to get started
              </p>
            </div>
          )}
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>All fields marked with * are required</p>
        </div>
      </div>
    </div>
  );
};

// Enhanced Input Component
const Input = ({ label, name, placeholder, formData, onChange, required }) => (
  <div>
    <label className="block text-gray-700 font-semibold mb-2 text-sm">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      name={name}
      value={formData[name] || ""}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200"
    />
  </div>
);

// Enhanced Textarea Component
const TextArea = ({
  label,
  name,
  placeholder,
  formData,
  onChange,
  required,
}) => (
  <div>
    <label className="block text-gray-700 font-semibold mb-2 text-sm">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={name}
      value={formData[name] || ""}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows="4"
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all duration-200 resize-none"
    ></textarea>
  </div>
);

export default AddResource;
