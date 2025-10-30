// // src/pages/Community/CommunityPage.jsx
// import React, { useState } from "react";
// import ChatSection from "./ChatSection";

// export default function CommunityPage() {
//     const [activeTab, setActiveTab] = useState("chat");

//     return (
//         <div className="max-w-4xl mx-auto p-6">
//             <h1 className="text-2xl font-bold mb-4">Nomad Atlas Community</h1>

//             <div className="flex gap-2 mb-4">
//                 <button
//                     className={`px-3 py-1 rounded ${activeTab === "chat" ? "bg-teal-600 text-white" : "bg-gray-200"}`}
//                     onClick={() => setActiveTab("chat")}
//                 >
//                     Chat
//                 </button>
//                 <button
//                     className={`px-3 py-1 rounded ${activeTab === "posts" ? "bg-teal-600 text-white" : "bg-gray-200"}`}
//                     onClick={() => setActiveTab("posts")}
//                 >
//                     Posts (coming soon)
//                 </button>
//             </div>

//             {activeTab === "chat" ? <ChatSection /> : <div>Posts will be implemented after chat.</div>}
//         </div>
//     );
// }







// const posts = [
//   {
//     id: 1,
//     name: "Bali, Indonesia",
//     image:
//       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
//     description:
//       "Bali is a hub for digital nomads with affordable living, co-working spaces, and a vibrant culture.",
//     author: "Sarah K.",
//     avatar: "https://i.pravatar.cc/150?img=1",
//     likes: 234,
//     comments: 45,
//     category: "Destination Guide",
//     trending: true,
//     nomadCount: 1200,
//     fullStory: `
//       <h2>Welcome to Bali - Digital Nomad Paradise</h2>
//       <p>Bali has become one of the most popular destinations for digital nomads worldwide. The island offers an incredible blend of affordability, modern amenities, and rich cultural experiences that make it perfect for remote workers.</p>
      
//       <h3>Cost of Living</h3>
//       <p>One of Bali's biggest attractions is its affordable cost of living. You can find comfortable accommodation for $300-800 per month, enjoy delicious meals for $2-5, and access high-quality coworking spaces for around $50-150 monthly.</p>
      
//       <h3>Coworking Spaces</h3>
//       <p>Bali is home to numerous excellent coworking spaces. Popular options include Dojo Bali in Canggu, Hubud in Ubud, and Outpost in various locations. These spaces offer fast internet, comfortable workstations, and great networking opportunities.</p>
      
//       <h3>Community</h3>
//       <p>The digital nomad community in Bali is thriving and welcoming. Regular meetups, workshops, and social events make it easy to connect with like-minded professionals from around the world.</p>
      
//       <h3>Best Areas</h3>
//       <ul>
//         <li><strong>Canggu:</strong> Popular with surfers and young nomads, vibrant nightlife</li>
//         <li><strong>Ubud:</strong> Cultural center, peaceful atmosphere, great for focus work</li>
//         <li><strong>Seminyak:</strong> More upscale, beach clubs and restaurants</li>
//         <li><strong>Sanur:</strong> Quieter, family-friendly, good for long-term stays</li>
//       </ul>
      
//       <h3>Visa Information</h3>
//       <p>Indonesia offers a B211A visa that allows you to stay for 60 days with possible extensions up to 180 days. The process is straightforward and can be done through visa agents on the island.</p>
      
//       <h3>Tips for Success</h3>
//       <p>Consider the rainy season (November-March), rent a scooter for easy transportation, learn basic Indonesian phrases, and be respectful of local customs and ceremonies. Bali offers an incredible quality of life for digital nomads willing to embrace its unique culture.</p>
//     `,
//   },
//   {
//     id: 2,
//     name: "Chiang Mai, Thailand",
//     image:
//       "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?q=80&w=1200&auto=format&fit=crop",
//     description:
//       "A peaceful city with low living costs, strong nomad culture, and amazing food.",
//     author: "Emily R.",
//     avatar: "https://i.pravatar.cc/150?img=3",
//     likes: 312,
//     comments: 67,
//     category: "Hidden Gem",
//     trending: true,
//     nomadCount: 950,
//     fullStory: `
//       <h2>Chiang Mai - Thailand's Digital Nomad Capital</h2>
//       <p>Chiang Mai has long been a favorite among digital nomads, offering an unbeatable combination of low costs, excellent infrastructure, and a welcoming community.</p>
      
