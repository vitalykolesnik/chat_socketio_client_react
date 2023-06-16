import {
  BrowserRouter,
  Route,
  Routes,
  Link,
} from "react-router-dom";
import "style.scss";
import Login from "components/Login";
import Register from "components/Register";
import Home from "components/Home/Home";
import Error from "components/Error";
import { RequireAuth } from "hoc/RequireAuth";
import { AutoLogin } from "hoc/AutoLogin";
import { TokenProvider } from "hoc/TokenContext";
import { SocketProvider } from "hoc/SocketContext";

export const App = () => {
  return (
    <TokenProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <SocketProvider>
                <RequireAuth>
                  <Home />
                </RequireAuth>
              </SocketProvider>
            }
          />
          <Route
            path="/test"
            element={
              <RequireAuth>
                <Link to="/">Home</Link>
              </RequireAuth>
            }
          />
          <Route
            path="/signup"
            element={
              <AutoLogin>
                <Register />
              </AutoLogin>
            }
          />
          <Route
            path="/login"
            element={
              <AutoLogin>
                <Login />
              </AutoLogin>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </TokenProvider>
  );
};
