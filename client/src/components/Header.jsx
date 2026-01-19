import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/context";

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
       
        <h1
          className="text-2xl font-extrabold text-blue-700 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Task Manager
        </h1>

      
        {user && (
          <div className="flex items-center gap-4">
            
            {/* User Name */}
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold uppercase">
                {user.name?.charAt(0)}
              </div>
              <span className="hidden sm:block font-medium text-gray-700">
                {user.name}
              </span>
            </div>

        
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg shadow-sm"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
