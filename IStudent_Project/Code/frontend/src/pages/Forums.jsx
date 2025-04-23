import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";

function Forum() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="w-[70%] p-6">
        {/* Carrusel de noticias destacadas */}
        <div className="mb-8 bg-gray-100 rounded-lg p-6 shadow text-center">
          <h1 className="text-3xl font-bold text-primary mb-2">Featured Posts</h1>
          <p className="text-text text-md">
            Stay updated with the most relevant news shared by your fellow students.
          </p>
        </div>

        {/* Listado de posts */}
        <div className="space-y-6">
          <PostCard
            title="Looking for a roommate near campus"
            content="Hey! I have an extra room in a 2-bedroom apartment near the university..."
            forumName="Housing Forum"
            author="ana123"
            imageUrl="https://source.unsplash.com/random/600x300?apartment"
          />
          <PostCard
            title="Visa appointment delays"
            content="Anyone else experiencing issues getting a visa interview on time?"
            forumName="Student Life"
            author="john_d"
          />
        </div>
      </div>

      {/* Sidebar derecha: foros seguidos */}
      <aside className="w-[30%] bg-white border-l border-gray-200 p-6">
        <h3 className="text-lg font-bold mb-4">Your Subscribed Forums</h3>
        <ul className="space-y-2 text-sm text-accent">
          <li><Link to="/forums/housing">🏠 Housing</Link></li>
          <li><Link to="/forums/student-life">💬 Student Life</Link></li>
          <li><Link to="/forums/jobs">💼 Part-time Jobs</Link></li>
        </ul>
      </aside>
    </div>
  );
}

export default Forum;
