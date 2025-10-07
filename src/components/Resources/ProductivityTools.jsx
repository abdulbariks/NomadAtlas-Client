import { Clock } from "lucide-react";

export default function ProductivityTools() {
  const tools = [
    {
      name: "Notion",
      link: "https://www.notion.so/",
      logo: "https://www.notion.so/front-static/favicon.ico",
      desc: "All-in-one workspace to plan, write, and collaborate.",
    },
    {
      name: "Trello",
      link: "https://trello.com/",
      logo: "https://trello.com/favicon.ico",
      desc: "Visual task and project management for teams.",
    },
    {
      name: "Canva",
      link: "https://www.canva.com/",
      logo: "https://static.canva.com/static/images/apple-touch-icon.png",
      desc: "Create beautiful designs, graphics, and posts easily.",
    },
    {
      name: "Grammarly",
      link: "https://www.grammarly.com/",
      logo: "https://static.grammarly.com/assets/images/favicon-32x32.png",
      desc: "Check your grammar, spelling, and tone instantly.",
    },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-md p-10 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-8 h-8 text-purple-500" />
        <h2 className="text-3xl font-semibold bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">
          Productivity Tools
        </h2>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        {tools.map((tool, i) => (
          <a
            key={i}
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 border border-gray-100 rounded-xl hover:shadow-lg transition-all duration-200 flex flex-col items-center text-center"
          >
            <img src={tool.logo} alt={tool.name} className="w-14 h-14 mb-3" />
            <h3 className="text-lg font-semibold group-hover:text-purple-600 transition">
              {tool.name}
            </h3>
            <p className="text-gray-600 text-sm mt-1">{tool.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
