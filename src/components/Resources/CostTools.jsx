// src/components/resources/CostTools.jsx
import { Globe } from "lucide-react";

export default function CostTools() {
  const tools = [
    {
      name: "Nomad List",
      link: "https://nomadlist.com",
      logo: "https://nomadlist.com/favicon.ico",
      desc: "Compare 250+ cities by cost, weather, safety, internet, and lifestyle for digital nomads.",
    },
    {
      name: "Numbeo",
      link: "https://numbeo.com/cost-of-living/",
      logo: "https://www.numbeo.com/favicon.ico",
      desc: "Real-time cost of living data from people around the world. Get updated insights daily.",
    },
    {
      name: "Expatistan",
      link: "https://www.expatistan.com/cost-of-living",
      logo: "https://www.expatistan.com/favicon.ico",
      desc: "Compare the cost of living between any two cities worldwide instantly.",
    },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-md p-10 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <Globe className="w-8 h-8 text-blue-500" />
        <h2 className="text-3xl font-semibold">Cost of Living Tools</h2>
      </div>
      <p className="text-gray-600 leading-relaxed text-lg mb-8">
        Estimate daily and monthly living costs before choosing your next
        destination.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool, i) => (
          <a
            key={i}
            href={tool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="border rounded-xl p-6 hover:shadow-lg transition bg-gray-50"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={tool.logo}
                alt={tool.name}
                className="w-8 h-8 rounded"
              />
              <h3 className="font-bold text-lg">{tool.name}</h3>
            </div>
            <p className="text-gray-600">{tool.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
