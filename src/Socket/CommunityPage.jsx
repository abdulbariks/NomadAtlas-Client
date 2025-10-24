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
