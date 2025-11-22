import { Link } from "react-router-dom";
import { ThumbsUp } from "lucide-react";

function PostCard({ title, content, imageUrl, forumName, author }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition">
      <div className="flex justify-between text-sm text-gray-500 mb-2">
        <Link
          to={`/forums/${forumName}`}
          className="text-accent hover:underline"
        >
          {forumName}
        </Link>

        <span>by {author}</span>
      </div>

      <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>

      {imageUrl && (
        <img src={imageUrl} alt="post" className="w-full h-52 object-cover rounded mb-2" />
      )}

      <p className="text-gray-700 mb-4">{content.slice(0, 150)}...</p>

      <div className="flex justify-between items-center">
        <Link to={`/forums/${forumName}`} className="text-accent hover:underline text-sm"> 
          View full post →
        </Link>
        <button className="flex items-center gap-1 text-gray-500 hover:text-accent">
          <ThumbsUp size={16} />
          <span>Like</span>
        </button>
      </div>
    </div>
  );
}

export default PostCard;
