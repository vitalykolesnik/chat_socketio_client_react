import { createContext } from "react";
import { io } from "socket.io-client";
// import { useRef } from "react";
import { useEffect, useState } from "react";

import { SERVER_URI } from "constants";
import { useToken } from "hooks/useToken";

const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : SERVER_URI;

export const SocketContext =
  createContext("null");

export const SocketProvider = ({ children }) => {
  const { token, handleLogout } = useToken();
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentSocket = io(URL, {
      auth: { token },
    });
    setSocket(currentSocket);
  }, [token]);

  useEffect(() => {
    if (socket) {
      socket.on("info", (res) => {
        const { user } = res;
        setUser(user);
      });

      socket.emit("getMe");
    }
  }, [socket]);

  const logout = () => {
    handleLogout();
    socket.current.emit("changeStatus", false);
  };

  const value = {
    user,
    socket,
    logout,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};
