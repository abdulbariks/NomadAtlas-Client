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
import Spinner from "../components/Spinner/Spinner";

const ICONS = {
  Calculator,
  Map,
  Users,
  Briefcase,
  BookOpen,
  Globe,
  Plane,
  Zap,
  MessageCircle,
};

const Resource = () => {
  const internalTools = [
    {
      name: "Cost Calculator",
      icon: "Calculator",
      link: "/cost-calculator",
      desc: "Calculate your budget and find cities that match your spending limit",
      color: "cyan",
    },
    {
      name: "City Comparison",
      icon: "Map",
      link: "/comparison",
      desc: "Compare multiple destinations by cost, wifi, safety, and lifestyle",
      color: "sky",
    },
    {
      name: "Community Forum",
      icon: "Users",
      link: "/community",
      desc: "Connect with fellow nomads, share experiences and get advice",
      color: "lightblue",
    },
  ];

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await fetch("https://nomad-atlas-server-one.vercel.app/api/resources");
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

  if (loading) return <Spinner></Spinner>;

  const jobPlatforms = resources.filter((r) => r.type === "job");
  const productivityTools = resources.filter((r) => r.type === "productivity");
  const visaResources = resources.filter((r) => r.type === "visa");
  const communities = resources.filter((r) => r.type === "community");

  const getColorClasses = (color) => {
    const colors = {
      cyan: "from-cyan-100 to-sky-100 text-gray-700",
      sky: "from-sky-100 to-cyan-100 text-gray-700",
      lightblue: "from-blue-50 to-cyan-50 text-gray-700",
    };
    return colors[color] || colors.cyan;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white mt-10">
      {/* Hero Section */}
      <header className="text-center py-16 px-4 bg-gradient-to-r from-sky-100 to-cyan-100 text-gray-800">
        <Globe className="w-16 h-16 mx-auto mb-4 text-sky-600" />
        <h1 className="text-5xl font-bold mb-4">Resources for Digital Nomads</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Everything you need to plan, work, and thrive as a digital nomad — all in one place.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16 space-y-20">
        {/* OUR PLATFORM TOOLS */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gray-800">🚀 Our Platform Tools</h2>
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
                  )} rounded-2xl transition duration-300 hover:scale-105 border border-cyan-100 hover:border-cyan-300`}
                >
                  <div className="absolute top-4 right-4 opacity-10">
                    <Icon className="w-24 h-24" />
                  </div>
                  <Icon className="w-12 h-12 mb-4 text-sky-500" />
                  <h3 className="text-2xl font-bold mb-3">{tool.name}</h3>
                  <p className="text-gray-600">{tool.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-600">
                    Try Now →
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* NOMAD GUIDES */}
        <section className="bg-gradient-to-br from-sky-50 to-cyan-50 rounded-3xl p-12 border border-sky-100">
          <div className="flex items-center gap-4 mb-8">
            <BookOpen className="w-10 h-10 text-sky-500" />
            <h2 className="text-4xl font-bold text-gray-800">Nomad Guides & Tips</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              "How to Choose Your Next Destination",
              "Digital Nomad Visa Guide 2025",
              "Budget Planning for Nomads",
              "Safety Tips for Remote Workers",
            ].map((title, i) => (
              <a
                key={i}
                href="/blogs"
                className="bg-white p-6 rounded-xl border border-cyan-100 hover:border-cyan-300 transition duration-300 hover:scale-105"
              >
                <h3 className="text-xl font-bold mb-2 hover:text-sky-600">
                  {title}
                </h3>
                <p className="text-gray-600">
                  {i === 0
                    ? "Expert tips on finding the perfect city for your lifestyle and budget"
                    : i === 1
                      ? "Complete visa information for popular nomad destinations"
                      : i === 2
                        ? "Smart money management tips for long-term travel"
                        : "Stay safe while working and traveling abroad"}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* REMOTE WORK PLATFORMS */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <Briefcase className="w-10 h-10 text-sky-500" />
            <h2 className="text-4xl font-bold text-gray-800">Find Remote Work</h2>
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
                className="bg-white rounded-xl p-6 border border-cyan-100 hover:border-cyan-300 transition duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img src={platform.logo} alt={platform.name} className="w-10 h-10" />
                  <h3 className="font-bold hover:text-sky-600 text-lg">{platform.name}</h3>
                </div>
                <p className="text-gray-600">{platform.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* PRODUCTIVITY TOOLS */}
        <section className="bg-white rounded-3xl p-12">
          <div className="flex items-center gap-4 mb-8">
            <Zap className="w-10 h-10 text-sky-400" />
            <h2 className="text-4xl font-bold text-gray-800">Productivity Tools</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {productivityTools.map((tool, i) => (
              <a
                key={i}
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-xl border border-cyan-100 hover:border-cyan-300 transition duration-300 hover:scale-105 text-center"
              >
                <img src={tool.logo} alt={tool.name} className="w-12 h-12 mx-auto mb-3" />
                <h3 className="font-bold hover:text-sky-600 text-lg mb-2">{tool.name}</h3>
                <p className="text-gray-600 text-sm">{tool.desc}</p>
              </a>
            ))}
          </div>
        </section>

        {/* VISA RESOURCES */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <Plane className="w-10 h-10 text-sky-400" />
            <h2 className="text-4xl font-bold text-gray-800">Digital Nomad Visas</h2>
          </div>
          <p className="text-gray-600 text-lg mb-8">
            Official visa information and application links for digital nomad visas worldwide
          </p>
          <div className="bg-white rounded-2xl overflow-hidden border border-cyan-100">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-sky-100">
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
                    <tr key={i} className="hover:bg-sky-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{visa.flag}</span>
                          <span className="font-semibold text-gray-800">
                            {visa.country}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{visa.visaType}</td>
                      <td className="px-6 py-4 text-gray-600">{visa.duration}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sky-500 font-semibold text-sm">
                          {visa.income}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={visa.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sky-500 hover:text-cyan-600 hover:underline font-semibold text-sm transition"
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

        {/* COMMUNITY */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <MessageCircle className="w-10 h-10 text-sky-500" />
            <h2 className="text-4xl font-bold text-gray-800">Join Communities</h2>
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
                className="bg-white border border-cyan-100 hover:border-cyan-300 rounded-xl p-8 transition duration-300 hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={com.icon}
                    alt={com.name}
                    className="w-14 h-14 object-cover group-hover:scale-110 transition-transform"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-xl mb-2 hover:text-sky-600 transition">
                      {com.name}
                    </h3>
                    <p className="text-gray-600">{com.desc}</p>
                    <span className="inline-block mt-3 text-sm font-semibold text-sky-500">
                      Join Now →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-sky-100 to-cyan-100 rounded-3xl p-12 text-center text-gray-800 border border-sky-200">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Nomad Journey?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Use our tools to find your perfect destination today
          </p>
          <a
            href="/destinations"
            className="inline-block bg-sky-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-sky-600 transition"
          >
            Explore Destinations →
          </a>
        </section>
      </main>
    </div>
  );
};

export default Resource;
