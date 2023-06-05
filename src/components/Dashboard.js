import { useEffect, useState } from 'react';
import { UserList } from 'components/UsersList';
import { MessageList } from 'components/MessageList';
import { Header } from 'components/Header';
import s from 'components/Dashboard.module.css';

export const Dashboard = ({ socket, token, setToken }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    socket.on('info', (res) => {
      const { user } = res;
      setUser(user);
    });

    socket.emit('getMe');
  }, [socket, token]);

  return (
    <div className={s.container}>
      {user ? (
        <>
          <Header socket={socket} setToken={setToken} user={user} />
          <div className={s.content}>
            <div className={s.users}>
              <UserList socket={socket} />
            </div>
            <div className={s.messages}>
              <MessageList socket={socket} user={user} />
            </div>
          </div>
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};
