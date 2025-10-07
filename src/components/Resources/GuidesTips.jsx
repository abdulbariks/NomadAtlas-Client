import { BookOpen } from "lucide-react";

export default function GuidesTips() {
  const guides = [
    {
      name: "Nomad List Blog",
      link: "https://nomadlist.com/blog",
      logo: "https://cdn.worldvectorlogo.com/logos/nomad-list.svg",
      desc: "Read expert insights and real experiences from digital nomads around the world.",
    },
    {
      name: "Remote Year Guides",
      link: "https://www.remoteyear.com/blog",
      logo: "https://www.remoteyear.com/favicon.ico",
      desc: "Practical tips on remote work, travel safety, and productivity while working abroad.",
    },
    {
      name: "The Broke Backpacker",
      link: "https://www.thebrokebackpacker.com/",
      logo: "https://www.thebrokebackpacker.com/wp-content/uploads/2021/02/favicon.png",
      desc: "Budget-friendly travel guides and nomad hacks for freelancers and long-term travelers.",
    },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-md p-10 border border-gray-100">
      {/* Section Title + Description */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <BookOpen className="w-8 h-8 text-yellow-500" />
          <h2 className="text-3xl font-semibold bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent">
            Guides & Tips
          </h2>
        </div>
        <p className="text-gray-600 text-lg max-w-3xl">
          Explore trusted guides and expert tips from experienced digital
          nomads. Learn how to manage your budget, stay productive, and make the
          most out of your remote work journey.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 gap-8">
        {guides.map((guide, i) => (
          <a
            key={i}
            href={guide.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center bg-white"
          >
            <img
              src={guide.logo}
              alt={guide.name}
              className="w-14 h-14 mb-3 object-contain"
            />
            <h3 className="text-lg font-semibold group-hover:text-yellow-600 transition">
              {guide.name}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{guide.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
