import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="flex justify-between items-center bg-primary text-white p-4">
      {/* Logo */}
      <div className="text-xl font-bold">
        <Link to="/">IStudent Hub</Link>
      </div>

      {/* Auth Actions */}
      <div>
        <Link className="mr-4 hover:underline" to="/login">Login</Link>
        <Link className="hover:underline" to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
}

export default NavBar;
