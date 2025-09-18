import React, { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { GoCommentDiscussion } from "react-icons/go";
import { Link } from "react-router";

const cities = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    image: "https://etimg.etb2bimg.com/photo/115997634.cms",
    description:
      "Bali is a tropical paradise famous for its beaches, rice terraces, and vibrant culture – perfect for digital nomads.",
  },
  {
    id: 2,
    name: "Lisbon",
    country: "Portugal",
    image:
      "https://en.kampaoh.com/wp-content/uploads/2024/06/SPAIN-2024-06-20T134315.647.jpg",
    description:
      "Lisbon offers beautiful coastal views, rich history, and a thriving remote work community with cafes and coworking spaces.",
  },
  {
    id: 3,
    name: "Chiang Mai",
    country: "Thailand",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/03/1c/60/caption.jpg?w=600&h=-1&s=1",
    description:
      "Chiang Mai is a peaceful city surrounded by mountains, with affordable living and a popular hub for digital nomads.",
  },
  {
    id: 4,
    name: "Barcelona",
    country: "Spain",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTtT5DSgEEG4zvsjaUcJhWomlM8W_IkxP7Ed08rXNw6B-JOb3XVBtP1oPKzbuUIvh61Ss&usqp=CAU",
    description:
      "Barcelona combines vibrant city life, stunning architecture, and Mediterranean beaches – a great spot for remote work and leisure.",
  },
  {
    id: 5,
    name: "Tbilisi",
    country: "Georgia",
    image:
      "https://rodinistanbul.com/wp-content/uploads/2023/04/day-trips-from-istanbul-copy-1024x576.jpg",
    description:
      "Tbilisi is known for its charming old town, affordable living, and growing coworking community for digital nomads.",
  },
];

