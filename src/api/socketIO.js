import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_API || "https://nomad-atlas-server-delta.vercel.app";

const socket = io(SOCKET_URL, {
    autoConnect: false,
});

export default socket;