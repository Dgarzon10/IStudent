import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, User, ChevronDown } from "lucide-react";
import { useAuth } from "./AuthContext";

function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { token, logout } = useAuth();

  return (
    <nav className="w-full bg-primary text-white px-4 py-3 shadow-md">
      <div className="flex items-center justify-between w-full">
        {/* Logo + botón hamburguesa */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold">IStudent Hub</Link>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden">
            <Menu size={24} />
          </button>
        </div>

        {/* Acciones en escritorio */}
        <div className="hidden md:flex items-center gap-4 relative">
          {token ? (
            <>
              {/* Icono y dropdown */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1 hover:opacity-90"
              >
                <User size={20} />
                <ChevronDown size={16} />
              </button>

              {/* Menú desplegable */}
              {dropdownOpen && (
                <div className="absolute top-10 right-0 bg-white text-gray-800 shadow-lg rounded-md w-48 z-50">
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
