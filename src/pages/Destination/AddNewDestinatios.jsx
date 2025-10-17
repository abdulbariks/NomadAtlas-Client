import { useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
import { toast } from "react-hot-toast";
import { ImagePlus } from "lucide-react";
import useImageUpload from "../../customHook/useImageUpload";
import { useSelector } from "react-redux";
import useAxiosSecure from "../../customHook/useAxiosSecure";

const AddNewDestination = () => {
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(state => state.auth);
    const axiosSecure = useAxiosSecure()

    // user info
    const [userInfo] = useState({
        name: user?.displayName,
        email: user?.email,
    });

    // Custom image upload hook
    const { picture, handleImageUpload } = useImageUpload();
    

    // Mutation for adding destination
    const { mutateAsync } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosSecure.post(`/destinations`, data);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Destination created successfully!");
            reset();
            setLoading(false);
        },
        onError: () => {
            toast.error("Something went wrong!");
            setLoading(false);
        },
    });

    // Handle form submit
    const onSubmit = async (data) => {
        setLoading(true);

        const amenities = {
            wifi: data.wifi || false,
            kitchen: data.kitchen || false,
            ac: data.ac || false,
            workspace: data.workspace || false,
        };

        const destinationData = {
            ...data,
            amenities,
            images: [picture || ""],
            image: picture || "",
            userName: userInfo.name,
            userEmail: userInfo.email,
            createdDate: new Date().toISOString(),
        };
        console.log("destination data", destinationData)

        await mutateAsync(destinationData);
    };

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 bg-base-200 rounded-2xl shadow-lg my-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
                🏙️ Create New Destination
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 text-gray-800">
                {/* --- Basic Info --- */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-base-100 p-4 sm:p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg sm:text-xl font-semibold col-span-full border-b pb-2">
                        Basic Information
                    </h3>

                    <input
                        {...register("name", { required: true })}
                        type="text"
                        placeholder="Destination Name (e.g., Bali)"
                        className="input input-bordered w-full"
                    />

                    <input
                        {...register("country", { required: true })}
                        type="text"
                        placeholder="Country"
                        className="input input-bordered w-full"
                    />

                    <input
                        {...register("title", { required: true })}
                        type="text"
                        placeholder="Title (e.g., Cozy 1BD Apartment in Canggu)"
                        className="input input-bordered w-full"
                    />

                    <select
                        {...register("continent", { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Continent</option>
                        <option>Asia</option>
                        <option>Europe</option>
                        <option>North America</option>
                        <option>South America</option>
                        <option>Africa</option>
                        <option>Australia</option>
                    </select>

                    <textarea
                        {...register("description", { required: true })}
                        placeholder="Short Description"
                        className="textarea textarea-bordered col-span-full w-full"
                    ></textarea>
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 bg-base-100 p-4 sm:p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg sm:text-xl font-semibold col-span-full border-b pb-2">
                        Accommodation Info
                    </h3>

                    <select
                        {...register("type", { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Type</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Home">Home</option>
                    </select>

                    <input
                        {...register("pricePerMonth", { required: true })}
                        type="number"
                        placeholder="Price Per Month (USD)"
                        className="input input-bordered w-full"
                    />

                    <select
                        {...register("priceRange", { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Price Range</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>

                    <input
                        {...register("bookingLink")}
                        type="url"
                        placeholder="Booking Link (optional)"
                        className="input input-bordered col-span-full w-full"
                    />
                </section>

                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 bg-base-100 p-4 sm:p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg sm:text-xl font-semibold col-span-full border-b pb-2">
                        Cost & Connectivity
                    </h3>

                    <input
                        {...register("avgLivingCost", { required: true })}
                        type="number"
                        placeholder="Avg Living Cost (USD)"
                        className="input input-bordered w-full"
                    />

                    <input
                        {...register("currency", { required: true })}
                        type="text"
                        placeholder="Currency (e.g., USD)"
                        className="input input-bordered w-full"
                    />

                    <input
                        {...register("wifiSpeed", { required: true })}
                        type="number"
                        placeholder="Wi-Fi Speed (Mbps)"
                        className="input input-bordered w-full"
                    />

                    <input
                        {...register("coworkingSpaces")}
                        type="number"
                        placeholder="No. of Coworking Spaces"
                        className="input input-bordered w-full"
                    />

                    <input
                        {...register("safetyIndex")}
                        type="number"
                        placeholder="Safety Index (1–100)"
                        className="input input-bordered w-full"
                    />

                    <input
                        {...register("totalSeat")}
                        type="number"
                        placeholder="Total Seat Number (1–100)"
                        className="input input-bordered w-full"
                    />
                </section>

                <section className="bg-base-100 p-4 sm:p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg sm:text-xl font-semibold border-b pb-2 mb-4">
                        Amenities
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                        {["wifi", "kitchen", "ac", "workspace"].map((item) => (
                            <label key={item} className="flex items-center gap-2">
                                <input type="checkbox" {...register(item)} className="checkbox" />
                                <span className="capitalize">{item === "ac" ? "Air Conditioning" : item}</span>
                            </label>
                        ))}
                    </div>
                </section>

              
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 bg-base-100 p-4 sm:p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg sm:text-xl font-semibold col-span-full border-b pb-2">
                        Climate, Safety & Visa Info
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-full">
                        <select
                            {...register("climate.type", { required: true })}
                            className="select select-bordered w-full"
                        >
                            <option value="">Select Climate Type</option>
                            <option value="Mediterranean">Mediterranean</option>
                            <option value="Tropical">Tropical</option>
                            <option value="Spring-like">Spring-like</option>
                            <option value="Temperate">Temperate</option>
                            <option value="Arid">Arid</option>
                        </select>

                        <input
                            {...register("climate.temperature")}
                            type="number"
                            placeholder="Avg Temperature (°C)"
                            className="input input-bordered w-full"
                        />

                        <input
                            {...register("climate.humidity")}
                            type="number"
                            placeholder="Humidity (%)"
                            className="input input-bordered w-full"
                        />

                        <input
                            {...register("climate.seasonBest")}
                            type="text"
                            placeholder="Best Season (e.g., Nov–Feb)"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-full">
                        <input
                            {...register("location.latitude", { required: true })}
                            type="number"
                            step="any"
                            placeholder="Latitude (e.g., -8.4095'E)"
                            className="input input-bordered w-full"
                        />
                        <input
                            {...register("location.longitude", { required: true })}
                            type="number"
                            step="any"
                            placeholder="Longitude (e.g., 115.1889'N)"
                            className="input input-bordered w-full"
                        />
                    </div>

                
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-full">
                        <input
                            {...register("visaInfo.visaType")}
                            type="text"
                            placeholder="Visa Type (e.g., Digital Nomad Visa)"
                            className="input input-bordered w-full"
                        />

                        <input
                            {...register("visaInfo.visaDuration")}
                            type="text"
                            placeholder="Visa Duration (e.g., 6 Months)"
                            className="input input-bordered w-full"
                        />
                    </div>

                    <select
                        {...register("safety", { required: true })}
                        className="select select-bordered w-full"
                    >
                        <option value="">Select Safety Level</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </section>

                <section className="bg-base-100 p-4 sm:p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg sm:text-xl font-semibold border-b pb-2 mb-4">
                        Destination Image
                    </h3>

                    <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
                        <div className="w-full">
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                className="file-input file-input-bordered w-full"
                                accept="image/*"
                            />
                        </div>

                        {picture ? (
                            <img
                                src={picture}
                                alt="Preview"
                                className="w-40 sm:w-48 h-28 sm:h-32 object-cover rounded-lg border"
                            />
                        ) : (
                            <div className="w-40 sm:w-48 h-28 sm:h-32 flex items-center justify-center border rounded-lg text-gray-400">
                                <ImagePlus size={28} />
                            </div>
                        )}
                    </div>
                </section>

                <div className="text-center">
                    <button
                        type="submit"
                        className={`btn btn-primary px-8 sm:px-10 w-full sm:w-auto transition-opacity duration-300 ${!picture ? "opacity-50 cursor-not-allowed" : "opacity-100"
                            }`}
                        disabled={loading || !picture}
                    >
                        {loading ? "Saving..." : "Create Destination"}
                    </button>

                    {!picture && (
                        <p className="text-red-500 text-sm mt-2">
                            Please upload a destination image to enable the button.
                        </p>
                    )}
                </div>

            </form>
        </div>
    );
};

export default AddNewDestination;