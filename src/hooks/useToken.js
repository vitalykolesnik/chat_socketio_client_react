import { useContext } from "react";
import { TokenContext } from "hoc/TokenContext";

export const useToken = () => {
  return useContext(TokenContext);
};
