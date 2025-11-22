import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";

function ForumSideBar() {
  const { token, userRole } = useAuth();
  const [search, setSearch] = useState("");

  const followedForums = ["Housing", "Student Life", "Jobs"];
  const popularForums = ["Tech", "Internships", "Food", "Events"];
  const tags = ["food", "technology", "jobs", "health", "housing"];

  return (
    <aside className="w-[25%] h-[calc(100vh-64px)] bg-white border-l border-gray-200 px-6 py-8 space-y-8 overflow-y-auto hidden md:block shadow-inner">

      
      <div className="relative">
        <input
          type="text"
          placeholder="Search forums..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-3 py-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
      </div>

      {/*  Followed forums */}
      {token && (
        <div>
          <div className="mb-4">
            <Link
              to="/new-post"
              className="block bg-primary text-white text-center py-2 px-4 rounded hover:bg-primary/90 text-sm font-medium transition-transform duration-150 active:scale-95"
            >
              + Post
            </Link>
          </div>
          {(userRole === "admin" || userRole === "moderator")    && (
            <Link
              to="/new-forum"
              className="block bg-primary text-white text-center py-2 px-4 rounded hover:bg-primary/90 text-sm font-medium transition-transform duration-150 active:scale-95 mb-4"
            >
              + Create Forum
            </Link>
          )}

          <h3 className="text-sm font-semibold text-gray-800 mb-2">Your Forums</h3>
          <ul className="space-y-2">
            {followedForums.map((f) => (
              <li key={f}>
                <Link
                  to={`/forums/${f.toLowerCase().replace(/\s/g, "-")}`}
                  className="block text-sm text-primary hover:underline"
                >
                  {f}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}


      {/* Popular forums */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-2">Popular Communities</h3>
        <ul className="space-y-2">
          {popularForums.map((f) => (
            <li key={f}>
              <Link
                to={`/forums/${f.toLowerCase()}`}
                className="block text-sm text-gray-700 hover:text-primary"
              >
                {f}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Tag filter */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-3">Browse by Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              to={`/forums?tag=${tag}`}
              className="bg-gray-100 hover:bg-primary/10 text-primary px-3 py-1 rounded-full text-xs transition"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default ForumSideBar;
