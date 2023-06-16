import { useContext } from "react";
import { SocketContext } from "hoc/SocketContext";

export const useSocket = () => {
  return useContext(SocketContext);
};