//       <h3>Why Choose Chiang Mai?</h3>
//       <p>This northern Thai city provides everything a digital nomad needs: fast internet, affordable living, delicious food, and a supportive community. The city maintains a perfect balance between modern amenities and traditional Thai culture.</p>
      
//       <h3>Cost Breakdown</h3>
//       <p>Accommodation: $200-500/month for a comfortable apartment. Food: $1-3 per meal at local restaurants. Coworking: $50-100/month. Transportation: $0.50 per ride on red songthaews (shared taxis).</p>
      
//       <h3>Best Neighborhoods</h3>
//       <p>Nimman is the digital nomad hub with cafes and coworking spaces. Old City offers cultural immersion and temples. Santitham is quieter and more local. Riverside provides scenic views and peaceful living.</p>
      
//       <h3>Weather & Best Time</h3>
//       <p>November to February offers cool, pleasant weather (15-25°C). March to May is hot season (30-40°C). June to October brings rain but fewer tourists and lower prices.</p>
      
//       <h3>Community Events</h3>
//       <p>Chiang Mai hosts regular nomad meetups, workshops, and conferences. The community is mature, helpful, and easy to integrate into.</p>
//     `,
//   },
//   {
//     id: 3,
//     name: "Porto, Portugal",
//     image:
//       "https://images.unsplash.com/photo-1569959220744-ff553533f492?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=2064",
//     description:
//       "Smaller than Lisbon but charming — Porto has good cafes, coworking spots, and lower rents.",
//     author: "Ana S.",
//     avatar: "https://i.pravatar.cc/150?img=6",
//     likes: 142,
//     comments: 18,
//     category: "Hidden Gem",
//     trending: false,
//     nomadCount: 430,
//     fullStory: `
//       <h2>Porto - Portugal's Hidden Gem</h2>
//       <p>Porto offers all the benefits of Lisbon without the crowds and high prices. This charming coastal city combines old-world European charm with modern digital nomad infrastructure.</p>
      
//       <h3>Living Costs</h3>
//       <p>Porto is approximately 30-40% cheaper than Lisbon. Expect to pay €400-700 for a one-bedroom apartment, €8-15 for restaurant meals, and €5-10 for cafe work sessions.</p>
      
//       <h3>Work Environment</h3>
//       <p>The city has a growing number of coworking spaces and cafes with reliable WiFi. Popular spots include BWORK, Selina Porto, and numerous independent cafes in the Ribeira and Cedofeita neighborhoods.</p>
      
//       <h3>Quality of Life</h3>
//       <p>Porto boasts beautiful architecture, proximity to beaches, excellent public transportation, and a thriving food scene. The pace of life is relaxed yet productive.</p>
      
//       <h3>Getting Around</h3>
//       <p>Porto has an efficient metro system, buses, and trams. The city center is walkable, and bike-sharing programs are available. A monthly transport pass costs around €40.</p>
//     `,
//   },
//   {
//     id: 4,
//     name: "Bangkok, Thailand",
//     image:
//       "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop",
//     description:
//       "Big city convenience, excellent food, and many coworking options — good internet in many areas.",
//     author: "Nok K.",
//     avatar: "https://i.pravatar.cc/150?img=7",
//     likes: 198,
//     comments: 35,
//     category: "City Spotlight",
//     trending: true,
//     nomadCount: 1490,
//     fullStory: `
//       <h2>Bangkok - Urban Digital Nomad Hub</h2>
//       <p>Bangkok combines the energy of a major Asian metropolis with excellent digital nomad infrastructure. The city offers unparalleled convenience, diverse neighborhoods, and world-class amenities.</p>
      
