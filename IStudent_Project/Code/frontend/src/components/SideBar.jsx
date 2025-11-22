import { Link } from 'react-router-dom';
import { Home, MessageSquare, Building } from 'lucide-react';

function SideBar() {
  return (
    <aside className="hidden md:block w-64 h-full bg-background p-6 border-r border-gray-200">
      <ul className="space-y-4">
        <li>
          <Link to="/" className="flex items-center text-text text-lg hover:text-primary">
            <Home className="w-5 h-5 mr-3" /> Home
          </Link>
        </li>
        <li>
          <Link to="/forums" className="flex items-center text-text text-lg hover:text-primary">
            <MessageSquare className="w-5 h-5 mr-3" /> Forums
          </Link>
        </li>
        <li>
          <Link to="/housing" className="flex items-center text-text text-lg hover:text-primary">
            <Building className="w-5 h-5 mr-3" /> Housing
          </Link>
        </li>
        <li>
          <Link to="/institute" className="flex items-center text-text text-lg hover:text-primary">
            <Building className="w-5 h-5 mr-3" /> Institute
          </Link>
        </li>

      </ul>
    </aside>
  );
}

export default SideBar;
