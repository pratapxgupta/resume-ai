import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  logoutUser,
  registerUser,
  selectAuth,
} from "../store/auth.slice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, status, sessionInitialized, error } = useSelector(selectAuth);
  const handleLogin = useCallback(
    (credentials) => dispatch(loginUser(credentials)).unwrap(),
    [dispatch],
  );
  const handleRegister = useCallback(
    (details) => dispatch(registerUser(details)).unwrap(),
    [dispatch],
  );
  const handleLogout = useCallback(
    () => dispatch(logoutUser()).unwrap(),
    [dispatch],
  );
  return {
    user,
    loading: status === "loading",
    sessionInitialized,
    error,
    handleRegister,
    handleLogin,
    handleLogout,
  };
};
