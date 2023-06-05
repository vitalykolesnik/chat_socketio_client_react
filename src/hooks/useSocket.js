import { SERVER_URI } from 'constants';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? undefined : SERVER_URI;

export default function useSocket(token) {
  const [socket, setSocket] = useState();

  useEffect(() => {
    const currentSocket = io(URL, { auth: { token } });
    setSocket(currentSocket);
  }, [token]);

  return [socket, setSocket];
}
