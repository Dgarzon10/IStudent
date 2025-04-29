import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userId, setUserId] = useState(localStorage.getItem("UserId") || null);
  const [userRole, setUserRole] = useState(localStorage.getItem("UserRole") || null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("UserId", res.data.userId);
      localStorage.setItem("UserRole", res.data.role);
      setToken(res.data.token);
      setUserId(res.data.userId);
      setUserRole(res.data.role);
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const signup = async (email, password, role) => {
    try {
      await axiosInstance.post("/users/register", { email, password, role });
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    axiosInstance.defaults.headers.common["Authorization"] = null;
    setToken(null);
    setUserId(null);
    setUserRole(null);  
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ token, userId, userRole, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook separado, pero exportado después
export const useAuth = () => {
  return useContext(AuthContext);
};



