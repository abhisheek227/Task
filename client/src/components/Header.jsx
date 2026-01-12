import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/context";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="p-4 bg-white shadow flex justify-between">
      <h1 className="text-xl font-bold">Task Manager</h1>

      {user && (
        <div>
          <span className="mr-4">{user?.name}</span>
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
