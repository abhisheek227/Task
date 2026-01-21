import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/context";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.msg || "Login failed");
      return;
    }

    login({ email: data.email });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full h-11 border rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setEmail(e.target.value.trim())}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full h-11 border rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2.5 rounded-xl"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
