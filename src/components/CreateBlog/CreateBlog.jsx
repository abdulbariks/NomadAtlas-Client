import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import useImageUpload from "../../customHook/useImageUpload";

const CreateBlog = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { picture, handleImageUpload} = useImageUpload();
    const [loading, setLoading] = useState(false);

    // dummy user data (replace with auth later)
    const userName = "John Doe";
    const userEmail = "john@example.com";

    const mutation = useMutation({
        mutationFn: async (newBlog) => {
            const res = await axios.post("http://localhost:5000/api/blogs", newBlog);
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
            tags: data.tags.split(",").map(tag => tag.trim()),  // convert to array
            image: picture,
            authorName: userName,
            authorEmail: userEmail,
            createdAt: new Date().toISOString(),
            ...(isDraft ? { type: "Draft" } : {type: "Publish"}),
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
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
                Create Blog Post
            </h1>

            <form className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block font-medium mb-2">Title</label>
                    <input
                        type="text"
                        placeholder="Enter post title"
                        {...register("title", { required: "Title is required" })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                {/* Content */}
                <div>
                    <label className="block font-medium mb-2">Content</label>
                    <textarea
                        rows="6"
                        placeholder="Write your blog post here"
                        {...register("content", { required: "Content is required" })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.content && <p className="text-red-500 text-sm">{errors.content.message}</p>}
                </div>

                {/* Category */}
                <div>
                    <label className="block font-medium mb-2">Category</label>
                    <select
                        {...register("category", { required: "Category is required" })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select category</option>
                        <option value="destinations">Destinations</option>
                        <option value="guides">Guides</option>
                        <option value="stories">Stories</option>
                        <option value="tips">Tips</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                </div>

                {/* Tags */}
                <div>
                    <label className="block font-medium mb-2">Tags</label>
                    <input
                        type="text"
                        placeholder="Enter tags separated by commas"
                        {...register("tags", { required: "Tags are required" })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
                </div>

                {/* Image */}
                <div>
                    <label className="block font-medium mb-2">Image</label>
                    <input
                        type="file"
                        name="blogImage"
                        onChange={handleImageUpload}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {!picture && <p className="text-red-500 text-sm">Image is required</p>}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="w-full sm:w-auto px-6 py-2 border rounded-lg bg-gray-200 hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        disabled={loading || !picture}   //  changed: disable if no picture
                        onClick={handleSubmit((data) => handleSave(data, true))}
                        className={`w-full sm:w-auto px-6 py-2 border rounded-lg bg-gray-200 hover:bg-gray-300 ${(!picture || loading) ? "opacity-50 cursor-not-allowed" : ""
                            }`}   // changed: add disabled styling
                    >
                        {loading ? "Saving..." : "Save Draft"}
                    </button>

                    <button
                        type="button"
                        disabled={loading || !picture}   //  changed: disable if no picture
                        onClick={handleSubmit((data) => handleSave(data, false))}
                        className={`w-full sm:w-auto px-6 py-2 border rounded-lg bg-blue-500 text-white hover:bg-blue-600 ${(!picture || loading) ? "opacity-50 cursor-not-allowed" : ""
                            }`}   // changed: add disabled styling
                    >
                        {loading ? "Publishing..." : "Publish"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;
