import { useEffect, useState } from "react";
import NewsCarousel from "../components/Forum/NewsCarousel";
import PostCard from "../components/PostCard";
import ForumSidebar from "../components/Forum/ForumSideBar";
import axiosInstance from "../api/axiosInstance";

function Forum() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get("/posts"); // 👈 CAMBIA aquí a /posts
        setPosts(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">

      {/* 🧱 Columna principal */}
      <div className="w-[75%] h-full overflow-y-auto p-6 space-y-6">
        
        {/* 🔝 Carrusel */}
        <div className="bg-gray-100 rounded-lg p-6 shadow text-center">
          <NewsCarousel />
        </div>

        {/* 🔄 Loading/Error */}
        {loading && <div className="text-center text-gray-600">Loading posts...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}

        {/* 🧾 Listado real de POSTCARDS */}
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            content={post.body}
            forumName={post.forum.name || "General"}
            author={post.user.email || "Anonymous"}
            imageUrl={post.imageUrl || ""}
          />
        ))}
      </div>

      {/* 🗂️ Sidebar */}
      <ForumSidebar />
    </div>
  );
}

export default Forum;
