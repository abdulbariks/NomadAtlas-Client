// src/pages/Community/ChatSection.jsx
import React, { useEffect, useState, useRef } from "react";
import useAxiosSecure from "../customHook/useAxiosSecure"; // you have this
import { useSelector } from "react-redux";
import socket from "../api/socketIO";

export default function ChatSection() {
    const axiosSecure = useAxiosSecure();
    const { user } = useSelector((state) => state.auth); // your auth slice
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const messagesEndRef = useRef(null);

    useEffect(() => {
        socket.connect();

        // load history from API
        let mounted = true;
        axiosSecure
            .get("/community/messages")
            .then((res) => {
                if (!mounted) return;
                setMessages(res.data || []);
                // scroll to bottom after messages loaded
                setTimeout(() => scrollToBottom(), 50);
            })
            .catch((err) => {
                console.error("Failed to fetch chat messages:", err);
            });

        // listen for incoming messages
        socket.on("receive_message", (msg) => {
            setMessages((prev) => [...prev, msg]);
            scrollToBottom();
        });

        socket.on("error_message", (err) => {
            console.error("Socket error:", err);
        });

        return () => {
            mounted = false;
            // remove listeners
            socket.off("receive_message");
            socket.off("error_message");
            socket.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // run once

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSend = async () => {
        const trimmed = text.trim();
        if (!trimmed) return;

        const payload = {
            senderId: user?.uid || user?.email || "guest",
            senderName: user?.displayName || user?.email || "Anonymous",
            text: trimmed,
        };

        // Add immediately to UI
        setMessages(prev => [...prev, { ...payload, createdAt: new Date().toISOString() }]);

        socket.emit("send_message", payload);

        setText("");
    };


    return (
        <div className="bg-white rounded shadow p-4">
            <div className="h-96 overflow-y-auto border p-3 rounded mb-3">
                {messages.length === 0 ? (
                    <p className="text-sm text-gray-500">No messages yet — say hi 👋</p>
                ) : (
                    messages.map((m) => (
                        <div key={m._id ?? m.createdAt} className="mb-2">
                            <div className="text-sm">
                                <strong>{m.senderName}</strong>{" "}
                                <span className="text-gray-400 text-xs ml-2">
                                    {new Date(m.createdAt).toLocaleString()}
                                </span>
                            </div>
                            <div className="text-gray-800">{m.text}</div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-2">
                <input
                    className="flex-1 border rounded p-2"
                    placeholder="Type a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSend();
                    }}
                />
                <button onClick={handleSend} className="px-4 py-2 rounded bg-teal-600 text-white">
                    Send
                </button>
            </div>
        </div>
    );
}
