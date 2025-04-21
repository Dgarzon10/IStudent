import { Link } from "react-router-dom";

function ForumCard() {
  return (
    <div className="card">
      <h2>Forums</h2>
      <ul>
        <li>Most Discussed: Forum 1</li>
        <li>Most Discussed: Forum 2</li>
      </ul>
      <Link to="/forums">Go to Forums</Link>
    </div>
  );
}

export default ForumCard;
