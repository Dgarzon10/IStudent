import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, User, ChevronDown } from "lucide-react";
import { useAuth } from "./AuthContext";
import axiosInstance from "../api/axiosInstance";

function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const { token, logout, userRole, userId } = useAuth();
  const dropdownRef = useRef(null);
  const location = useLocation();

  // ✅ Fetch user info if logged in
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (token && userId) {
        try {
          const res = await axiosInstance.get(`/users/${userId}`);
          setUserInfo(res.data);
        } catch (error) {
          console.error("Error fetching user info", error);
        }
      }
    };
    fetchUserInfo();
  }, [token, userId]);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Close dropdown and sidebar on route change
  useEffect(() => {
    setDropdownOpen(false);
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <nav className="w-full bg-primary text-white px-4 py-3 shadow-md relative">
      <div className="flex items-center justify-between w-full">
        {/* Logo + botón hamburguesa */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold">IStudent Hub</Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
            <Menu size={24} />
          </button>
        </div>

        {/* Acciones en escritorio */}
        <div className="hidden md:flex items-center gap-4 relative" ref={dropdownRef}>
          {token ? (
            <>
              {/* Botón con ícono */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 hover:opacity-90"
              >
                <User size={20} />
                <ChevronDown size={16} />
              </button>

              {/* Dropdown visible */}
              {dropdownOpen && (
                <div className="absolute top-10 right-0 bg-white text-gray-800 shadow-lg rounded-md w-56 z-50">
                  <div className="px-4 py-3 border-b text-sm">
                    <p className="font-medium">{userInfo?.email || "Usuario"}</p>
                    <p className="text-gray-500 capitalize">{userRole}</p>
                  </div>
                  <ul className="py-2 text-sm">
                    <li>
                      <Link to="/account" className="block px-4 py-2 hover:bg-gray-100">Cuenta</Link>
                    </li>
                    <li>
                      <Link to="/settings" className="block px-4 py-2 hover:bg-gray-100">Ajustes</Link>
                    </li>
                    <li>
                      <Link to="/notifications" className="block px-4 py-2 hover:bg-gray-100">Notificaciones</Link>
                    </li>
                    <li>
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                      >
                        Cerrar sesión
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to="/login" className="hover:underline text-sm">Login</Link>
              <Link to="/signup" className="hover:underline text-sm">Sign Up</Link>
            </>
          )}
        </div>
      </div>

      {/* Menú lateral en mobile */}
      <div className={`${sidebarOpen ? "block" : "hidden"} md:hidden mt-4`}>
        <ul className="space-y-2">
          <li><Link to="/" className="block px-4 py-2 hover:bg-primary/20">Home</Link></li>
          <li><Link to="/forums" className="block px-4 py-2 hover:bg-primary/20">Forums</Link></li>
          <li><Link to="/housing" className="block px-4 py-2 hover:bg-primary/20">Housing</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
