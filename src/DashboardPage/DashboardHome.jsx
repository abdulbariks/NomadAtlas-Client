import React from "react";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Cell,
} from "recharts";

// Dummy user
const user = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    photoURL: "https://i.postimg.cc/8zZxwg7j/elena-soroka-AOIRbye-iwk-unsplash.jpg",
};

// Dummy favorites
const favorites = [
    { id: 1, name: "Bali, Indonesia", img: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c" },
    { id: 2, name: "New York City, USA", img: "https://i.postimg.cc/jdv09Fd7/jose-mizrahi-o-O37-OTL7-H-4-unsplash.jpg" },
    { id: 3, name: "", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
];

// Chart data
const favData = [
    { name: "Urban", value: 12 },
    { name: "Tropical", value: 8 },
    { name: "Cultural", value: 6 },
    { name: "Nature", value: 10 },
];

const paymentData = [
    { month: "Jan", amount: 120 },
    { month: "Feb", amount: 200 },
    { month: "Mar", amount: 150 },
    { month: "Apr", amount: 180 },
    { month: "May", amount: 220 },
];

const destinationData = [
    { month: "Jan", destinations: 3 },
    { month: "Feb", destinations: 5 },
    { month: "Mar", destinations: 2 },
    { month: "Apr", destinations: 4 },
    { month: "May", destinations: 6 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
    return (
        <div className="p-8 space-y-10 bg-gray-100 min-h-screen">
            {/* Profile */}
            <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
                <img
                    src={user.photoURL}
                    alt="profile"
                    className="w-20 h-20 rounded-full object-cover"
                />
                <div>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-gray-500">{user.email}</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white p-5 rounded-xl shadow text-center">
                    <h3 className="text-gray-500">Destinations Saved</h3>
                    <p className="text-2xl font-bold">26</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow text-center">
                    <h3 className="text-gray-500">Favorites</h3>
                    <p className="text-2xl font-bold">{favorites.length}</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow text-center">
                    <h3 className="text-gray-500">Payments</h3>
                    <p className="text-2xl font-bold">$1,250</p>
                </div>
                <div className="bg-white p-5 rounded-xl shadow text-center">
                    <h3 className="text-gray-500">Trips Planned</h3>
                    <p className="text-2xl font-bold">5</p>
                </div>
            </div>

            {/* Favorites Grid */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold mb-12 text-gray-800">Your Favorite Destinations</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {favorites.map((fav) => (
                            <div key={fav.id} className="relative pt-32">
                                <img
                                    src={fav.img}
                                    alt={fav.name}
                                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-11/12 h-48 rounded-lg object-cover shadow-lg"
                                />
                                <div className="bg-gray-50 pt-28 pb-6 px-4 rounded-xl shadow-md">
                                    <p className="font-semibold text-lg text-center text-gray-800">{fav.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Favorite Types */}
                <div className="bg-white shadow rounded-xl p-5">
                    <h3 className="text-lg font-bold mb-4">Favorite Types</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={favData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {favData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Payment History */}
                <div className="bg-white shadow rounded-xl p-5">
                    <h3 className="text-lg font-bold mb-4">Payment History</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={paymentData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* New Destinations */}
                <div className="bg-white shadow rounded-xl p-5 md:col-span-2">
                    <h3 className="text-lg font-bold mb-4">New Destinations per Month</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={destinationData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="destinations" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Transactions */}
            <div className="bg-white p-5 rounded-xl shadow">
                <h3 className="text-lg font-bold mb-4">Recent Transactions</h3>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-2">Date</th>
                            <th className="text-left">Amount</th>
                            <th className="text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td>01 Oct</td>
                            <td>$120</td>
                            <td className="text-green-600">Paid</td>
                        </tr>
                        <tr className="border-b">
                            <td>20 Sep</td>
                            <td>$200</td>
                            <td className="text-green-600">Paid</td>
                        </tr>
                        <tr>
                            <td>15 Sep</td>
                            <td>$150</td>
                            <td className="text-red-500">Failed</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;