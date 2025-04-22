import { Link } from "react-router-dom";

function PostCard() {
  return (
    <div className="card">
      <h3>/Forums Name</h3>
      <h2>Post Title</h2>
      <ul>
        <li>Most Discussed: Forum 1</li>
        <li>Most Discussed: Forum 2</li>
      </ul>
      <button className="btn">Like</button>
      <button className="btn">Comment</button>
    </div>
  );
}

export default PostCard;