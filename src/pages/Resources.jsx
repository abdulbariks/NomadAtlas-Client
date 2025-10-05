import {
  Globe,
  Briefcase,
  Plane,
  Home,
  Clock,
  BookOpen,
  Users,
} from "lucide-react";

export default function Resources() {
  const resources = [
    {
      title: "Cost of Living Tools",
      icon: <Globe className="w-8 h-8 text-blue-500" />,
      description:
        "Compare living costs in different cities with useful tools like Numbeo and NomadList.",
      link: "#",
    },
    {
      title: "Remote Work Platforms",
      icon: <Briefcase className="w-8 h-8 text-green-500" />,
      description:
        "Find your next remote job from trusted platforms like RemoteOK, FlexJobs, and We Work Remotely.",
      link: "#",
    },
    {
      title: "Visa & Travel Info",
      icon: <Plane className="w-8 h-8 text-orange-500" />,
      description:
        "Explore visa options and travel information for digital nomads and freelancers worldwide.",
      link: "#",
    },
    {
      title: "Accommodation Resources",
      icon: <Home className="w-8 h-8 text-pink-500" />,
      description:
        "Find affordable stays, coliving spaces, and short-term rentals with platforms like Airbnb and Hostelworld.",
      link: "#",
    },
    {
      title: "Productivity Tools",
      icon: <Clock className="w-8 h-8 text-purple-500" />,
      description:
        "Boost your productivity with tools like Notion, Trello, Grammarly, and Canva.",
      link: "#",
    },
    {
      title: "Guides & Tips",
      icon: <BookOpen className="w-8 h-8 text-yellow-500" />,
      description:
        "Learn travel hacks and read our latest blogs on living the remote lifestyle.",
      link: "#",
    },
    {
      title: "Community Help",
      icon: <Users className="w-8 h-8 text-cyan-500" />,
      description:
        "Join our community and connect with other remote workers to share your journey.",
      link: "#",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">🌍 Resources</h1>
        <p className="text-gray-600 text-lg">
          Everything you need to make your remote work and travel experience
          easier.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {resources.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-2xl transition duration-300 border border-gray-100"
          >
            <div className="flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 mb-4">{item.description}</p>
            <a
              href={item.link}
              className="text-blue-600 font-medium hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
