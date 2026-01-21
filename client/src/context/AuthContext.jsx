import { useState } from "react";
import { AuthContext } from "./context.js";
import useAuthCheck from "../hooks/useAuthCheck.jsx";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useAuthCheck(setUser, setLoading);


  const login = (userData) => {
    setUser(userData);
  };

  const logout = async () => {
    await fetch("http://localhost:5000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, setLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