//city posts
const cityPosts = [
  {
    id: 1,
    author: "Reza",
    avatar: "https://i.pravatar.cc/64?img=1",
    title: "Working from Bali 🌴",
    content:
      "Bali has been amazing for remote work. Great coworking spaces and friendly community.",
    tags: ["Bali", "Asia", "BeachLife"],
    likes: 120,
    comments: 30,
    timestamp: "2025-09-01T10:00:00Z",
    image: "https://etimg.etb2bimg.com/photo/115997634.cms",
    location: "Bali, Indonesia",
  },
  {
    id: 2,
    author: "Aisha",
    avatar: "https://i.pravatar.cc/64?img=2",
    title: "Bali’s Cafes are Perfect for Work ☕",
    content:
      "Every morning I sit in a cozy café near the beach and finish my work with a fresh coconut juice.",
    tags: ["Bali", "RemoteWork"],
    likes: 89,
    comments: 18,
    timestamp: "2025-09-03T09:15:00Z",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    location: "Bali, Indonesia",
  },
  {
    id: 3,
    author: "Imran",
    avatar: "https://i.pravatar.cc/64?img=3",
    title: "Affordable Living in Bali",
    content:
      "Accommodation is cheap compared to Europe. Great place if you want both peace and fun.",
    tags: ["Bali", "BudgetTravel"],
    likes: 72,
    comments: 10,
    timestamp: "2025-09-04T12:45:00Z",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    location: "Bali, Indonesia",
  },

  {
    id: 4,
    author: "Fatima",
    avatar: "https://i.pravatar.cc/64?img=4",
    title: "Lisbon is a Digital Nomad Hub 🇵🇹",
    content:
      "Lisbon is affordable, safe, and vibrant. It has quickly become my favorite work destination.",
    tags: ["Lisbon", "Europe", "Nomad"],
    likes: 98,
    comments: 22,
    timestamp: "2025-09-02T14:20:00Z",
    image:
      "https://en.kampaoh.com/wp-content/uploads/2024/06/SPAIN-2024-06-20T134315.647.jpg",
    location: "Lisbon, Portugal",
  },
  {
    id: 5,
    author: "Karim",
    avatar: "https://i.pravatar.cc/64?img=5",
    title: "Evenings in Lisbon 🌅",
    content:
      "The sunset view near the Tagus River is mind-blowing. Perfect way to end a workday.",
    tags: ["Lisbon", "RemoteLife"],
    likes: 67,
    comments: 12,
    timestamp: "2025-09-03T18:30:00Z",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad",
    location: "Lisbon, Portugal",
  },
  {
    id: 6,
    author: "Nabila",
    avatar: "https://i.pravatar.cc/64?img=6",
    title: "Lisbon Coworking Spaces",
    content:
      "Coworking spaces here are modern and filled with international freelancers. Great vibe!",
    tags: ["Lisbon", "Work"],
    likes: 83,
    comments: 19,
    timestamp: "2025-09-05T10:00:00Z",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    location: "Lisbon, Portugal",
  },

  {
    id: 7,
    author: "Rafi",
    avatar: "https://i.pravatar.cc/64?img=7",
    title: "Life in Chiang Mai",
    content:
      "Cheap food, friendly people, and so many fellow remote workers. Feels like home!",
    tags: ["Thailand", "ChiangMai", "NomadLife"],
    likes: 105,
    comments: 28,
    timestamp: "2025-09-06T11:00:00Z",
    image:
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/30/03/1c/60/caption.jpg",
    location: "Chiang Mai, Thailand",
  },
  {
    id: 8,
    author: "Samiha",
    avatar: "https://i.pravatar.cc/64?img=8",
    title: "Chiang Mai’s Night Markets",
    content:
      "Every night you can explore unique markets with delicious food and handmade goods.",
    tags: ["ChiangMai", "Thailand"],
    likes: 77,
    comments: 16,
    timestamp: "2025-09-07T15:30:00Z",
    image: "https://images.unsplash.com/photo-1554048612-b6a482bc67f7",
    location: "Chiang Mai, Thailand",
  },
  {
    id: 9,
    author: "Farhan",
    avatar: "https://i.pravatar.cc/64?img=9",
    title: "Working in Chiang Mai Cafes",
    content:
      "Internet speed is great and coffee shops are everywhere. A true digital nomad paradise.",
    tags: ["ChiangMai", "Work"],
    likes: 88,
    comments: 14,
    timestamp: "2025-09-08T09:40:00Z",
    image: "https://images.unsplash.com/photo-1470123808288-1e59739d9357",
    location: "Chiang Mai, Thailand",
  },

  {
    id: 10,
    author: "Ayaan",
    avatar: "https://i.pravatar.cc/64?img=10",
    title: "Barcelona Beach Vibes 🏖️",
    content:
      "After work I head straight to the beach. Barcelona is the perfect mix of work and fun.",
    tags: ["Barcelona", "Spain"],
    likes: 140,
    comments: 32,
    timestamp: "2025-09-09T16:15:00Z",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTtT5DSgEEG4zvsjaUcJhWomlM8W_IkxP7Ed08rXNw6B-JOb3XVBtP1oPKzbuUIvh61Ss",
    location: "Barcelona, Spain",
  },
  {
    id: 11,
    author: "Hafsa",
    avatar: "https://i.pravatar.cc/64?img=11",
    title: "Architecture in Barcelona",
    content:
      "The Gaudí buildings are breathtaking. Walking through the city feels like art.",
    tags: ["Barcelona", "Culture"],
    likes: 92,
    comments: 20,
    timestamp: "2025-09-10T12:30:00Z",
    image: "https://images.unsplash.com/photo-1505735457844-1f5a361a99b3",
    location: "Barcelona, Spain",
  },
  {
    id: 12,
    author: "Mahin",
    avatar: "https://i.pravatar.cc/64?img=12",
    title: "Barcelona Coworking Spaces",
    content:
      "Startups and freelancers are everywhere. Barcelona has one of the best coworking cultures.",
    tags: ["Barcelona", "Work"],
    likes: 75,
    comments: 13,
    timestamp: "2025-09-11T10:00:00Z",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156",
    location: "Barcelona, Spain",
  },

  {
    id: 13,
    author: "Noor",
    avatar: "https://i.pravatar.cc/64?img=13",
    title: "Tbilisi Old Town Charm",
    content:
      "The narrow streets, churches, and history here make it a magical city to live in.",
    tags: ["Tbilisi", "Georgia"],
    likes: 88,
    comments: 17,
    timestamp: "2025-09-12T14:00:00Z",
    image:
      "https://rodinistanbul.com/wp-content/uploads/2023/04/day-trips-from-istanbul-copy-1024x576.jpg",
    location: "Tbilisi, Georgia",
  },
  {
    id: 14,
    author: "Anas",
    avatar: "https://i.pravatar.cc/64?img=14",
    title: "Affordable Life in Tbilisi",
    content:
      "Food and housing are cheaper compared to Europe. Great place for remote workers.",
    tags: ["Tbilisi", "BudgetLife"],
    likes: 64,
    comments: 11,
    timestamp: "2025-09-13T11:45:00Z",
    image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf",
    location: "Tbilisi, Georgia",
  },
  {
    id: 15,
    author: "Sadia",
    avatar: "https://i.pravatar.cc/64?img=15",
    title: "Tbilisi Coworking Spaces",
    content: "Small but growing. Many startups are opening offices here.",
    tags: ["Tbilisi", "Work"],
    likes: 55,
    comments: 9,
    timestamp: "2025-09-14T09:20:00Z",
    image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba",
    location: "Tbilisi, Georgia",
  },
];

