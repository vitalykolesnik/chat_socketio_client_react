import Sidebar from "components/Home/Sidebar/Sidebar";
import { Chat } from "components/Home/Chat/Chat";
import { useSocket } from "hooks/useSocket";
import Loader from "components/Home/Loader";

const Home = () => {
  const { socket } = useSocket();

  return (
    <div className="home">
      <div className="container">
        {socket && socket.connected ? (
          <>
            <Sidebar />
            <Chat />
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default Home;
