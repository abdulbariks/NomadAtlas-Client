import React from "react";
const users = [
  { id: 1, name: "Abdul Barik", email: "abdul@barik.com", role: "Admin" },
  { id: 2, name: "Kousar Ahmed", email: "kouser@ahmed.com", role: "User" },
  {
    id: 3,
    name: "Altaf Uddin Sifat",
    email: "sifat@example.com",
    role: "Moderator",
  },
  {
    id: 4,
    name: "Michael Brown",
    email: "michael@example.com",
    role: "Moderator",
  },
  { id: 5, name: "Emily Davis", email: "emily@example.com", role: "User" },
  { id: 6, name: "Rafi", email: "marjiul@rafi.com", role: "User" },
  { id: 7, name: "Sophia Taylor", email: "sophia@example.com", role: "User" },
  { id: 8, name: "Sharmin Akter", email: "sharmin@akter.com", role: "User" },
  { id: 9, name: "Reja", email: "rejaul@karim.com", role: "User" },
  { id: 10, name: "Ethan White", email: "ethan@example.com", role: "User" },
];
const ActiveUsers = () => {


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
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-3 border-b">{user.name}</td>
                <td className="px-6 py-3 border-b">{user.email}</td>
                <td className="px-6 py-3 border-b">{user.role}</td>
                <td className="px-6 py-3 border-b text-center">
                  <button
                    className={`px-3 py-1 rounded-lg text-white ${
                      user.role === "Admin"
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                  >
                    {user.role === "Admin" ? "Remove Admin" : "Make Admin"}
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
