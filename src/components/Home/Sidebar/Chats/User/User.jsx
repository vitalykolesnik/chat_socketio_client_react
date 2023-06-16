import Ava from "img/mid_344562_951965.jpg";
import s from "components/Home/Sidebar/sidebar.module.scss";

export const User = ({ user }) => {
  return (
    <div className={s.userChat}>
      <img src={Ava} alt="" />
      <div className={s.userChatInfo}>
        <span>{user.userName}</span>
        <p>{user.bio}</p>
      </div>
    </div>
  );
};
