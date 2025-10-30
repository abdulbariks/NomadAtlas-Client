import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, updateUserRole } from "../redux/userSlice";
import useAxiosSecure from "../customHook/useAxiosSecure";
import NomadAtlasLoader from "../components/Home/NomadAtlasLoader";

const ActiveUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error, updateLoading } = useSelector((state) => state.users);
  const axiosSecure = useAxiosSecure();
  const [updatingUser, setUpdatingUser] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    dispatch(fetchUsers(axiosSecure));
  }, [dispatch, axiosSecure]);

  const handleRoleUpdate = async (userEmail, newRole) => {
    setUpdatingUser(userEmail);
    setOpenDropdown(null);
    try {
      await dispatch(updateUserRole({ email: userEmail, role: newRole })).unwrap();
    } catch (error) {
      console.error("Failed to update role:", error);
    } finally {
      setUpdatingUser(null);
    }
  };

  const toggleDropdown = (userId) => {
    setOpenDropdown(openDropdown === userId ? null : userId);
  };

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: {
        bg: "bg-gradient-to-r from-cyan-500 to-cyan-600",
        border: "border-cyan-200",
        text: "text-white"
      },
      "service provider": {
        bg: "bg-gradient-to-r from-blue-500 to-blue-600",
        border: "border-blue-200",
        text: "text-white"
      },
      user: {
        bg: "bg-gradient-to-r from-gray-500 to-gray-600",
        border: "border-gray-200",
        text: "text-white"
      }
    };

    const config = roleConfig[role] || roleConfig.user;

    return (
      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${config.bg} ${config.border} ${config.text} shadow-sm border`}>
        {role}
      </span>
    );
  };

  const getRoleOptions = (currentRole) => {
    const allRoles = ["user", "service provider", "admin"];
    return allRoles.filter(role => role !== currentRole);
  };

  if (loading) return <NomadAtlasLoader />;

  if (error) {
    let errMsg = typeof error === "string" ? error : error?.message || "Failed to fetch users";
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md text-center">
          <div className="text-red-500 text-lg font-semibold">Error</div>
          <p className="text-red-600 mt-2">{errMsg}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-cyan-50/30 rounded-xl p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-cyan-900 mb-2">User Management</h1>
              <p className="text-cyan-700/80">Manage user roles and permissions across the platform</p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-cyan-200 px-6 py-4">
                <div className="text-sm text-cyan-700/70 font-medium">Total Users</div>
                <div className="text-2xl font-bold text-cyan-900">{users.length}</div>
              </div>
              <div className="bg-cyan-500 rounded-2xl shadow-lg px-6 py-4">
                <div className="text-sm text-white/90 font-medium">Admins</div>
                <div className="text-2xl font-bold text-white">
                  {users.filter(user => user.role === 'admin').length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-cyan-300/50 overflow-hidden">
          {/* Table Header */}
          <div className="px-8 py-6 bg-gradient-to-r from-cyan-500 to-cyan-600">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">All Users</h2>
              <div className="text-white/90">
                <span className="font-semibold">{users.length}</span> users total
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-cyan-50/80 border-b border-cyan-200/50">
                  <th className="px-8 py-6 text-left text-sm font-semibold text-cyan-900 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-6 text-left text-sm font-semibold text-cyan-900 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-6 text-left text-sm font-semibold text-cyan-900 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-6 text-left text-sm font-semibold text-cyan-900 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-6 text-center text-sm font-semibold text-cyan-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-100/50">
                {currentUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className="hover:bg-cyan-50/30 transition-all duration-200 group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* User Column */}
                    <td className="px-8 py-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="relative">
                          {user.photoURL ? (
                            <img
                              className="h-12 w-12 rounded-2xl object-cover border-2 border-white shadow-lg"
                              src={user.photoURL}
                              alt={user.name}
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center border-2 border-white shadow-lg">
                              <span className="text-white font-bold text-sm">
                                {user.name?.charAt(0)?.toUpperCase() || 'U'}
                              </span>
                            </div>
                          )}
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-cyan-900 group-hover:text-cyan-700">
                            {user.name}
                          </div>
                          <div className="text-xs text-cyan-600/70 mt-1">
                            Joined {new Date(user.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact Column */}
                    <td className="px-6 py-6 whitespace-nowrap">
                      <div className="text-sm text-cyan-900 font-medium">{user.email}</div>
                      <div className="text-xs text-cyan-600/70 mt-1">Active now</div>
                    </td>

                    {/* Role Column */}
                    <td className="px-6 py-6 whitespace-nowrap">
                      {getRoleBadge(user.role)}
                    </td>

                    {/* Status Column */}
                    <td className="px-6 py-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-sm font-medium text-cyan-900">Active</span>
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-6 whitespace-nowrap text-center">
                      <div className="relative">
                        <button
                          onClick={() => toggleDropdown(user._id)}
                          disabled={updateLoading && updatingUser === user.email}
                          className="inline-flex items-center px-4 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {updateLoading && updatingUser === user.email ? (
                            <span className="flex items-center">
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                              Updating...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Manage Role
                            </span>
                          )}
                        </button>

                        {/* Dropdown Menu */}
                        {openDropdown === user._id && (
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-cyan-200/50 z-10 overflow-hidden backdrop-blur-sm">
                            <div className="p-2">
                              <div className="text-xs font-semibold text-cyan-900/70 px-3 py-2 border-b border-cyan-100">
                                Change to:
                              </div>
                              {getRoleOptions(user.role).map((role) => (
                                <button
                                  key={role}
                                  onClick={() => handleRoleUpdate(user.email, role)}
                                  className="w-full px-4 py-3 text-left text-sm text-cyan-900 hover:bg-cyan-50 transition-colors duration-150 flex items-center space-x-3 group"
                                >
                                  <div className={`w-3 h-3 rounded-full transition-colors duration-200 ${role === "admin" ? "bg-cyan-500 group-hover:bg-cyan-600" :
                                    role === "service provider" ? "bg-blue-500 group-hover:bg-blue-600" :
                                      "bg-gray-500 group-hover:bg-gray-600"
                                    }`}></div>
                                  <span className="capitalize font-medium">Set as {role}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {users.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="bg-cyan-50/50 rounded-3xl border-2 border-dashed border-cyan-200 p-12 max-w-md mx-auto">
                <div className="w-20 h-20 bg-cyan-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-cyan-900 mb-2">No Users Found</h3>
                <p className="text-cyan-700/70">There are no users to display at the moment.</p>
              </div>
            </div>
          )}

          {/* Table Footer with Enhanced Pagination */}
          {users.length > 0 && (
            <div className="px-8 py-6 bg-cyan-50/50 border-t border-cyan-200/50">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Showing results info */}
                <div className="text-sm text-cyan-700/70">
                  Showing <span className="font-semibold text-cyan-900">{indexOfFirstUser + 1}-{Math.min(indexOfLastUser, users.length)}</span> of{" "}
                  <span className="font-semibold text-cyan-900">{users.length}</span> users
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="flex items-center px-4 py-2 text-sm font-medium text-cyan-700 bg-white border border-cyan-200 rounded-xl hover:bg-cyan-50 hover:text-cyan-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-xl transition-all duration-200 ${currentPage === page
                            ? "bg-cyan-500 text-white shadow-lg"
                            : "text-cyan-700 bg-white border border-cyan-200 hover:bg-cyan-50 hover:text-cyan-900"
                          }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-4 py-2 text-sm font-medium text-cyan-700 bg-white border border-cyan-200 rounded-xl hover:bg-cyan-50 hover:text-cyan-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
                  >
                    Next
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                {/* Page Info */}
                <div className="text-sm text-cyan-700/70">
                  Page <span className="font-semibold text-cyan-900">{currentPage}</span> of{" "}
                  <span className="font-semibold text-cyan-900">{totalPages}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveUsers;