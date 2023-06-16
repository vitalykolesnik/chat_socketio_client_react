import { useState, useEffect } from "react";
import { useSocket } from "hooks/useSocket";
import { User } from "components/Home/Sidebar/Chats/User/User";
import s from "components/Home/Sidebar/sidebar.module.scss";

export const Chats = () => {
  const { socket } = useSocket();
  const [usersList, setUsersList] = useState([]);
  const [isUpdated, setIsUpdated] =
    useState(false);

  useEffect(() => {
    socket.on("updateUsersList", (req) => {
      const { users } = req;
      setUsersList(users);
    });

    socket.on("requireUpdateUsersList", () => {
      setIsUpdated(false);
    });
  }, [socket]);

  useEffect(() => {
    if (!isUpdated) {
      socket.emit("getUsersList", () => {
        setIsUpdated(true);
      });
    }
  }, [socket, isUpdated]);

  const mappedUserList = usersList.map((user) => (
    <User user={user} key={user.id} />
  ));

  return (
    <div className={s.chats}>
      {mappedUserList}
    </div>
  );
};