//       <h3>Neighborhoods</h3>
//       <p>Sukhumvit is the expat central with malls and nightlife. Ari offers a hipster vibe with trendy cafes. Silom is the business district with excellent transport links. Thonglor provides upscale living and dining.</p>
      
//       <h3>Coworking Scene</h3>
//       <p>Bangkok has hundreds of coworking spaces, from budget-friendly to premium options. Popular choices include HUBBA, Launchpad, and WeWork locations throughout the city.</p>
      
//       <h3>Food Paradise</h3>
//       <p>Street food from $1-2, mid-range restaurants $5-10, and high-end dining at a fraction of Western prices. The variety is endless, from traditional Thai to international cuisine.</p>
      
//       <h3>Transportation</h3>
//       <p>BTS Skytrain and MRT metro make getting around easy. Grab (like Uber) is affordable and convenient. Traffic can be heavy, so plan accordingly.</p>
//     `,
//   },
//   {
//     id: 5,
//     name: "Prague, Czechia",
//     image:
//       "https://images.unsplash.com/photo-1729318227224-59340006ce6a?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1311",
//     description:
//       "A picturesque city with reliable internet and a friendly nomad community — good value in Europe.",
//     author: "Petr V.",
//     avatar: "https://i.pravatar.cc/150?img=8",
//     likes: 123,
//     comments: 14,
//     category: "Destination Guide",
//     trending: false,
//     nomadCount: 390,
//     fullStory: `
//       <h2>Prague - European Fairy Tale</h2>
//       <p>Prague combines stunning medieval architecture with modern amenities and reasonable costs for Europe. It's an ideal base for exploring Central Europe while maintaining a productive work-life balance.</p>
      
//       <h3>Cost of Living</h3>
//       <p>More affordable than Western Europe. Apartments: €500-900/month, meals: €5-12, beer: €2-3. Public transport is excellent and cheap at €20/month.</p>
      
//       <h3>Internet & Coworking</h3>
//       <p>Prague has excellent internet infrastructure and a growing coworking scene. Popular spaces include Impact Hub, Locus Workspace, and Loft.</p>
      
//       <h3>Culture & Lifestyle</h3>
//       <p>Rich history, beautiful architecture, world-class beer culture, and four distinct seasons. The city is safe, walkable, and has a vibrant cultural scene.</p>
      
//       <h3>Central Location</h3>
//       <p>Perfect for exploring Europe with cheap flights and buses to major cities. Weekend trips to Vienna, Budapest, Berlin, and other destinations are easy and affordable.</p>
//     `,
//   },
//   {
//     id: 6,
//     name: "Buenos Aires, Argentina",
//     image:
//       "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
//     description:
//       "Great culture, nightlife and affordable living — internet can vary by neighborhood but many good spots exist.",
//     author: "Lucia R.",
//     avatar: "https://i.pravatar.cc/150?img=9",
//     likes: 157,
//     comments: 21,
//     category: "City Spotlight",
//     trending: false,
//     nomadCount: 540,
//     fullStory: `
//       <h2>Buenos Aires - Latin American Cultural Capital</h2>
//       <p>Buenos Aires offers European elegance with Latin American energy. The city is known for its vibrant culture, incredible food scene, and passionate nightlife.</p>
      
//       <h3>Affordability</h3>
//       <p>Very affordable for USD and EUR earners. Apartments: $300-600/month, excellent steaks: $10-15, wine: $3-5 per bottle. The favorable exchange rate makes it a budget-friendly option.</p>
      
//       <h3>Neighborhoods to Consider</h3>
//       <p>Palermo is the trendy district with cafes and coworking spaces. Recoleta offers upscale living and museums. San Telmo has bohemian vibes and Sunday markets. Puerto Madero is modern and waterfront.</p>
      
//       <h3>Cultural Experience</h3>
//       <p>Tango shows, soccer culture, world-class museums, and an incredible cafe culture. The city has a distinct personality and passionate locals.</p>
      
