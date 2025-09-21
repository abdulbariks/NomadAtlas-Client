import React from "react";

const StarRating = ({ value = 4, size = 16 }) => {
  const full = Math.round(value);
  return (
    <div className="flex items-center" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={i < full ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1"
          className={`mr-0.5 ${i < full ? "text-blue-400" : "text-gray-300"}`}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.163c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.37 2.448c-.784.57-1.84-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.642 9.384c-.783-.57-.38-1.81.588-1.81h4.163a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
};

const Reviews = () => {
  return (
    <div>
      <div className="flex justify-center items-center mt-14">
        <h2 className="text-3xl mb-4 font-bold">
          What Nomads Say About NomadAtlas
        </h2>
      </div>

      <section className="flex flex-col md:flex-row md:flex-wrap lg:flex-nowrap gap-5 mb-16 items-center lg:items-stretch justify-center px-5 md:px-10 lg:px-20 py-10">
        <div className="flex flex-col w-full max-w-lg p-6 mx-auto bg-gray-100 rounded-lg shadow-sm">
          <div className="flex justify-between items-start pb-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop"
                alt="Alex Carter"
                className="object-cover w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-bold">Alex Carter</h4>
                <span className="text-xs text-gray-600">3 days ago</span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <StarRating value={5} />
              <span className="text-xs text-gray-500 mt-1">5 / 5</span>
            </div>
          </div>

          <div className="pt-4 space-y-2 text-sm text-gray-700">
            <p>
              NomadAtlas helped me find the perfect city with affordable living
              costs and reliable Wi-Fi.
            </p>
            <p>
              Now I can work remotely without worrying about poor connections or
              high expenses.
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full max-w-lg p-6 mx-auto bg-gray-100 rounded-lg shadow-sm">
          <div className="flex justify-between items-start pb-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=2080&auto=format&fit=crop"
                alt="Sophia Martinez"
                className="object-cover w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-bold">Sophia Martinez</h4>
                <span className="text-xs text-gray-600">21 hours ago</span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <StarRating value={4} />
              <span className="text-xs text-gray-500 mt-1">4 / 5</span>
            </div>
          </div>

          <div className="pt-4 space-y-2 text-sm text-gray-700">
            <p>
              I loved the coworking space recommendations. They were accurate
              and super helpful while traveling.
            </p>
            <p>
              A few cities need more updated cost data, but overall very useful!
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full max-w-lg p-6 mx-auto bg-gray-100 rounded-lg shadow-sm">
          <div className="flex justify-between items-start pb-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <img
                src="https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?q=80&w=1976&auto=format&fit=crop"
                alt="Daniel Lee"
                className="object-cover w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-bold">Daniel Lee</h4>
                <span className="text-xs text-gray-600">2 days ago</span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <StarRating value={5} />
              <span className="text-xs text-gray-500 mt-1">5 / 5</span>
            </div>
          </div>

          <div className="pt-4 space-y-2 text-sm text-gray-700">
            <p>
              The cost of living comparison feature is a life-saver. Helped me
              plan my budget in advance.
            </p>
            <p>NomadAtlas is now my go-to tool before moving to a new city.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Reviews;
