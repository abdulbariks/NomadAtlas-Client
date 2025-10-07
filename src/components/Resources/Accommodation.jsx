import { Home } from "lucide-react";

export default function Accommodation() {
  const stays = [
    {
      name: "Airbnb",
      link: "https://www.airbnb.com/",
      logo: "https://a0.muscache.com/airbnb/static/logotype_globe.png",
      desc: "Find comfortable short-term rentals, apartments, and unique stays in over 190 countries. Ideal for nomads who prefer privacy and a homely feel.",
    },
    {
      name: "Hostelworld",
      link: "https://www.hostelworld.com/",
      logo: "https://www.hostelworld.com/favicon-32x32.png",
      desc: "Explore budget-friendly hostels, meet other travelers, and enjoy community living experiences perfect for solo or budget nomads.",
    },
    {
      name: "Nomad Stays",
      link: "https://www.nomadstays.com/",
      logo: "https://www.nomadstays.com/favicon-32x32.png",
      desc: "Discover curated coliving and coworking accommodations tailored specifically for remote workers and digital nomads.",
    },
  ];

  return (
    <section className="bg-white rounded-3xl shadow-md p-10 border border-gray-100 mb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Home className="w-9 h-9 text-pink-500" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            Accommodation Resources
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl">
          Finding the right place to stay is one of the most important parts of
          the nomad journey. Here are some trusted platforms where you can find
          affordable, comfortable, or luxury stays depending on your travel
          goals and budget.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {stays.map((stay, i) => (
          <a
            key={i}
            href={stay.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block border border-gray-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50"
          >
            <div className="flex items-start gap-6">
              <img
                src={stay.logo}
                alt={stay.name}
                className="w-16 h-16 object-contain rounded-xl border border-gray-200"
              />
              <div>
                <h3 className="text-2xl font-semibold group-hover:text-pink-600 transition">
                  {stay.name}
                </h3>
                <p className="text-gray-600 mt-2 text-base">{stay.desc}</p>
                <a
                  target="_blank"
                  href={stay.link}
                  className="text-sm text-pink-600 mt-3 font-medium"
                >
                  Visit →
                </a>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
