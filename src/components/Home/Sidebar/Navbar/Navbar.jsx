import { Link } from "react-router-dom";
import { useSocket } from "hooks/useSocket";
import USER from "img/user.png";
import s from "components/Home/Sidebar/sidebar.module.scss";

export const Navbar = () => {
  const { user, logout } = useSocket();

  return (
    <div className={s.navbar}>
      <span className={s.logo}>MyChat</span>
      <div className={s.user}>
        <span>{user.userName}</span>
        <img
          className={s.avatar}
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
