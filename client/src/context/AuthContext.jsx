import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // 'customer' | 'technician'
  const [token, setToken] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('qm_auth');
    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed.user);
      setRole(parsed.role);
      setToken(parsed.token);
    }
  }, []);

  const login = async ({ email, password, role: loginRole }) => {
    const res = await axios.post('/api/auth/login', { email, password, role: loginRole });
    setUser(res.data.user);
    setRole(res.data.user.role);
    setToken(res.data.token);
    localStorage.setItem('qm_auth', JSON.stringify({ user: res.data.user, role: res.data.user.role, token: res.data.token }));
  };

  const signup = async (payload) => {
    const res = await axios.post('/api/auth/signup', payload);
    setUser(res.data.user);
    setRole(res.data.user.role);
    setToken(res.data.token);
    localStorage.setItem('qm_auth', JSON.stringify({ user: res.data.user, role: res.data.user.role, token: res.data.token }));
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setToken(null);
    localStorage.removeItem('qm_auth');
  };

  const authAxios = axios.create();
  authAxios.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  const value = { user, role, token, login, signup, logout, authAxios };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
