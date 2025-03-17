import { Server as SocketIOServer, Socket } from "socket.io";
import { Server as HTTPServer } from "http";

let io: SocketIOServer | null = null;

export const initSocket = (server: HTTPServer): SocketIOServer => {
  io = new SocketIOServer(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

export const getIO = (): SocketIOServer => {
  if (!io) throw new Error("Socket.io not initialized");
  return io;
};
