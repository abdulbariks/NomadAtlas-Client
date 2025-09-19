import React from "react";
import CountUp from "react-countup";

const IconGlobe = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 2a10 10 0 100 20 10 10 0 000-20z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12h20M12 2c2.5 3 3 7 3 10s-.5 7-3 10M5 6c2 3 5 5 7 6 2-1 5-3 7-6"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconUsers = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M16 11c1.657 0 3-1.567 3-3.5S17.657 4 16 4s-3 1.567-3 3.5S14.343 11 16 11zM8 11c1.657 0 3-1.567 3-3.5S9.657 4 8 4 5 5.567 5 7.5 6.343 11 8 11z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 20c0-2.5 3-4.5 6-4.5s6 2 6 4.5M18 20c0-2 1.5-3.5 3-3.5s3 1.5 3 3.5"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconStar = ({ className = "w-10 h-10" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path
      d="M12 .587l3.668 7.431L24 9.748l-6 5.848 1.416 8.264L12 19.771 4.584 23.86 6 15.596 0 9.748l8.332-1.73L12 .587z"
      stroke="currentColor"
      strokeWidth="0.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Milestones = () => {
  return (
    <div className="text-center mt-10 flex flex-col items-center px-4">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-extrabold">NomadAtlas — Quick Stats</h1>
        <p className="font-medium opacity-80 mt-3">
          Real city data and a thriving community — everything a nomad needs to
          pick the best place to live and work.
        </p>
      </div>

      <div className="mb-10 md:flex md:flex-row md:gap-6 md:mt-10 flex flex-col gap-6 mt-10 w-full max-w-6xl">
        <div className="flex-1 bg-white px-8 py-8 rounded-2xl flex flex-col gap-4 items-start shadow-sm">
          <div className="flex items-center gap-4">
            <div className="text-indigo-600">
              <IconGlobe className="w-12 h-12" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Cities Reviewed</div>
              <div className="text-4xl font-extrabold mt-1 text-gray-900">
                <CountUp
                  duration={3}
                  enableScrollSpy
                  scrollSpyDelay={200}
                  end={237}
                />
                +
              </div>
            </div>
          </div>
          <p className="text-gray-600">
            Curated and community-verified city profiles with cost, Wi-Fi and
            coworking data.
          </p>
        </div>

        <div className="flex-1 bg-white px-8 py-8 rounded-2xl flex flex-col gap-4 items-start shadow-sm">
          <div className="flex items-center gap-4">
            <div className="text-indigo-600">
              <IconUsers className="w-12 h-12" />
            </div>
            <div>
              <div className="text-sm text-gray-500">
                Nomad Community Members
              </div>
              <div className="text-4xl font-extrabold mt-1 text-gray-900">
                <CountUp
                  duration={3}
                  enableScrollSpy
                  scrollSpyDelay={200}
                  end={12840}
                />
                +
              </div>
            </div>
          </div>
          <p className="text-gray-600">
            Active nomads sharing local tips, speedtests and coworking reviews
            every day.
          </p>
        </div>

        <div className="flex-1 bg-white px-8 py-8 rounded-2xl flex flex-col gap-4 items-start shadow-sm">
          <div className="flex items-center gap-4">
            <div className="text-indigo-600">
              <IconStar className="w-12 h-12" />
            </div>
            <div>
              <div className="text-sm text-gray-500">Average Nomad Rating</div>
              <div className="flex items-baseline gap-3 mt-1">
                <div className="text-4xl font-extrabold text-gray-900">
                  <CountUp
                    duration={3}
                    enableScrollSpy
                    scrollSpyDelay={200}
                    end={4.6}
                    decimals={1}
                    decimal="."
                  />
                </div>
                <div className="text-sm text-gray-500">/ 5</div>
              </div>
            </div>
          </div>
          <p className="text-gray-600">
            Aggregate rating across cities based on connectivity, cost, safety
            and coworking facilities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Milestones;