//       <h3>Important Notes</h3>
//       <p>Internet quality varies by neighborhood - research before choosing accommodation. The city operates on late schedules - dinner starts at 10 PM. Spanish language skills are very helpful as English is less common than in other major cities.</p>
//     `,
//   },
//   {
//     id: 7,
//     name: "Mexico City, Mexico",
//     image:
//       "https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1170",
//     description:
//       "Vast city with creative communities, good cafes, and plenty to explore — strong digital nomad scene.",
//     author: "Sofia L.",
//     avatar: "https://i.pravatar.cc/150?img=11",
//     likes: 165,
//     comments: 24,
//     category: "City Spotlight",
//     trending: true,
//     nomadCount: 760,
//     fullStory: `
//       <h2>Mexico City - Emerging Nomad Hotspot</h2>
//       <p>CDMX (Ciudad de México) has exploded in popularity among digital nomads. This massive metropolis offers incredible food, rich culture, and a rapidly growing remote work scene.</p>
      
//       <h3>Best Areas</h3>
//       <p>Roma and Condesa are the nomad epicenters - tree-lined streets, cafes, and coworking spaces. Polanco is upscale and modern. Coyoacán offers artistic vibes and Frida Kahlo's museum.</p>
      
//       <h3>Living Costs</h3>
//       <p>Moderate for a major capital. Apartments in Roma/Condesa: $600-1200/month. Meals: $3-8 at local places, $15-25 at nice restaurants. Coworking: $100-200/month.</p>
      
//       <h3>Food Scene</h3>
//       <p>Arguably the best food city in the Americas. Street tacos, traditional markets, modern Mexican cuisine, and international options abound. The coffee culture is excellent.</p>
      
//       <h3>Altitude & Weather</h3>
//       <p>At 2,240 meters (7,350 feet), take time to adjust. Weather is mild year-round with rainy afternoons in summer. The altitude can affect sleep and energy initially.</p>
      
//       <h3>Getting Around</h3>
//       <p>Extensive metro system, Uber/Didi are cheap, and many areas are walkable. The city is massive - choose your neighborhood wisely to minimize commute times.</p>
//     `,
//   },
//   {
//     id: 8,
//     name: "Tokyo, Japan",
//     image:
//       "https://images.unsplash.com/photo-1549693578-d683be217e58?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=1177",
//     description:
//       "Ultra-modern, extremely reliable internet, and endless culture — higher costs but excellent quality of life.",
//     author: "Hiro T.",
//     avatar: "https://i.pravatar.cc/150?img=13",
//     likes: 190,
//     comments: 29,
//     category: "Destination Guide",
//     trending: false,
//     nomadCount: 910,
//     fullStory: `
//       <h2>Tokyo - High-Tech Nomad Experience</h2>
//       <p>Tokyo offers a unique digital nomad experience combining ultra-modern technology, deep cultural traditions, and unparalleled efficiency. It's more expensive but delivers exceptional quality.</p>
      
//       <h3>Cost Reality</h3>
//       <p>Tokyo is pricey. Apartments: $800-1500/month for small spaces. Meals: $8-15 at restaurants, $5-8 at convenience stores. However, public transport is reasonable at $100-150/month.</p>
      
//       <h3>Internet & Infrastructure</h3>
//       <p>World-class internet everywhere. Cafes, coworking spaces, and even convenience stores have reliable WiFi. The infrastructure is incredibly reliable and efficient.</p>
      
//       <h3>Neighborhoods</h3>
//       <p>Shibuya and Shinjuku for energy and convenience. Nakameguro for hipster cafes and charm. Kichijoji for local life and parks. Setagaya for quieter residential areas.</p>
      
//       <h3>Cultural Experience</h3>
//       <p>Temples, modern art, incredible food, seasonal beauty, and unique subcultures. Tokyo offers endless exploration opportunities beyond work.</p>
      
//       <h3>Language Consideration</h3>
//       <p>English proficiency is limited outside tourist areas. Learning basic Japanese phrases is essential. However, the city is very foreigner-friendly with excellent signage and helpful locals.</p>
      
//       <h3>Visa Options</h3>
//       <p>Tourist visa allows 90 days. Japan recently introduced a digital nomad visa for eligible countries allowing 6-month stays with remote work permission.</p>
//     `,
//   },
// ];