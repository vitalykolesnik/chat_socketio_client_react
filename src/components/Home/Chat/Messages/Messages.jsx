import {
  useState,
  useEffect,
  useRef,
} from "react";
import { useSocket } from "hooks/useSocket";
import { Message } from "components/Home/Chat/Messages/Message/Message";
import s from "components/Home/Chat/chat.module.scss";

export const Messages = () => {
  const { socket } = useSocket();
  const [messagesList, setMessagesList] =
    useState([]);
  const [isUpdated, setIsUpdated] =
    useState(false);

  const list = useRef(null);

  useEffect(() => {
    socket.on("updateMessageList", (req) => {
      const { messages } = req;
      setMessagesList(messages);
      handleScroll(list);
    });

    socket.on("requireUpdateMessageList", () => {
      setIsUpdated(false);
    });
  }, [socket]);

  useEffect(() => {
    if (!isUpdated) {
      socket.emit("getMessageList", () => {
        setIsUpdated(true);
      });
    }
  }, [socket, isUpdated]);

  const handleScroll = (ref) => {
    ref.current?.lastElementChild?.scrollIntoView(
      { behavior: "smooth" }
    );
  };

  useEffect(() => {
    handleScroll(list);
  }, [isUpdated]);

  const mappedMessagesList = messagesList.map(
    (message) => (
      <Message
        message={message}
        key={message.id}
      />
    )
  );

  return (
    <div className={s.messages} ref={list}>
      {mappedMessagesList}
    </div>
  );
};
