import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
const API = import.meta.env.VITE_API_URL || "http://localhost:8080";


export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { setToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/auth/login', credentials);
    setToken(res.data.token);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Usuario" onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} />
      <input type="password" placeholder="Contraseña" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} />
      <button type="submit">Ingresar</button>
    </form>
  );
}
