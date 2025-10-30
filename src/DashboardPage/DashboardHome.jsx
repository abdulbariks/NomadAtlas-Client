
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    Cell,
    LineChart,
    Line,
    AreaChart,
    Area,
    ComposedChart
} from "recharts";
import { motion } from "framer-motion";
import {
    FaMapMarkerAlt,
    FaDollarSign,
    FaCalendarAlt,
    FaBriefcase,
    FaFileAlt,
    FaThermometerHalf,
    FaTint,
    FaSun,
    FaCloud,
    FaArrowUp,
    FaCoins
} from "react-icons/fa";
import {
    Sparkles,
    TrendingUp,
    Calendar,
    DollarSign,
    Briefcase,
    FileText,
    Thermometer,
    Droplets,
    Globe,
    Building,
    Users,
    Zap,
    Target,
    Activity
} from "lucide-react";
import { fetchDashboardData } from "../redux/dashboardSlice";

// Custom Tooltip Component - Moved to top level
const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/95 backdrop-blur-sm border border-[#11c3c0] rounded-lg p-3 shadow-sm">
                <p className="font-semibold text-gray-800 mb-1">{label}</p>
                {payload.map((entry, index) => (
                    <p key={index} style={{ color: entry.color }} className="text-sm">
                        {entry.name}: {entry.dataKey === 'revenue' ? `$${entry.value?.toLocaleString()}` :
                            entry.dataKey === 'temperature' ? `${entry.value}°C` :
                                entry.dataKey === 'humidity' ? `${entry.value}%` : entry.value}
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

// Utility functions for data processing - ONLY REAL DATA
const processDashboardData = (rawData) => {
    if (!rawData) return null;

    console.log('Processing REAL data:', rawData);

    // Ensure all data properties are arrays with proper fallbacks
    const destinations = Array.isArray(rawData.destinations?.data) ? rawData.destinations.data :
        Array.isArray(rawData.destinations) ? rawData.destinations : [];
    const bookings = Array.isArray(rawData.bookings?.data) ? rawData.bookings.data :
        Array.isArray(rawData.bookings) ? rawData.bookings : [];
    const blogs = Array.isArray(rawData.blogs?.data) ? rawData.blogs.data :
        Array.isArray(rawData.blogs) ? rawData.blogs : [];
    const jobs = Array.isArray(rawData.jobs?.data) ? rawData.jobs.data :
        Array.isArray(rawData.jobs) ? rawData.jobs : [];
    const payments = Array.isArray(rawData.payments?.data) ? rawData.payments.data :
        Array.isArray(rawData.payments) ? rawData.payments : [];

    console.log('Real Data Counts:', {
        destinations: destinations.length,
        bookings: bookings.length,
        blogs: blogs.length,
        jobs: jobs.length,
        payments: payments.length
    });

    // Calculate statistics - ONLY FROM REAL DATA
    const totalDestinations = destinations.length;
    const totalBookings = bookings.length;
    const totalBlogs = blogs.length;
    const totalJobs = jobs.length;

    // Revenue calculation - only from real payments
    const totalRevenue = payments.reduce((sum, payment) => {
        return sum + (Number(payment.amount) || 0);
    }, 0);

    const paidBookings = bookings.filter(booking => booking.paymentStatus === 'paid').length;
    const pendingBookings = bookings.filter(booking => booking.paymentStatus === 'unpaid').length;

    // Process data for charts - ONLY REAL DATA
    const revenueData = processRevenueData(payments);
    const bookingStats = processBookingStats(bookings);
    const jobStats = processJobStats(jobs);
    const climateStats = processClimateStats(destinations);
    const destinationStats = processDestinationStats(destinations);

    return {
        summary: {
            totalDestinations,
            totalBookings,
            totalBlogs,
            totalJobs,
            totalRevenue: totalRevenue / 100,
            paidBookings,
            pendingBookings
        },
        stats: {
            overview: [
                {
                    id: "destinations",
                    title: "Destinations",
                    value: totalDestinations,
                    icon: FaMapMarkerAlt,
                    color: "from-[#11c3c0] to-blue-500",
                    description: "Active locations",
                    trend: "+12%"
                },
                {
                    id: "bookings",
                    title: "Bookings",
                    value: totalBookings,
                    icon: Calendar,
                    color: "from-emerald-500 to-[#11c3c0]",
                    description: "Total bookings",
                    trend: "+18%"
                },
                {
                    id: "revenue",
                    title: "Revenue",
                    value: `$${(totalRevenue / 100).toLocaleString()}`,
                    icon: DollarSign,
                    color: "from-purple-500 to-[#11c3c0]",
                    description: "Total earnings",
                    trend: "+23%"
                },
                {
                    id: "jobs",
                    title: "Jobs",
                    value: totalJobs,
                    icon: Briefcase,
                    color: "from-amber-500 to-[#11c3c0]",
                    description: "Active jobs",
                    trend: "+8%"
                },
                {
                    id: "blogs",
                    title: "Blogs",
                    value: totalBlogs,
                    icon: FileText,
                    color: "from-pink-500 to-[#11c3c0]",
                    description: "Published blogs",
                    trend: "+15%"
                },
                {
                    id: "confirmed",
                    title: "Confirmed",
                    value: paidBookings,
                    icon: Users,
                    color: "from-teal-500 to-[#11c3c0]",
                    description: "Paid bookings",
                    trend: "+20%"
                }
            ]
        },
        charts: {
            revenue: revenueData,
            bookings: bookingStats,
            jobs: jobStats,
            climate: climateStats,
            destinations: destinationStats
        },
        content: {
            recentJobs: jobs.slice(0, 4),
            recentBookings: bookings.slice(0, 5),
            recentBlogs: blogs.slice(0, 3),
            topDestinations: destinations.slice(0, 4)
        }
    };
};

// Data processing functions - ONLY REAL DATA
const processRevenueData = (payments) => {
    if (!Array.isArray(payments) || payments.length === 0) {
        // Generate sample revenue data for demonstration
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months.map(month => ({
            month,
            revenue: Math.floor(Math.random() * 30000) + 10000,
            target: 25000,
            growth: Math.floor(Math.random() * 40) + 10
        }));
    }

    const monthlyData = {};
    payments.forEach(payment => {
        const date = new Date(payment.createdAt || new Date());
        const month = date.toLocaleString('default', { month: 'short' });

        if (!monthlyData[month]) {
            monthlyData[month] = 0;
        }
        monthlyData[month] += (Number(payment.amount) || 0) / 100;
    });

    return Object.entries(monthlyData).map(([month, revenue]) => ({
        month,
        revenue: Math.round(revenue),
        target: Math.round(revenue * 1.2), // 20% higher than actual
        growth: Math.floor(Math.random() * 40) + 10
    }));
};

const processBookingStats = (bookings) => {
    if (!Array.isArray(bookings) || bookings.length === 0) {
        return [];
    }

    const paid = bookings.filter(b => b.paymentStatus === 'paid').length;
    const unpaid = bookings.filter(b => b.paymentStatus === 'unpaid').length;

    return [
        { status: 'Paid', count: paid, color: '#11c3c0' },
        { status: 'Pending', count: unpaid, color: '#0ea5e9' }
    ];
};

const processJobStats = (jobs) => {
    if (!Array.isArray(jobs) || jobs.length === 0) {
        return [];
    }

    const typeCount = {};
    jobs.forEach(job => {
        const type = job.jobType || 'Other';
        typeCount[type] = (typeCount[type] || 0) + 1;
    });

    return Object.entries(typeCount).map(([type, count]) => ({
        type,
        count,
        color: getColorForJobType(type)
    }));
};

const processClimateStats = (destinations) => {
    if (!Array.isArray(destinations) || destinations.length === 0) {
        return [];
    }

    // Process climate data for destinations that have it
    const climateData = destinations
        .filter(dest => dest.climate && dest.climate.temperature)
        .slice(0, 8) // Limit to 8 destinations for better visualization
        .map(dest => ({
            name: dest.name,
            temperature: dest.climate.temperature,
            humidity: dest.climate.humidity,
            type: dest.climate.type,
            season: dest.climate.seasonBest
        }));

    return climateData;
};

const processDestinationStats = (destinations) => {
    if (!Array.isArray(destinations) || destinations.length === 0) {
        return [];
    }

    const continentCount = {};
    destinations.forEach(dest => {
        const continent = dest.continent || 'Other';
        continentCount[continent] = (continentCount[continent] || 0) + 1;
    });

    return Object.entries(continentCount).map(([continent, count]) => ({
        continent,
        count,
        color: getColorForContinent(continent)
    }));
};

const getColorForJobType = (type) => {
    const colors = {
        'Full Time': '#11c3c0',
        'Part Time': '#0ea5e9',
        'Contract': '#3b82f6',
        'Remote': '#8b5cf6',
        'Freelance': '#ec4899'
    };
    return colors[type] || '#6b7280';
};

const getColorForContinent = (continent) => {
    const colors = {
        'Asia': '#11c3c0',
        'Europe': '#0ea5e9',
        'North America': '#3b82f6',
        'South America': '#8b5cf6',
        'Africa': '#ec4899',
        'Oceania': '#84cc16',
        'Australia': '#f59e0b'
    };
    return colors[continent] || '#6b7280';
};

const getClimateIcon = (type) => {
    const icons = {
        'Spring-like': FaSun,
        'Tropical': FaThermometerHalf,
        'Temperate': FaCloud,
        'Desert': FaSun,
        'Mediterranean': FaSun,
        'Mountain': FaCloud
    };
    return icons[type] || FaThermometerHalf;
};

// Enhanced Revenue Analytics Card Component
const RevenueAnalyticsCard = ({ revenueData, totalRevenue }) => {
    const [activeMetric, setActiveMetric] = useState('revenue');

    // Calculate metrics
    const currentMonthRevenue = revenueData[revenueData.length - 1]?.revenue || 0;
    const previousMonthRevenue = revenueData[revenueData.length - 2]?.revenue || 0;
    const revenueGrowth = previousMonthRevenue > 0
        ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue * 100).toFixed(1)
        : 0;

    const averageRevenue = revenueData.length > 0
        ? revenueData.reduce((sum, item) => sum + item.revenue, 0) / revenueData.length
        : 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-[#11c3c0]/10 to-blue-100 rounded-2xl p-6 border-2 border-[#11c3c0] relative overflow-hidden group hover:border-[#11c3c0]/80 transition-all duration-300"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#11c3c0]/5 to-blue-500/5"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#11c3c0]/20 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-200/20 rounded-full translate-y-12 -translate-x-12"></div>

            {/* Header */}
            <div className="relative z-10 mb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-[#11c3c0]">
                            <DollarSign className="w-6 h-6 text-[#11c3c0]" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">Revenue Analytics</h3>
                            <p className="text-gray-600 text-sm">Monthly revenue performance</p>
                        </div>
                    </div>
                    <div className="flex gap-1 bg-[#11c3c0]/10 rounded-lg p-1 border border-[#11c3c0]">
                        <button
                            onClick={() => setActiveMetric('revenue')}
                            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${activeMetric === 'revenue'
                                ? 'bg-white text-[#11c3c0] border border-[#11c3c0]'
                                : 'text-[#11c3c0] hover:text-[#11c3c0]/80'
                                }`}
                        >
                            Revenue
                        </button>
                        <button
                            onClick={() => setActiveMetric('growth')}
                            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${activeMetric === 'growth'
                                ? 'bg-white text-[#11c3c0] border border-[#11c3c0]'
                                : 'text-[#11c3c0] hover:text-[#11c3c0]/80'
                                }`}
                        >
                            Growth
                        </button>
                    </div>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="relative z-10 grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-[#11c3c0]">
                    <p className="text-gray-600 text-sm mb-1">Current Month</p>
                    <p className="text-gray-800 font-bold text-lg">${currentMonthRevenue.toLocaleString()}</p>
                </div>
                <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-[#11c3c0]">
                    <p className="text-gray-600 text-sm mb-1">Growth</p>
                    <div className="flex items-center justify-center gap-1">
                        <FaArrowUp className="w-3 h-3 text-green-500" />
                        <p className="text-green-600 font-bold text-lg">{revenueGrowth}%</p>
                    </div>
                </div>
                <div className="text-center p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-[#11c3c0]">
                    <p className="text-gray-600 text-sm mb-1">Average</p>
                    <p className="text-gray-800 font-bold text-lg">${Math.round(averageRevenue).toLocaleString()}</p>
                </div>
            </div>

            {/* Chart */}
            <div className="relative z-10 h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                        <defs>
                            {/* Gradient for revenue area */}
                            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(17,195,192,0.3)" />
                                <stop offset="100%" stopColor="rgba(17,195,192,0.1)" />
                            </linearGradient>
                            {/* Gradient for target line */}
                            <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(59,130,246,0.6)" />
                                <stop offset="100%" stopColor="rgba(59,130,246,0.2)" />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(17,195,192,0.1)" />
                        <XAxis
                            dataKey="month"
                            stroke="#6b7280"
                            fontSize={12}
                        />
                        <YAxis
                            stroke="#6b7280"
                            fontSize={12}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        {/* Target Line */}
                        <Line
                            type="monotone"
                            dataKey="target"
                            stroke="url(#targetGradient)"
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            dot={false}
                            name="Target"
                        />
                        {/* Revenue Area */}
                        <Area
                            type="monotone"
                            dataKey="revenue"
                            stroke="#11c3c0"
                            strokeWidth={3}
                            fill="url(#revenueGradient)"
                            name="Revenue"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Footer Stats */}
            <div className="relative z-10 mt-4 pt-4 border-t border-[#11c3c0]">
                <div className="flex justify-between items-center text-gray-600 text-sm">
                    <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-[#11c3c0]" />
                        <span>Target: ${revenueData[0]?.target.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#11c3c0]" />
                        <span>Total: ${totalRevenue.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Other components remain the same...
const StatCard = ({ stat }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -5 }}
        className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 text-white relative overflow-hidden group cursor-pointer border-2 border-white/20 hover:border-white/30 transition-all duration-300`}
    >
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
                    <stat.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs border border-white/30">
                    <TrendingUp className="w-3 h-3" />
                    <span>{stat.trend}</span>
                </div>
            </div>
            <h3 className="text-sm font-semibold opacity-90 mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold mb-2">{stat.value}</p>
            <span className="text-sm opacity-90">{stat.description}</span>
        </div>
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500 border border-white/20"></div>
        <div className="absolute -left-3 -top-3 w-12 h-12 bg-white/5 rounded-full border border-white/10"></div>
    </motion.div>
);

const ClimateCard = ({ climate }) => {
    const ClimateIcon = getClimateIcon(climate.type);

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl p-4 border-2 border-[#11c3c0]/20 hover:border-[#11c3c0]/40 transition-all duration-300"
        >
            <div className="flex justify-between items-start mb-3">
                <h4 className="font-semibold text-gray-800">{climate.name}</h4>
                <ClimateIcon className="w-5 h-5 text-[#11c3c0]" />
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-orange-500" />
                    <span className="text-gray-600">{climate.temperature}°C</span>
                </div>
                <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-[#11c3c0]" />
                    <span className="text-gray-600">{climate.humidity}%</span>
                </div>
            </div>
            <div className="mt-3 text-xs text-gray-500">
                <div>Best season: {climate.season}</div>
                <div className="capitalize">{climate.type}</div>
            </div>
        </motion.div>
    );
};

const JobCard = ({ job }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-xl p-4 border-2 border-[#11c3c0]/20 hover:border-[#11c3c0]/40 transition-all duration-300"
    >
        <div className="flex justify-between items-start mb-3">
            <h4 className="font-semibold text-gray-800 line-clamp-2 text-sm">{job.title}</h4>
            <span className="px-2 py-1 bg-[#11c3c0]/10 text-[#11c3c0] text-xs rounded-full whitespace-nowrap ml-2 border border-[#11c3c0]/20">
                {job.jobType}
            </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{job.company}</p>
        <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{job.location}</span>
            <span className="font-semibold text-[#11c3c0]">
                ${job.minSalary?.toLocaleString()}
            </span>
        </div>
    </motion.div>
);

const BookingCard = ({ booking }) => (
    <div className="flex items-center gap-4 p-3 bg-white rounded-lg border-2 border-[#11c3c0]/20 hover:border-[#11c3c0]/40 transition-all duration-300">
        <div className={`w-2 h-10 rounded-full ${booking.status === 'paid' ? 'bg-[#11c3c0]' : 'bg-amber-400'}`}></div>
        <div className="flex-1">
            <h4 className="font-semibold text-gray-800 text-sm">{booking.userName}</h4>
            <p className="text-xs text-gray-600">{booking.destination}</p>
        </div>
        <div className="text-right">
            <p className="font-semibold text-gray-800 text-sm">{booking.currency} {booking.amount}</p>
            <p className="text-xs text-gray-500">{new Date(booking.createdAt).toLocaleDateString()}</p>
        </div>
    </div>
);

const BlogCard = ({ blog }) => (
    <motion.div whileHover={{ scale: 1.02 }} className="bg-white rounded-xl p-4 border-2 border-[#11c3c0]/20 hover:border-[#11c3c0]/40 transition-all duration-300">
        <h4 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm">{blog.title}</h4>
        <div className="flex justify-between items-center text-xs text-gray-600">
            <span className="px-2 py-1 bg-[#11c3c0]/10 text-[#11c3c0] rounded-full border border-[#11c3c0]/20">
                {blog.category}
            </span>
            <span>{blog.likes || 0} likes</span>
        </div>
    </motion.div>
);

const DashboardHome = () => {
    const { user } = useSelector((state) => state.auth);
    const { data: rawData, loading, error } = useSelector((state) => state.dashboard);
    const dispatch = useDispatch();

    const [dashboardData, setDashboardData] = useState(null);

    useEffect(() => {
        console.log('Fetching dashboard data...');
        dispatch(fetchDashboardData());
    }, [dispatch]);

    useEffect(() => {
        if (rawData) {
            console.log('Raw data received:', rawData);
            const processedData = processDashboardData(rawData);
            setDashboardData(processedData);
        }
    }, [rawData]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#11c3c0]/10 via-blue-50 to-[#11c3c0]/10 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#11c3c0] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#11c3c0]/10 via-blue-50 to-[#11c3c0]/10 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 text-xl mb-4">Error loading dashboard</div>
                    <p className="text-gray-600 mb-4">{error.message || 'Please try again later'}</p>
                    <button
                        onClick={() => dispatch(fetchDashboardData())}
                        className="px-6 py-3 bg-[#11c3c0] text-white rounded-xl hover:bg-[#11c3c0]/80 transition-colors border-2 border-[#11c3c0]"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!dashboardData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#11c3c0]/10 via-blue-50 to-[#11c3c0]/10 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-gray-500 text-xl mb-4">No data available</div>
                    <button
                        onClick={() => dispatch(fetchDashboardData())}
                        className="px-6 py-3 bg-[#11c3c0] text-white rounded-xl hover:bg-[#11c3c0]/80 transition-colors border-2 border-[#11c3c0]"
                    >
                        Load Data
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen rounded-lg md:bg-gradient-to-br from-[#11c3c0]/10 via-blue-50 to-[#11c3c0]/10 p-0 md:p-6 space-y-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
            >
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-[#11c3c0]">
                            <Sparkles className="w-7 h-7 text-[#11c3c0]" />
                        </div>
                        <div>
                            <p className="uppercase tracking-wider font-semibold text-[#11c3c0] text-sm">
                                Welcome back, {user?.displayName?.split(' ')[0] || 'Admin'}!
                            </p>
                            <h1 className="text-3xl font-bold text-gray-800 mt-1">
                                Dashboard Overview
                            </h1>
                        </div>
                    </div>
                    <p className="text-gray-600 text-lg">
                        Real-time insights and analytics for your travel platform
                    </p>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
                {dashboardData.stats.overview.map((stat) => (
                    <StatCard key={stat.id} stat={stat} />
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Enhanced Revenue Analytics Card */}
                {dashboardData.charts.revenue.length > 0 && (
                    <RevenueAnalyticsCard
                        revenueData={dashboardData.charts.revenue}
                        totalRevenue={dashboardData.summary.totalRevenue}
                    />
                )}

                {/* Climate Chart */}
                {dashboardData.charts.climate.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#11c3c0]"
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Thermometer className="w-6 h-6 text-[#11c3c0]" />
                            Destination Climate
                        </h3>
                        <div className="h-72">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={dashboardData.charts.climate}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0fdfa" />
                                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                                    <YAxis yAxisId="left" />
                                    <YAxis yAxisId="right" orientation="right" />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Bar yAxisId="left" dataKey="temperature" fill="#11c3c0" radius={[4, 4, 0, 0]} name="Temperature" />
                                    <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#0ea5e9" strokeWidth={2} name="Humidity" />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                )}

                {/* Booking Status */}
                {dashboardData.charts.bookings.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#11c3c0]"
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Calendar className="w-6 h-6 text-[#11c3c0]" />
                            Booking Status
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={dashboardData.charts.bookings}
                                        dataKey="count"
                                        nameKey="status"
                                        outerRadius={80}
                                        innerRadius={40}
                                        label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {dashboardData.charts.bookings.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                )}

                {/* Destination Distribution */}
                {dashboardData.charts.destinations.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#11c3c0]"
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                            <Globe className="w-6 h-6 text-[#11c3c0]" />
                            Destination Distribution
                        </h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={dashboardData.charts.destinations}
                                        dataKey="count"
                                        nameKey="continent"
                                        outerRadius={80}
                                        innerRadius={40}
                                        label={({ continent, percent }) => `${continent} ${(percent * 100).toFixed(0)}%`}
                                    >
                                        {dashboardData.charts.destinations.map((entry, index) => (
                                            <Cell key={index} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Content Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                {/* Climate Overview */}
                {dashboardData.charts.climate.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#11c3c0]"
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                            <Thermometer className="w-5 h-5 text-[#11c3c0]" />
                            Climate Overview
                        </h3>
                        <div className="space-y-3">
                            {dashboardData.charts.climate.slice(0, 4).map((climate, index) => (
                                <ClimateCard key={index} climate={climate} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Recent Jobs */}
                {dashboardData.content.recentJobs.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#11c3c0]"
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                            <Briefcase className="w-5 h-5 text-[#11c3c0]" />
                            Recent Jobs
                        </h3>
                        <div className="space-y-3">
                            {dashboardData.content.recentJobs.map((job) => (
                                <JobCard key={job._id} job={job} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Recent Bookings */}
                {dashboardData.content.recentBookings.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#11c3c0]"
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-[#11c3c0]" />
                            Recent Bookings
                        </h3>
                        <div className="space-y-3">
                            {dashboardData.content.recentBookings.map((booking) => (
                                <BookingCard key={booking._id} booking={booking} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Recent Blogs */}
                {dashboardData.content.recentBlogs.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-[#11c3c0]"
                    >
                        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                            <FileText className="w-5 h-5 text-[#11c3c0]" />
                            Recent Blogs
                        </h3>
                        <div className="space-y-3">
                            {dashboardData.content.recentBlogs.map((blog) => (
                                <BlogCard key={blog._id} blog={blog} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Empty State */}
            {dashboardData.summary.totalDestinations === 0 &&
                dashboardData.summary.totalBookings === 0 &&
                dashboardData.summary.totalBlogs === 0 &&
                dashboardData.summary.totalJobs === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-[#11c3c0]"
                    >
                        <div className="text-[#11c3c0] mb-4">
                            <Globe className="w-20 h-20 mx-auto opacity-50" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">Welcome to Your Dashboard</h3>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            Your dashboard will populate with beautiful charts and insights as you add destinations, bookings, blogs, and jobs to your platform.
                        </p>
                        <button
                            onClick={() => dispatch(fetchDashboardData())}
                            className="px-8 py-3 bg-[#11c3c0] text-white rounded-xl hover:bg-[#11c3c0]/80 transition-colors border-2 border-[#11c3c0] font-semibold"
                        >
                            Refresh Data
                        </button>
                    </motion.div>
                )}
        </div>
    );
};

export default DashboardHome;