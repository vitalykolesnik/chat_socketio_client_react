import Ava from "img/mid_344562_951965.jpg";

export const User = ({ user }) => {
  return (
    <div className="userChat">
      <img src={Ava} alt="" />
      <div className="userChatInfo">
        <span>{user.userName}</span>
        <p>{user.bio}</p>
      </div>
    </div>
  );
};
