import { Users } from "lucide-react";

export default function CommunityHelp() {
  const communities = [
    {
      name: "Digital Nomads Around the World",
      link: "https://www.facebook.com/groups/digitalnomadsaroundtheworld/",
      logo: "https://cdn-icons-png.flaticon.com/512/124/124010.png",
      desc: "Join 150K+ members sharing nomad experiences and jobs.",
    },
    {
      name: "Reddit r/digitalnomad",
      link: "https://www.reddit.com/r/digitalnomad/",
      logo: "https://www.redditinc.com/favicon-32x32.png",
      desc: "Discussions about visas, destinations, and remote work life.",
    },
    {
      name: "Nomad List Community",
      link: "https://nomadlist.com/chat",
      logo: "https://cdn.worldvectorlogo.com/logos/nomad-list.svg",
      desc: "Chat live with global nomads and get instant advice.",
    },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-md p-10 border border-gray-100">
      {/* Section Title + Description */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Users className="w-8 h-8 text-cyan-500" />
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-400 bg-clip-text text-transparent">
            Community Help
          </h2>
        </div>
        <p className="text-gray-600 text-lg max-w-3xl">
          Stay connected with people who live and work like you. Join global
          digital nomad communities, ask questions, share experiences, and get
          real advice from fellow remote workers around the world.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 gap-8">
        {communities.map((com, i) => (
          <a
            key={i}
            href={com.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
          >
            <img
              src={com.logo}
              alt={com.name}
              className="w-14 h-14 mb-3 object-contain"
            />
            <h3 className="text-lg font-semibold group-hover:text-cyan-600 transition">
              {com.name}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{com.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
