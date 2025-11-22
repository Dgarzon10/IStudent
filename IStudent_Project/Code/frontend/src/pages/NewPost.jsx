import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { toast } from "react-hot-toast";

function NewPost() {
    const { token, userId } = useAuth();
    const navigate = useNavigate();

  const [forums, setForums] = useState([]);
  const [forumId, setForumId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const res = await axiosInstance.get("/forums");
        setForums(res.data);
      } catch (err) {
        toast.error("Failed to load forums.");
      }
    };
    fetchForums();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!forumId || !title || !body) {
      toast.error("All fields are required.");
      return;
    }

    try {
      await axiosInstance.post(
        "/posts",
        {
          forumId,
          userId,
          title,
          body,
          imageUrl,
          status: "published",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Post created!");
      navigate(`/forums/${forums.find(f => f.id === parseInt(forumId))?.name}`);
    } catch (err) {
      toast.error("Failed to create post.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <select
          value={forumId}
          onChange={(e) => setForumId(e.target.value)}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select a forum</option>
          {forums.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          placeholder="Write your post..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={6}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="url"
          placeholder="Image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-primary/90 transition-transform duration-150 active:scale-95"
        >
          Publish
        </button>
      </form>
    </div>
  );
}

export default NewPost;
