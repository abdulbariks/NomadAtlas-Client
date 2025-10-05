import CostTools from "../components/Resources/CostTools";
import WorkPlatforms from "../components/Resources/WorkPlatforms";

export default function Resources() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="text-center py-16 bg-gradient-to-r from-blue-100 to-indigo-100 shadow-sm">
        <h1 className="text-5xl font-bold mb-4">
          🌍 Resources for Digital Nomads
        </h1>
        <p className="text-lg text-gray-600">
          Find everything you need to plan, work, and live remotely — all in one
          place.
        </p>
      </header>

      <main className="space-y-16 max-w-6xl mx-auto px-6 py-16">
        <CostTools></CostTools>
        <WorkPlatforms></WorkPlatforms>
      </main>
    </div>
  );
}
