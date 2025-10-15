import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Upload, Loader2 } from "lucide-react";
import useImageUpload from "../../customHook/useImageUpload";

const categories = [
  "Destinations",
  "Travel Guides",
  "Tips & Tricks",
  "Community",
];


const CreateBlog = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { picture, handleImageUpload } = useImageUpload();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const mutation = useMutation({
    mutationFn: async (newBlog) => {
      const res = await axios.post("http://localhost:5000/api/blogs", newBlog);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your blog has been saved successfully ",
        timer: 2000,
        showConfirmButton: false,
      });
      reset();
      setLoading(false);
    },
    onError: (error) => {
      console.error("Create blog error:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while saving your blog!",
        timer: 2000,
        showConfirmButton: false,
      });
      setLoading(false);
    },
  });

  const handleSave = (data, isDraft = false) => {
    if (!picture) {
      Swal.fire({
        icon: "error",
        title: "Image required",
        text: "Please upload a blog image",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    const newBlog = {
      ...data,
      tags: data.tags ? data.tags.split(",").map((tag) => tag.trim()) : [],
      image: picture,
      authorName: user?.displayName || "Anonymous",
      authorEmail: user?.email || "anonymous@example.com",
      authorImage: user?.photoURL || "https://i.ibb.co/default-profile.png",
      type: isDraft ? "Draft" : "blog",
      createdAt: new Date().toISOString(),
    };

    setLoading(true);
    mutation.mutate(newBlog);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 my-10 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        ✍️ Create a New Blog
      </h1>

      <form className="space-y-6" onSubmit={handleSubmit((data) => handleSave(data, false))}>
        {/* Title */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Enter your blog title..."
            {...register("title", { required: "Title is required" })}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        {/* Content */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Content</label>
          <textarea
            rows="6"
            placeholder="Share your travel story, tips, or experience..."
            {...register("content", { required: "Content is required" })}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Tags */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Tags</label>
          <input
            type="text"
            placeholder="e.g. adventure, backpacking, tips"
            {...register("tags")}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">Upload Image</label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-gray-50 transition">
            <input type="file" onChange={handleImageUpload} className="hidden" id="upload-image" />
            <label
              htmlFor="upload-image"
              className="flex flex-col items-center cursor-pointer text-blue-600"
            >
              <Upload size={24} />
              <span className="mt-2">Click to upload</span>
            </label>

            {picture && (
              <motion.img
                src={picture}
                alt="preview"
                className="mt-4 mx-auto h-48 w-full object-cover rounded-lg shadow"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              />
            )}
          </div>
          {!picture && <p className="text-red-500 text-sm mt-1">Image is required</p>}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-6">
          <button
            type="button"
            onClick={handleSubmit((data) => handleSave(data, true))}
            disabled={loading}
            className="px-6 py-3 rounded-lg border bg-gray-100 hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin inline-block mr-2" /> : null}
            Save as Draft
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin inline-block mr-2" /> : null}
            Publish Blog
          </button>
        </div>
      </form>
    </div>
  );
};


export default CreateBlog;