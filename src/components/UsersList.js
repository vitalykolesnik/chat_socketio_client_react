import { useState, useEffect } from 'react';
import s from 'components/UsersList.module.css';

export const UserList = ({ socket }) => {
  const [usersList, setUsersList] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    socket.on('updateUsersList', (req) => {
      const { users } = req;
      setUsersList(users);
    });

    socket.on('requireUpdateUsersList', () => {
      setIsUpdated(false);
    });
  }, [socket, usersList]);

  if (!isUpdated) {
    socket.emit('getUsersList', () => {
      setIsUpdated(true);
    });
  }

  const mappedUserList = usersList.map((u) => (
    <li key={u.id} className={s.user}>
      <a href={u.id} className={u.isOnline ? s.online : s.offline}>
        {u.userName}
      </a>
    </li>
  ));

  return (
    <div className={s.users}>
      <h3>Users: </h3>
      <ul className={s.userList}>{mappedUserList}</ul>
    </div>
  );
};
