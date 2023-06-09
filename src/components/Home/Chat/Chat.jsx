import { useState, useEffect } from "react";
import { useSocket } from "hooks/useSocket";
import { Input } from "components/Home/Chat/Input/Input";
import { Messages } from "components/Home/Chat/Messages/Messages";
import pencil from "img/pencil.png";
import phone from "img/phone-call.png";
import add_user from "img/user-add.png";
import settings from "img/settings-sliders.png";
import s from "components/Home/Chat/chat.module.scss";

export const Chat = () => {
  const [isTyping, setIsTyping] = useState(false);
  const { socket, user } = useSocket();

  useEffect(() => {
    socket.on("typing", (userName) => {
      if (user.userName !== userName) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
        }, 3000);
      }
    });
  }, [socket, user]);

  return (
    <div className={s.chat}>
      <div className={s.chatInfo}>
        <span className={s.info}>
          Jerry {isTyping && pencil}
        </span>
        <div className={s.chatIcons}>
          <img src={phone} alt="" />
          <img src={add_user} alt="" />
          <img src={settings} alt="" />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};
