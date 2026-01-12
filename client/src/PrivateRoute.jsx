import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./context/context";


const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
