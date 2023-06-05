import { useState, useEffect, useRef } from 'react';
import s from 'components/MessageList.module.css';

export const MessageList = ({ socket, user }) => {
  const [messagesList, setMessagesList] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isTyping, setIsTyping] = useState('');
  const [message, setMessage] = useState('');
  const list = useRef(null);

  useEffect(() => {
    socket.on('updateMessageList', (req) => {
      const { messages } = req;
      setMessagesList(messages);
      handleScroll(list);
    });

    socket.on('requireUpdateMessageList', () => {
      setIsUpdated(false);
    });

    socket.on('typing', (userName) => {
      setIsTyping(`${userName} is typing...`);
      setTimeout(() => {
        setIsTyping('');
      }, 5000);
    });
  }, [socket]);

  if (!isUpdated) {
    socket.emit('getMessageList', () => {
      setIsUpdated(true);
    });
  }

  const handleScroll = (ref) => {
    ref.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    handleScroll(list);
  }, [isUpdated]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message) socket.emit('createMessage', { text: message });
  };

  const handleChange = (e) => {
    socket.emit('isTyping');
    setMessage(e.target.value);
  };

  const handleDeleteMessage = (id) => {
    socket.emit('deleteMessage', { id });
  };

  const mappedMessagesList = messagesList.map((m) => (
    <li key={m.id} className={s.message}>
      <p className={m.user === user.userName ? s.sended : ''}>
        <b>{m.user}: </b>
        {m.text}
        <span>
          {' '}
          {m.createdAt}{' '}
          {user.userName === m.user ? (
            <p onClick={() => handleDeleteMessage(m.id)}>x</p>
          ) : (
            ''
          )}
        </span>
      </p>
    </li>
  ));

  return (
    <div className={s.messages}>
      <h3>Messages:</h3>
      <ul ref={list} className={s.messageList}>
        {mappedMessagesList}
      </ul>

      <form className={s.inputMessageForm} onSubmit={handleSendMessage}>
        <div className={s.typing}>{isTyping ? isTyping : ''}</div>
        <div className={s.inputMessage}>
          <input name="message" onChange={handleChange} value={message}></input>
          <button>Send</button>
        </div>
      </form>
    </div>
  );
};
