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
  }, [dispatch,axiosSecure]);

  if (loading) return <NomadAtlasLoader/>;
  if (error) {
    let errMsg = typeof error === "string" ? error : error?.message || "Failed to fetch users";
    return <p className="text-center text-red-500 mt-6">{errMsg}</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">
                Email
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700">
                Role
              </th>
              <th className="px-6 py-3 border-b text-center text-sm font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-3 border-b">{user.name}</td>
                <td className="px-6 py-3 border-b">{user.email}</td>
                <td className="px-6 py-3 border-b capitalize">{user.role}</td>
                <td className="px-6 py-3 border-b text-center">
                  <button
                    className={`px-3 py-1 rounded-lg text-white ${user.role === "admin"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
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







// import { useEffect, useState } from "react";
// import useAxiosSecure from "../customHook/useAxiosSecure";


// const ActiveUsers = () => {

//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const axiosSecure = useAxiosSecure();

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const res = await axiosSecure.get(`/users`);
//         setUsers(res.data);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//         setError("Failed to load users.");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, [axiosSecure]);

//   if (loading) return <p className="text-center mt-6">Loading users...</p>;
//   if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;
// };

// export default ActiveUsers;






