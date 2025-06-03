import { useState } from "react";
import { login } from "../services/authService";


export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (await login(username, password)) {
      alert("Login exitoso");
      onLogin();
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <form onSubmit={handleLogin} className="flex flex-col space-y-4 bg-white p-8 rounded-xl shadow-md w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <input className="border p-2 rounded" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input className="border p-2 rounded" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600" type="submit">Login</button>
    </form>
  );
}