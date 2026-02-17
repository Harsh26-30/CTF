import { io } from "socket.io-client";

export const socket = io("https://ctf-3ztj.onrender.com", {
  withCredentials: true,
  transports: ["websocket"]
});
