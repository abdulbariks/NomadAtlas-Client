import { Link, useNavigate, useLocation } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { logInUser, sendResetEmail } from "../redux/authSlice";
import SocialLogin from "./SocialLogin";
import { toast } from "react-toastify";
import bgImage from "../assets/Logo/authentication.jpg"; // 🖼️ your image file

const Login = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const email = getValues("email");

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
        console.log(err);
      });
  };

  const onSubmit = (data) => {
    dispatch(logInUser({ email: data.email, password: data.password }))
      .unwrap()
      .then(() => {
        toast.success("Login successful!");
        navigate(location?.state || "/");
      })
      .catch(() => {
        toast.error("Something went wrong");
      });
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "80%",
        backgroundPosition: "center center"
      }}
    >
      {/* Blur + Overlay */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-md z-0"></div>

      {/* Centered Form */}
      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl p-6 mx-4">
        <h2 className="mb-3 text-3xl font-bold text-center text-gray-800">
          Login to Your Account
        </h2>
        <p className="text-sm text-center text-gray-600 mb-6">
          Don’t have an account?
          <Link
            to="/register"
            className="text-teal-600 font-medium hover:underline ml-1"
          >
            {" "}
            Register Here
          </Link>
        </p>

        <div className="my-6 space-y-4">
          <SocialLogin />
        </div>

        <div className="flex items-center w-full my-4">
          <hr className="w-full border-gray-300" />
          <p className="px-3 text-gray-500 text-sm">OR</p>
          <hr className="w-full border-gray-300" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-400 outline-none transition"
            />
            {errors.name && (
              <p className="text-red-600 text-sm mt-1">
                Please enter your name
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-400 outline-none transition"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">Email is required</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: true })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-teal-400 outline-none transition"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">
                Password is required
              </p>
            )}
            <p className="text-sm text-right mt-2">
              <button
                type="button"
                onClick={handleResetPassword}
                className="text-teal-600 hover:text-teal-700 hover:underline transition"
              >
                Forgot password? Reset
              </button>
            </p>
          </div>

          <button className="w-full px-8 py-3 font-semibold rounded-md bg-[#14b8a6] hover:bg-[#0f9f8e] text-white transition duration-200 shadow-md">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;