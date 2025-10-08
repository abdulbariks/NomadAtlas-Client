import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendResetEmail } from "../redux/authSlice";
import Animation from "../components/Animation/Animation";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { status, resetEmailSent, error } = useSelector((s) => s.auth);

  const handleResetPassword = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    dispatch(sendResetEmail({ email }));
  };

  return (
    <div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-5 my-5">
      <div className="w-full h-full rounded-md shadow  bg-white mb-1 text-gray-800">
        <Animation></Animation>
      </div>
      <div className="w-full p-4 rounded-md shadow sm:p-8 bg-white mb-1 text-gray-800">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Reset password
        </h2>
        <form onSubmit={handleResetPassword} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email address"
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-8 py-3 font-semibold rounded-md bg-[#37b6f5] text-gray-50"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Reset password..." : "Submit"}
          </button>
          {resetEmailSent && (
            <p className="text-green-600 mt-2">
              Reset email sent. Check your inbox.
            </p>
          )}
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
