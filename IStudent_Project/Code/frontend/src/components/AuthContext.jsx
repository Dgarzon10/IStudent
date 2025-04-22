import { useState, useContext, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setToken(response.data.token);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const signup = async (email, password, role) => {
    try {
      await axios.post('http://localhost:8080/auth/signup', { email, password, role });
      navigate('/login');
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
