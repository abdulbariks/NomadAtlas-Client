import React from "react";
import { useSelector } from "react-redux";
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
import { motion } from "framer-motion";
import { FaBattleNet } from "react-icons/fa";
import { Sparkles } from "lucide-react";

// Dummy favorites
const favorites = [
    {
        id: 1,
        name: "Bali, Indonesia",
        img: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c",
    },
    {
        id: 2,
        name: "New York City, USA",
        img: "https://i.postimg.cc/jdv09Fd7/jose-mizrahi-o-O37-OTL7-H-4-unsplash.jpg",
    },
    {
        id: 3,
        name: "Santorini, Greece",
        img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    },
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

const COLORS = ["#11c3c0", "#3ea1f1", "#6EE7B7", "#93C5FD"];

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);

    if (!user || !user.displayName || !user.email) {
        return (
            <div className="flex justify-center items-center min-h-screen text-gray-500">
                Loading...
            </div>
        );
    }

    const userInfo = {
        name: user.displayName,
        email: user.email,
        photoURL:
            user.photoURL ||
            "https://i.postimg.cc/br4qWysk/human-human-avatar-male-icon-with-png-and-vector-format-for-free-19807.png",
    };

    const handleProfileUpdate = () => {
        console.log("handle profile 9is working fine")
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-blue-50 rounded-lg p-8 space-y-12">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center space-y-3 mb-10"
            >
                <div className="flex justify-center items-center gap-2">
                    <Sparkles className="text-[#11c3c0]" />
                    <p className="uppercase tracking-wider font-semibold text-[#3ea1f1] text-sm">
                        Welcome back, Explorer!
                    </p>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-700">
                    Your Nomad Dashboard
                </h1>
                <p className="text-gray-500 text-lg">
                    Track your travels, favorites, and stats in one glance.
                </p>
            </motion.div>

            {/* Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-white/70 backdrop-blur-xl border border-cyan-100 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-center-safe gap-6 max-w-4xl mx-auto"
            >
                <img
                    src={userInfo.photoURL}
                    alt="profile"
                    className="w-24 h-24 rounded-full ring-4 ring-[#11c3c0]/30 object-cover"
                />
                <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-gray-800">{userInfo.name}</h2>
                    <p className="text-gray-500">{userInfo.email}</p>
                </div>
                <div>
                    <button onClick={handleProfileUpdate} className="text-end">
                        <FaBattleNet className="size-8  text-cyan-800"/>
                        
                    </button>
                </div>
            </motion.div>

            {/* Favorite Destinations */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-white via-cyan-50 to-blue-50 p-8 rounded-3xl border border-cyan-100 max-w-7xl mx-auto"
            >
                <h3 className="text-2xl font-bold mb-10 text-gray-800 text-center">
                    Your Favorite Destinations
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {favorites.map((fav) => (
                        <motion.div
                            key={fav.id}
                            whileHover={{ scale: 1.03 }}
                            className="relative overflow-hidden rounded-2xl group"
                        >
                            <img
                                src={fav.img}
                                alt={fav.name}
                                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center p-4">
                                <p className="text-white font-semibold text-lg">{fav.name}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                {/* Favorite Types */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/80 border border-cyan-100 rounded-3xl p-6 backdrop-blur-md"
                >
                    <h3 className="text-lg font-bold mb-4 text-gray-700">Favorite Types</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie data={favData} dataKey="value" nameKey="name" outerRadius={90} label>
                                {favData.map((entry, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Payment History */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/80 border border-cyan-100 rounded-3xl p-6 backdrop-blur-md"
                >
                    <h3 className="text-lg font-bold mb-4 text-gray-700">Payment History</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={paymentData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="amount"
                                stroke="#11c3c0"
                                strokeWidth={3}
                                dot={{ r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Destinations Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white/80 border border-cyan-100 rounded-3xl p-6 backdrop-blur-md md:col-span-2"
                >
                    <h3 className="text-lg font-bold mb-4 text-gray-700">
                        New Destinations per Month
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={destinationData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="destinations" fill="#3ea1f1" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Transactions */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/80 border border-cyan-100 rounded-3xl p-6 backdrop-blur-md max-w-5xl mx-auto"
            >
                <h3 className="text-lg font-bold mb-4 text-gray-700">
                    Recent Transactions
                </h3>
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-cyan-100 text-gray-500">
                            <th className="text-left py-2">Date</th>
                            <th className="text-left">Amount</th>
                            <th className="text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-cyan-50">
                            <td>01 Oct</td>
                            <td>$120</td>
                            <td className="text-green-600 font-medium">Paid</td>
                        </tr>
                        <tr className="border-b border-cyan-50">
                            <td>20 Sep</td>
                            <td>$200</td>
                            <td className="text-green-600 font-medium">Paid</td>
                        </tr>
                        <tr>
                            <td>15 Sep</td>
                            <td>$150</td>
                            <td className="text-red-500 font-medium">Failed</td>
                        </tr>
                    </tbody>
                </table>
            </motion.div>
        </div>
    );
};

export default Dashboard;
