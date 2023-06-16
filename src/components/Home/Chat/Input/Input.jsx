import { useState } from "react";
import { useSocket } from "hooks/useSocket";
import send from "img/paper-plane-top.png";
import picture from "img/picture.png";

export const Input = () => {
  const [message, setMessage] = useState("");
  const { socket } = useSocket();

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("createMessage", {
        text: message,
      });
      // setMessage("");
    }
  };

  const handleChange = (e) => {
    socket.emit("isTyping");
    setMessage(e.target.value);
  };

  return (
    <div className="messageForm">
      <form onSubmit={handleSendMessage}>
        <input
          name="message"
          onChange={handleChange}
          value={message}
          placeholder="Input message here..."
        />
        <div className="send">
          {message && (
            <button>
              <img src={send} alt="" />
            </button>
          )}
          <label htmlFor="file">
            <img src={picture} alt="" />
          </label>
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
          />
        </div>
      </form>
    </div>
  );
};
