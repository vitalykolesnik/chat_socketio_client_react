import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from 'components/Login';
import { Dashboard } from 'components/Dashboard';
import useLocalStorage from 'hooks/useLocalStorage';
import useSocket from 'hooks/useSocket';
import s from 'components/App.module.css';
import axios from 'axios';

export const App = () => {
  const [token, setToken] = useLocalStorage('token', null);
  const [socket] = useSocket(token);

  const getToken = async (payload) => {
    const { data } = await axios.post(
      'http://localhost:4000/api/login',
      payload,
    );
    setToken(data.user?.token);
  };

  return (
    <div className={s.app}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                socket ? (
                  <Dashboard
                    socket={socket}
                    token={token}
                    setToken={setToken}
                  />
                ) : (
                  'Loading...'
                )
              ) : (
                <Login onSubmit={getToken} />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
