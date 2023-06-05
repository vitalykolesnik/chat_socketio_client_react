import s from 'components/Header.module.css';

export const Header = ({ socket, setToken, user }) => {
  const handleLogout = () => {
    socket.emit('changeStatus', false);
    setToken('');
    window.location.reload();
  };

  return (
    <div className={s.header}>
      <h2>Chat </h2>
      <div className={s.login}>
        <p>{`Hi, ${user.userName}!`}</p>
        <button onClick={handleLogout}>LOGOUT</button>
      </div>
    </div>
  );
};
