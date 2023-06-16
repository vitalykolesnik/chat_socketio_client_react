import { useRef } from "react";
import { useSocket } from "hooks/useSocket";
import dots from "img/menu-dots.png";
import ava1 from "img/mid_344562_951965.jpg";
import ava2 from "img/mid_328435_492179.jpg";
import s from "components/Home/Chat/chat.module.scss";

export const Message = ({ message }) => {
  const { socket, user } = useSocket();
  const ref = useRef();

  const handleDeleteMessage = (id) => {
    socket.emit("deleteMessage", { id });
  };

  const isOwner = user.userName === message.user;
  // const style = isOwner ? " owner" : "";
  // const className = "message" + style;
  const date = new Date(message.createdAt);
  const formatedDate = `${date.getHours()}:${date.getMinutes()}`;

  return (
    <div
      ref={ref}
      className={s.message}
      draggable
    >
      <div className={s.messageInfo}>
        <img src={isOwner ? ava1 : ava2} alt="" />
        <p>{formatedDate}</p>
      </div>
      <div className={s.messageContent}>
        <p>{message.text}</p>
        <img
          src={dots}
          alt=""
          onClick={() =>
            handleDeleteMessage(message.id)
          }
        />
      </div>
    </div>
  );
};
