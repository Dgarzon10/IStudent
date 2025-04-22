import { Link } from "react-router-dom";

function ForumCard() {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md min-w-3xs max-w-2xl">
      <h2 className="text-2xl font-semibold text-primary mb-4">Forumsqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq</h2>
      <ul className="mb-4">
        <li className="text-text">Most Discussed: Forum 1</li>
        <li className="text-text">Most Discussed: Forum 2</li>
      </ul>
      <Link className="text-accent hover:underline" to="/forums">Go to Forums</Link>
  </div>
  );
}

export default ForumCard;
