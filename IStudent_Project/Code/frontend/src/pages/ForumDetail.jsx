import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";
import ForumSidebar from "../components/ForumSideBar";
import axiosInstance from "../api/axiosInstance";

function ForumDetail() {
  const { forumName } = useParams(); 
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPostsByForum = async () => {
      try {
        const res = await axiosInstance.get(`/posts/by-forum-name?name=${forumName}`)

        // const filteredPosts = res.data.filter(post => post.forumName?.toLowerCase() === forumName.toLowerCase());
        setPosts(res.data); 
      } catch (err) {
        console.error(err);
        setError("Failed to load posts for this forum.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostsByForum();
  }, [forumName]);

  return (
    <div className="flex h-screen bg-gray-50">

      <div className="w-[75%] h-full overflow-y-auto p-6 space-y-6">
        
      <div className="mb-4 text-3xl font-bold capitalize">
        <Link
          to={`/forums/${forumName}`}
          className="text-primary hover:underline"
        >
          {forumName.replace("-", " ")} 
        </Link>
      </div>



        {loading && <div className="text-center text-gray-600">Loading posts...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}

        
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              content={post.body}
              forumName={post.forum.name}
              author={post.user.email || "Anonymous"}
              imageUrl={post.imageUrl || "https://source.unsplash.com/random/600x300?post"}
            />
          ))
        ) : (
          !loading && <div className="text-center text-gray-500">No posts in this forum yet.</div>
        )}
      </div>

      
      <ForumSidebar />

    </div>
  );
}

export default ForumDetail;
