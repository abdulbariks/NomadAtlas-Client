import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import useImageUpload from "../../customHook/useImageUpload";
import { useSelector } from "react-redux";


const CreateBlog = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { picture, handleImageUpload } = useImageUpload();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.auth);


  const mutation = useMutation({
    mutationFn: async (newBlog) => {
      const res = await axios.post("https://demo-nomad-server.vercel.app/api/blogs", newBlog);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Blog saved successfully!",
        timer: 2000,
        showConfirmButton: false,
      });
      reset();
      setLoading(false);
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to create blog post",
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
      tags: data.tags.split(",").map(tag => tag.trim()),
      image: picture,
      authorName: user.displayName,
      authorEmail: user.email,
      createdAt: new Date().toISOString(),
      ...(isDraft ? { type: "Draft" } : { type: "Publish" }),
    };


    setLoading(true);
    mutation.mutate(newBlog);
    console.log(newBlog)
  };


  const handleCancel = () => {
    reset();
    Swal.fire({
      icon: "info",
      title: "Cancelled",
      text: "Form reset successfully",
      timer: 2000,
      showConfirmButton: false,
    });
  };


  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 mt-16">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Create Blog Post
            </h1>
            <p className="mt-1 text-sm text-gray-500 max-w-xl">
              Share your experience — write about cities, tips, guides, or stories for the nomad community.
            </p>
          </div>


          <div className="flex items-center gap-3">
            <div className="text-xs text-gray-500">Signed in as</div>
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-1 rounded-full">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center text-sm font-medium text-gray-700">
                {user?.displayName ? user.displayName.split(" ").map(n => n[0]).slice(0,2).join("") : "U"}
              </div>
              <div className="text-sm text-gray-700">{user?.displayName || user?.email || "User"}</div>
            </div>
          </div>
        </div>


        <form className="mt-6 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         
            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                placeholder="Enter post title"
                {...register("title", { required: "Title is required" })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition shadow-sm"
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>


            <div className="col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                {...register("category", { required: "Category is required" })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition shadow-sm bg-white"
              >
                <option value="">Select category</option>
                <option value="Destinations">Destinations</option>
                <option value="Guides">Guides</option>
                <option value="Stories">Stories</option>
                <option value="Tips & Tricks">Tips</option>
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
            </div>


           
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <input
                type="text"
                placeholder="Enter tags separated by commas (e.g., wifi, budget, food)"
                {...register("tags", { required: "Tags are required" })}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition shadow-sm"
              />
              {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>}
            </div>
          </div>


          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
            <textarea
              rows="8"
              placeholder="Write your blog post here"
              {...register("content", { required: "Content is required" })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 transition shadow-sm resize-none"
            />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
         
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50">
                  <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span className="text-sm text-gray-700">Choose image</span>
                  <input type="file" name="blogImage" onChange={handleImageUpload} className="hidden" />
                </label>


                <div className="text-sm text-gray-500">PNG, JPG up to 5MB</div>
              </div>


              {!picture && <p className="text-red-500 text-sm mt-2">Image is required</p>}


         
              {picture && (
                <div className="mt-4">
                  <div className="text-sm text-gray-600 mb-2">Preview</div>
                  <div className="w-full max-w-md rounded-lg overflow-hidden border border-gray-100 shadow-sm">
                    <img src={picture} alt="Preview" className="w-full h-48 object-cover" />
                  </div>
                </div>
              )}
            </div>


            <div className="md:col-span-1 bg-gray-50 border border-gray-100 rounded-lg p-4 h-full">
              <div className="text-sm text-gray-500 mb-3">Post preview</div>
              <div className="space-y-3">
                <div className="w-full h-28 bg-white rounded-md border border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                  {picture ? (
                    <img src={picture} alt="thumb" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-sm">No image yet</div>
                  )}
                </div>


                <div>
                  <div className="text-xs text-gray-500">Author</div>
                  <div className="text-sm text-gray-800 font-medium">{user?.displayName || user?.email || "Anonymous"}</div>
                </div>


                <div>
                  <div className="text-xs text-gray-500">Status</div>
                  <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-medium">Draft / Publish</div>
                </div>


                <div>
                  <div className="text-xs text-gray-500">Created at</div>
                  <div className="text-sm text-gray-700">{new Date().toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>


       
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={handleCancel}
              className="w-full sm:w-auto px-6 py-3 border rounded-lg bg-white hover:bg-gray-50 transition text-gray-700 shadow-sm"
            >
              Cancel
            </button>


            <button
              type="button"
              disabled={loading || !picture}
              onClick={handleSubmit((data) => handleSave(data, true))}
              className={`w-full sm:w-auto px-6 py-3 border rounded-lg bg-white hover:bg-gray-50 transition text-gray-700 shadow-sm ${(!picture || loading) ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {loading ? "Saving..." : "Save Draft"}
            </button>


            <button
              type="button"
              disabled={loading || !picture}
              onClick={handleSubmit((data) => handleSave(data, false))}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white shadow-md transition ${(!picture || loading) ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default CreateBlog;