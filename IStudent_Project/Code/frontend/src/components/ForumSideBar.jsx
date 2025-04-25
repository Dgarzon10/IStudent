import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import { useState } from "react";

function ForumSideBar() {
  const { token } = useAuth();
  const [search, setSearch] = useState("");
  const followedForums = ["Housing", "Student Life", "Jobs"];
  const popularForums = ["Tech", "Internships", "Food", "Events"];
  const tags = ["food", "technology", "jobs", "health", "housing"];

  return (
    <aside className="w-[25%] h-full bg-gray-200 border-l border-gray-200 p-6 space-y-8 rounded-lg hidden md:block">
      
      {/* 🔍 Buscador */}
      <div>
        <input
          type="text"
          placeholder="Search forums..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded px-3 py-2 text-sm text-gray-700"
        />
      </div>

      {/* 🧾 Foros que sigo */}
      {token && (
        <div>
          <h3 className="text-sm font-semibold mb-3 text-gray-800">Your Forums</h3>
          <ul className="space-y-2 text-sm text-accent">
            {followedForums.map((f) => (
              <li key={f}>
                <Link to={`/forums/${f.toLowerCase().replace(/\s/g, "-")}`}>
                  {f}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 📈 Populares */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-800">Popular Communities</h3>
        <ul className="space-y-2 text-sm text-accent">
          {popularForums.map((f) => (
            <li key={f}>
              <Link to={`/forums/${f.toLowerCase()}`}>{f}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 🏷️ Tags */}
      <div>
        <h3 className="text-sm font-semibold mb-3 text-gray-800">Browse by Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              to={`/forums?tag=${tag}`}
              className="bg-gray-100 px-3 py-1 rounded-full text-xs text-gray-700 hover:bg-gray-200"
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
