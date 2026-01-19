import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (data.success) setRedirect(true);
    else alert(data.message || "Signup failed");
  };

  if (redirect) return <Navigate to="/login" />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-5"
      >
     
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Create Account
        </h2>

        
        <input
          placeholder="Name"
          required
          className="w-full h-11 border rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full h-11 border rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full h-11 border rounded-xl px-4 focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <div className="flex justify-center gap-6 text-gray-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="user"
              checked={form.role === "user"}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="accent-blue-600"
            />
            User
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="role"
              value="admin"
              checked={form.role === "admin"}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="accent-blue-600"
            />
            Admin
          </label>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-2.5 rounded-xl"
        >
          Signup
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
