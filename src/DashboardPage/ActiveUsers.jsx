import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/userSlice";
import useAxiosSecure from "../customHook/useAxiosSecure";
import NomadAtlasLoader from "../components/Home/NomadAtlasLoader";

const ActiveUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    dispatch(fetchUsers(axiosSecure));
  }, [dispatch, axiosSecure]);

  if (loading) return <NomadAtlasLoader />;

  if (error) {
    let errMsg =
      typeof error === "string" ? error : error?.message || "Failed to fetch users";
    return <p className="text-center text-red-500 mt-6">{errMsg}</p>;
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 min-h-screen rounded-2xl">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 tracking-wide">
        User Management
      </h2>

      <div className="overflow-x-auto rounded-xl shadow-md border border-gray-200 bg-white/80 backdrop-blur-sm">
        <table className="min-w-full border-collapse">
          <thead className="bg-gradient-to-r from-indigo-50 to-amber-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                Role
              </th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-indigo-50 transition-colors duration-200"
              >
                <td className="px-6 py-3 border-b border-gray-200">{user.name}</td>
                <td className="px-6 py-3 border-b border-gray-200">{user.email}</td>
                <td className="px-6 py-3 border-b border-gray-200 capitalize">
                  {user.role}
                </td>
                <td className="px-6 py-3 border-b border-gray-200 text-center">
                  <button
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm ${
                      user.role === "admin"
                        ? "bg-[#f97316] text-white hover:bg-[#ea580c]"
                        : "bg-[#14b8a6] text-white hover:bg-[#0f9f8e]"
                    }`}
                  >
                    {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveUsers;
