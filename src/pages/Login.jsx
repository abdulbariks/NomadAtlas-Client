import { Link, Navigate, useNavigate } from "react-router";
import Animation from "../components/Animation/Animation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { logInUser, sendResetEmail } from "../redux/authSlice";
import { useLocation } from "react-router";
import SocialLogin from "./SocialLogin";
import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const email = getValues("email")

  const handleResetPassword = () => {
    if (!email) {
      alert("Please enter your email first!");
      return;
    }
    dispatch(sendResetEmail(email))
      .unwrap()
      .then(() => {
        alert("Check your email inbox for reset instructions!");
      })
      .catch((err) => {
        toast.error("Failed to reset");
        console.log(err)
      });
  }

  const onSubmit = (data) => {
    dispatch(logInUser({ email: data.email, password: data.password }))
      .unwrap()
      .then(async () => {
        toast.success("Login successful!");
        navigate(location?.state || "/");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };
  return (
    <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-8 mb-5 mt-20">
      <div className="w-full h-full rounded-md bg-white flex items-center justify-center">
        <Animation></Animation>
      </div>
      <div className="w-full p-4 rounded-md shadow sm:p-8 bg-white mb-1 text-gray-800">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Login to Your Account
        </h2>
        <p className="text-sm text-center text-gray-600">
          Don't have Account?
          <Link to={"/register"} className="focus:underline hover:underline">
            {" "}
            Register Here
          </Link>
        </p>
        <div className="my-6 space-y-4">
          <SocialLogin />
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full text-gray-600" />
          <p className="px-3 text-gray-600">OR</p>
          <hr className="w-full text-gray-600" />
        </div>
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
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" {...register('password', { required: true })} placeholder="Enter Your password" className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#37b6f5] outline-none" />
            {errors.password?.type === "required" && (
              <p className="text-red-600">Enter your password</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">Password must be 6+ characters</p>
            )}
            <p className="text-sm text-right mt-2">
              <button
                type="button"
                onClick={handleResetPassword}
                className="text-blue-600 hover:underline"
              >
                Forgot password? Reset
              </button>
            </p>
          </div>
          <button className="w-full px-8 py-3 font-semibold rounded-md bg-[#37b6f5] text-gray-50">Sign in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
