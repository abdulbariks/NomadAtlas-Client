import React, { useEffect, useState, useRef } from "react";
import useAxiosSecure from "../customHook/useAxiosSecure";
import { useSelector } from "react-redux";
import socket from "../api/socketIO";
import { MessageCircle, X } from "lucide-react";

export default function ChatSection({ room = "general", onClose }) {
    const axiosSecure = useAxiosSecure();
    const { user } = useSelector((state) => state.auth);
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        socket.connect();
        socket.emit("join_room", room);

        let mounted = true;
        axiosSecure
            .get(`/community/messages`)    //.get(`/community/messages?room=${room}`)
            .then((res) => {
                if (!mounted) return;
                setMessages(res.data || []);
                setTimeout(() => scrollToBottom(), 50);
            })
            .catch((err) => {
                console.error("Failed to fetch chat messages:", err);
            });

        socket.on("receive_message", (msg) => {
            if (msg.room === room) {
                setMessages((prev) => [...prev, msg]);
                scrollToBottom();
            }
        });

        socket.on("error_message", (err) => {
            console.error("Socket error:", err);
        });

        return () => {
            mounted = false;
            socket.off("receive_message");
            socket.off("error_message");
            socket.disconnect();
        };
    }, [room, axiosSecure]);

    const handleSend = async () => {
        const trimmed = text.trim();
        if (!trimmed) return;

        const payload = {
            senderId: user?.uid || user?.email || "guest",
            senderName: user?.displayName || user?.email || "Anonymous",
            text: trimmed,
            room,
        };

        setMessages(prev => [...prev, { ...payload, createdAt: new Date().toISOString() }]);
        setText("");

        socket.emit("send_message", payload);
        try {
            await axiosSecure.post("/community/messages", payload);
        } catch (err) {
            console.error("Backup save failed:", err);
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-cyan-200 overflow-hidden flex flex-col h-full">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#11c3c0] to-[#3ea1f1] px-6 py-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Community Chat</h3>
                {onClose && (
                    <button
                        onClick={onClose}
                        className="text-white hover:text-cyan-100 transition p-1 rounded-full hover:bg-white/20"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 py-8">
                        <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No messages yet — say hi!</p>
                    </div>
                ) : (
                    messages.map((m) => (
                        <div key={m._id ?? m.createdAt} className="mb-4">
                            <div className="flex items-center gap-2 mb-1">
                                <strong className="text-sm text-gray-800">{m.senderName}</strong>
                                <span className="text-gray-400 text-xs">
                                    {new Date(m.createdAt).toLocaleString()}
                                </span>
                            </div>
                            <div className="text-gray-700 bg-white rounded-lg p-3 border border-cyan-100">
                                {m.text}
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-cyan-200 bg-white">
                <div className="flex gap-2">
                    <input
                        className="flex-1 border border-cyan-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#11c3c0]"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSend();
                        }}
                    />
                    <button
                        onClick={handleSend}
                        className="px-6 py-3 rounded-lg bg-[#11c3c0] text-white font-semibold hover:bg-[#0fa9a7] transition"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}