const CityDiscovery = () => {
  const [selectedCity, setSelectedCity] = useState("Bali");

  const findSelectedCity = cities.find((city) => city.name === selectedCity);

  //   filtering  seletected city releted community posts
  const filterSelectedCityPosts = cityPosts.filter((cityPost) =>
    cityPost.location.includes(selectedCity)
  );

  return (
    <div className="max-w-7xl mx-auto">
      <section className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Discover Cities for Remote Work
        </h2>

        {/* Filter / City Buttons */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {cities.map((city) => (
            <button
              key={city.id}
              onClick={() => setSelectedCity(city.name)}
              className={`px-4 py-2 rounded-full border transition-all cursor-pointer ${
                selectedCity === city.name
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-blue-100"
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border rounded-lg p-4 bg-gray-50">
          {/* Preview Card */}

          <div>
            <h1 className="text-2xl font-bold text-center mb-5">
              The City <span className="text-blue-500">{selectedCity}</span>
            </h1>
            <div className="flex items-start justify-center">
              {findSelectedCity && (
                <div className="w-full bg-white shadow-md hover:shadow-lg rounded-lg overflow-hidden border transition">
                  <img
                    src={findSelectedCity.image}
                    alt={findSelectedCity.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {findSelectedCity.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      {findSelectedCity.country}
                    </p>
                    <p className="mt-3 text-gray-700 text-sm leading-relaxed">
                      {findSelectedCity.description}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Related Posts */}
          <div>
            <h1 className="text-2xl font-bold text-center">
              Posts about <span className="text-blue-400">{selectedCity}</span>
            </h1>
            <p className="text-center mb-5">
              These posts might help you to know well and make disicion about
              this city
            </p>
            {filterSelectedCityPosts.length > 0 ? (
              <div className="p-2 space-y-4">
                {filterSelectedCityPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-lg shadow hover:shadow-md transition border flex flex-col sm:flex-row overflow-hidden"
                  >
                    {/* post image */}
                    <div className="sm:w-1/3">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* post contents */}
                    <div className="p-4 flex flex-col justify-between sm:w-2/3">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <img
                            src={post.avatar}
                            alt={post.author}
                            className="w-8 h-8 rounded-full border"
                          />
                          <h4 className="font-semibold text-gray-800">
                            {post.author}
                          </h4>
                        </div>

                        <h3 className="font-semibold text-gray-900 line-clamp-1">
                          {post.title}
                        </h3>
                        {/* post's content */}
                        {/* <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                          {post.content.slice(0, 100)}...
                        </p> */}
                        <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                          {post.content.length > 80 ? (
                            <>
                              {post.content.slice(0, 80)}...{" "}
                              <Link className="text-blue-600 underline ml-1">
                                See more
                              </Link>
                            </>
                          ) : (
                            post.content
                          )}
                        </p>
                      </div>

                      {/* like/comment count */}
                      <div className="flex items-center justify-between text-gray-500 text-xs mt-3">
                        <div className="flex items-center gap-1">
                          <AiOutlineLike className="h-4 w-4 text-gray-600" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GoCommentDiscussion className="h-4 w-4 text-gray-600" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h1 className="text-center mt-6 text-gray-500 font-medium">
                No posts found for this city
              </h1>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CityDiscovery;
