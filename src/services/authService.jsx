const API = import.meta.env.VITE_API_URL || "http://localhost:8080";


export const login = async (username, password) => {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const data = await res.json();
  if (res.ok) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};


export function getToken() {
  return localStorage.getItem('token');
}

export function saveToken(token) {
  localStorage.setItem('token', token);
}



export function isAuthenticated() {
  return !!localStorage.getItem('token');
}