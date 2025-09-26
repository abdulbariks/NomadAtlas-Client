import { Link, useLocation, useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import Animation from "../components/Animation/Animation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../components/feature/authSlice";
import { useState } from "react";
import axios from "axios";
import SocialLogin from "./SocialLogin";
import { toast } from "react-toastify";


const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();


  const onSubmit = (data) => {
    dispatch(
      registerUser({
        email: data.email,
        password: data.password,
        name: data.name,
        photoURL: profilePic,
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Successfully registered!");
        navigate(location?.state || "/");
      })
      .catch((err) => {
        toast.error("Failed to register");
        console.log(err)
      });

  }
  const handleImageUp = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const uploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_key}`;
    try {
      const res = await axios.post(uploadURL, formData);
      const imageUrl = res.data?.data?.url;
      setProfilePic(imageUrl);
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };
  return (
    <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-8 my-5">
      <div className="w-full rounded-md shadow sm:p-8 bg-white mb-1 text-gray-800">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          SignUp Your Account
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Have Account?
          <Link to={"/login"} className="focus:underline hover:underline">
            {" "}
            LogIn Here
          </Link>
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input type="text" {...register('name', { required: true })} placeholder="Enter Your Name" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#37b6f5] outline-none" />
            {errors.name?.type === 'required' && <p className="text-red-600 text-sm mt-1">Please enter your name</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" {...register('email', { required: true })} placeholder="Enter Your Email" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#37b6f5] outline-none" />
            {errors.email?.type === 'required' && <p className="text-red-600 text-sm mt-1">Email is required</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo</label>
            <input type="file" onChange={handleImageUp} className="w-full px-3 py-2 border rounded-md cursor-pointer" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" {...register('password', { required: true })} placeholder="Enter Your password" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#37b6f5] outline-none" />
            {errors.password?.type === "required" && (
              <p className="text-red-600">Enter a password</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600 text-sm mt-1">Password must be 6+ characters</p>
            )}
          </div>
          <button className="w-full px-8 py-3 font-semibold rounded-md bg-[#37b6f5] text-gray-50">Sign Up</button>
        <div className="flex items-center w-full my-4">
          <hr className="w-full text-gray-600" />
          <p className="px-3 text-gray-600">OR</p>
          <hr className="w-full text-gray-600" />
        </div>
        <div className="m-6">
          <SocialLogin />
        </div>
        </form>
      </div>
      <div className="w-full h-full rounded-md bg-white flex items-center justify-center">
        <Animation></Animation>
      </div>
    </div>
  );
};

export default Register;
