import { Plane } from "lucide-react";

export default function VisaInfo() {
  const visas = [
    {
      country: "Portugal",
      duration: "1 Year",
      desc: "Requires proof of remote income and health insurance.",
      link: "https://portaldascomunidades.mne.gov.pt",
    },
    {
      country: "Estonia",
      duration: "12 Months",
      desc: "For freelancers or employees of foreign companies.",
      link: "https://www.workinestonia.com/visa/",
    },
    {
      country: "Dubai (UAE)",
      duration: "1 Year",
      desc: "Work remotely while living in Dubai with tax-free benefits.",
      link: "https://www.visitdubai.com/en",
    },
  ];

  return (
    <section className="bg-white rounded-2xl shadow-md p-10 border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <Plane className="w-8 h-8 text-orange-500" />
        <h2 className="text-3xl font-semibold">Visa & Travel Info</h2>
      </div>
      <p className="text-gray-600 leading-relaxed text-lg mb-8">
        Countries offering digital nomad visas — stay longer, work freely, live
        globally.
      </p>

      <table className="w-full text-left border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="py-3 px-4">Country</th>
            <th className="py-3 px-4">Duration</th>
            <th className="py-3 px-4">Details</th>
            <th className="py-3 px-4">Link</th>
          </tr>
        </thead>
        <tbody>
          {visas.map((visa, i) => (
            <tr key={i} className="border-t">
              <td className="py-3 px-4 font-medium">{visa.country}</td>
              <td className="py-3 px-4">{visa.duration}</td>
              <td className="py-3 px-4 text-gray-600">{visa.desc}</td>
              <td className="py-3 px-4">
                <a
                  href={visa.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline font-medium"
                >
                  Visit →
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
