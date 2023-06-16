import { createContext } from "react";
import axios from "axios";
import { useLocalStorage } from "hooks/useLocalStorage";

export const TokenContext = createContext("null");

export const TokenProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage(
    "token",
    null
  );

  const handleLogin = async (payload) => {
    const { data } = await axios.post(
      "http://localhost:4000/api/login",
      payload
    );
    setToken(data.user?.token);
  };

  const handleSignup = async (payload) => {
    const { data } = await axios.post(
      "http://localhost:4000/api/signup",
      payload
    );
    setToken(data.user?.token);
  };

  const handleLogout = () => {
    setToken(null);
  };

  const value = {
    token,
    setToken,
    handleLogin,
    handleLogout,
    handleSignup,
  };

  return (
    <TokenContext.Provider value={value}>
      {children}
    </TokenContext.Provider>
  );
};
