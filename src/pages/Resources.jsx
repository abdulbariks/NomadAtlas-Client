import React, { useState, useEffect } from "react";
import {
  Calculator,
  Map,
  Users,
  Briefcase,
  BookOpen,
  Globe,
  Plane,
  Zap,
  MessageCircle,
} from "lucide-react";

const ICONS = {
  Calculator: Calculator,
  Map: Map,
  Users: Users,
  Briefcase: Briefcase,
  BookOpen: BookOpen,
  Globe: Globe,
  Plane: Plane,
  Zap: Zap,
  MessageCircle: MessageCircle,
};

const Resource = () => {
  //  Hardcoded Internal Tools (old version)
  const internalTools = [
    {
      name: "Cost Calculator",
      icon: "Calculator",
      link: "/cost-calculator",
      desc: "Calculate your budget and find cities that match your spending limit",
      color: "blue",
    },
    {
      name: "City Comparison",
      icon: "Map",
      link: "/comparison",
      desc: "Compare multiple destinations by cost, wifi, safety, and lifestyle",
      color: "green",
    },
    {
      name: "Community Forum",
      icon: "Users",
      link: "/community",
      desc: "Connect with fellow nomads, share experiences and get advice",
      color: "purple",
    },
  ];

  //  Dynamic Data for other sections
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/resources"
        );
        const data = await res.json();
        setResources(data.resources);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResources();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  // Filter dynamic resources by type
  const jobPlatforms = resources.filter((r) => r.type === "job");
  const productivityTools = resources.filter((r) => r.type === "productivity");
  const visaResources = resources.filter((r) => r.type === "visa");
  const communities = resources.filter((r) => r.type === "community");

  const getColorClasses = (color) => {
    const colors = {
      blue: "from-blue-500 to-cyan-500 hover:shadow-blue-200",
      green: "from-green-500 to-emerald-500 hover:shadow-green-200",
      purple: "from-purple-500 to-pink-500 hover:shadow-purple-200",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mt-10">
      {/* Hero Section */}
      <header className="text-center py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <Globe className="w-16 h-16 mx-auto mb-4 animate-pulse" />
        <h1 className="text-5xl font-bold mb-4">
          Resources for Digital Nomads
        </h1>
        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
          Everything you need to plan, work, and thrive as a digital nomad — all
          in one place
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        {/* 1. OUR PLATFORM TOOLS (hardcoded) */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">🚀 Our Platform Tools</h2>
            <p className="text-gray-600 text-lg">
              Powerful features built specifically for nomads like you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {internalTools.map((tool, i) => {
              const Icon = ICONS[tool.icon];
              if (!Icon) return null;
              return (
                <a
                  key={i}
                  href={tool.link}
                  className={`group relative p-8 bg-gradient-to-br ${getColorClasses(
                    tool.color
                  )} rounded-2xl text-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2`}
                >
                  <div className="absolute top-4 right-4 opacity-20">
                    <Icon className="w-24 h-24" />
                  </div>
                  <Icon className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-3">{tool.name}</h3>
                  <p className="text-white/90">{tool.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                    Try Now →
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* 2. NOMAD GUIDES (static as before) */}
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-12">
          <div className="flex items-center gap-4 mb-8">
            <BookOpen className="w-10 h-10 text-orange-500" />
            <h2 className="text-4xl font-bold">Nomad Guides & Tips</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="/blogs"
              className="bg-white p-6 rounded-xl transition group"
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600">
                How to Choose Your Next Destination
              </h3>
              <p className="text-gray-600">
                Expert tips on finding the perfect city for your lifestyle and
                budget
              </p>
            </a>
            <a
              href="/blogs"
              className="bg-white p-6 rounded-xl transition group"
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600">
                Digital Nomad Visa Guide 2025
              </h3>
              <p className="text-gray-600">
                Complete visa information for popular nomad destinations
              </p>
            </a>
            <a
              href="/blogs"
              className="bg-white p-6 rounded-xl transition group"
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600">
                Budget Planning for Nomads
              </h3>
              <p className="text-gray-600">
                Smart money management tips for long-term travel
              </p>
            </a>
            <a
              href="/blogs"
              className="bg-white p-6 rounded-xl transition group"
            >
              <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600">
                Safety Tips for Remote Workers
              </h3>
              <p className="text-gray-600">
                Stay safe while working and traveling abroad
              </p>
            </a>
          </div>
        </section>

        {/* 3. REMOTE WORK PLATFORMS (dynamic) */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <Briefcase className="w-10 h-10 text-cyan-400" />
            <h2 className="text-4xl font-bold">Find Remote Work</h2>
          </div>
          <p className="text-gray-600 text-lg mb-8">
            Trusted platforms to find remote jobs and freelance opportunities
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {jobPlatforms.map((platform, i) => (
              <a
                key={i}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-6 hover:border-cyan-200 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={platform.logo}
                    alt={platform.name}
                    className="w-10 h-10"
                  />
                  <h3 className="font-bold text-lg">{platform.name}</h3>
                </div>
                <p className="text-gray-600">{platform.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* 4. PRODUCTIVITY TOOLS (dynamic) */}
        <section className="bg-white rounded-3xl p-12">
          <div className="flex items-center gap-4 mb-8">
            <Zap className="w-10 h-10 text-blue-300" />
            <h2 className="text-4xl font-bold">Productivity Tools</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {productivityTools.map((tool, i) => (
              <a
                key={i}
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-xl hover:shadow-lg transition text-center"
              >
                <img
                  src={tool.logo}
                  alt={tool.name}
                  className="w-12 h-12 mx-auto mb-3"
                />
                <h3 className="font-bold text-lg mb-2">{tool.name}</h3>
                <p className="text-gray-600 text-sm">{tool.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* 5. VISA RESOURCES (dynamic) */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <Plane className="w-10 h-10 text-cyan-200" />
            <h2 className="text-4xl font-bold"> Digital Nomad Visas</h2>
          </div>
          <p className="text-gray-600 text-lg mb-8">
            Official visa information and application links for digital nomad
            visas worldwide
          </p>
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-cyan-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Country
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Visa Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Duration
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Min. Income
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Official Link
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {visaResources.map((visa, i) => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{visa.flag}</span>
                          <span className="font-semibold text-gray-800">
                            {visa.country}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {visa.visaType}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {visa.duration}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-cyan-500 font-semibold text-sm">
                          {visa.income}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={visa.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-teal-300 hover:text-gray-500 hover:underline font-semibold text-sm transition"
                        >
                          Apply Here →
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 6. COMMUNITY (dynamic) */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <MessageCircle className="w-10 h-10 text-blue-500" />
            <h2 className="text-4xl font-bold">Join Communities</h2>
          </div>
          <p className="text-gray-600 text-lg mb-8">
            Connect with thousands of digital nomads around the world
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {communities.map((com, i) => (
              <a
                key={i}
                href={com.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-white border-2 border-gray-100 rounded-xl p-8 hover:shadow-lg transition group ${
                  com.color === "blue"
                    ? "hover:border-blue-500"
                    : "hover:border-orange-500"
                }`}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={com.icon}
                    alt={com.name}
                    className="w-14 h-14 object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="flex-1">
                    <h3
                      className={`font-bold text-xl mb-2 ${
                        com.color === "blue"
                          ? "group-hover:text-blue-600"
                          : "group-hover:text-orange-600"
                      } transition`}
                    >
                      {com.name}
                    </h3>
                    <p className="text-gray-600">{com.desc}</p>
                    <span
                      className={`inline-block mt-3 text-sm font-semibold ${
                        com.color === "blue"
                          ? "text-blue-600"
                          : "text-orange-600"
                      }`}
                    >
                      Join Now →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-cyan-300 to-cyan-400 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Start Your Nomad Journey?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Use our tools to find your perfect destination today
          </p>
          <a
            href="/destinations"
            className="inline-block bg-white text-gray-500 px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-50 transition"
          >
            Explore Destinations →
          </a>
        </section>
      </main>
    </div>
  );
};

export default Resource;