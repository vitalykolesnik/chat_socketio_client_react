import { Link } from "react-router-dom";
import { useSocket } from "hooks/useSocket";
import USER from "img/user.png";

export const Navbar = () => {
  const { user, logout } = useSocket();

  return (
    <div className="navbar">
      <span className="logo">MyChat</span>
      <div className="user">
        <span>{user.userName}</span>
        <img
          className="avatar"
          src={user.img || USER}
          alt=""
        />
        <Link onClick={logout} to="/">
          LOGOUT
        </Link>
      </div>
    </div>
  );
};
