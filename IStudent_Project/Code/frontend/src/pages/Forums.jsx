import NewsCarousel from "../components/NewsCarousel";
import PostCard from "../components/PostCard";
import ForumSidebar from "../components/ForumSideBar";
import { Link } from "react-router-dom";

function Forum() {
  return (
    <div className="flex h-screen bg-gray-50 ">
      {/* 🧱 Columna principal scrollable */}
      <div className="w-[75%] h-full overflow-y-auto p-6 space-y-6">
        {/* 🔝 Carrusel fijo en la parte superior del área central */}
        <div className="bg-gray-100 rounded-lg p-6 shadow text-center">
          <NewsCarousel />
        </div>

        {/* 🧾 Lista de PostCards */}
        {[...Array(10)].map((_, i) => (
          <PostCard
            key={i}
            title={`Sample Post ${i + 1}`}
            content="Hey! I have an extra room in a 2-bedroom apartment near the university..."
            forumName="Housing Forum"
            author="ana123"
            imageUrl="https://source.unsplash.com/random/600x300?apartment"
          />
        ))}
      </div>
        
        {/* 🗂️ Sidebar con los foros */
        <ForumSidebar />}
    </div>
  );
}

export default Forum;
