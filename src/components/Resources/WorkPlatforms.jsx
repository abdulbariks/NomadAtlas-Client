import { Briefcase } from "lucide-react";

export default function WorkPlatforms() {
  const jobsites = [
    {
      name: "Remote OK",
      link: "https://remoteok.com",
      logo: "https://remoteok.com/favicon-32x32.png",
      desc: "Find tech, design, and writing jobs from trusted remote-friendly companies.",
    },
    {
      name: "We Work Remotely",
      link: "https://weworkremotely.com",
      logo: "https://weworkremotely.com/favicon.ico",
      desc: "One of the largest remote job boards with thousands of active listings daily.",
    },
    {
      name: "FlexJobs",
      link: "https://flexjobs.com",
      logo: "https://www.flexjobs.com/favicon.ico",
      desc: "Curated flexible and remote jobs verified for quality and authenticity.",
    },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-md p-10 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="w-8 h-8 text-green-500" />
        <h2 className="text-3xl font-semibold">Remote Work Platforms</h2>
      </div>
      <p className="text-gray-600 leading-relaxed text-lg mb-8">
        Find your next remote job from trusted companies and global
        opportunities.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {jobsites.map((site, i) => (
          <a
            key={i}
            href={site.link}
            target="_blank"
            rel="noopener noreferrer"
            className="border rounded-xl p-6 hover:shadow-lg transition bg-gray-50"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={site.logo}
                alt={site.name}
                className="w-8 h-8 rounded"
              />
              <h3 className="font-bold text-lg">{site.name}</h3>
            </div>
            <p className="text-gray-600">{site.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
