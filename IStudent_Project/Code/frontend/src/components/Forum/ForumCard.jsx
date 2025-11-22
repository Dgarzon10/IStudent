import { Link } from "react-router-dom";

function ForumCard() {
  // Simulamos foros populares (puedes conectar esto luego con API)
  const popularForums = [
    { name: "Housing", members: 240, path: "/forums/housing" },
    { name: "Student Life", members: 180, path: "/forums/student-life" },
    { name: "Jobs", members: 95, path: "/forums/jobs" }
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg transition max-w-2xl">
      {/* Título principal */}
      <h2 className="text-2xl font-bold text-primary mb-2">Forums</h2>

      {/* Introducción breve */}
      <p className="text-gray-600 mb-6">
        Join different discussions with other international students. Share questions, stories, and ideas.
      </p>

      {/* Mini-cards */}
      <div className="space-y-3 mb-6">
        {popularForums.map((forum) => (
          <Link
            to={forum.path}
            key={forum.name}
            className="block p-3 rounded border border-gray-100 hover:bg-gray-50 transition"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-800">{forum.name}</span>
              <span className="text-xs text-gray-500">{forum.members} members</span>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA general */}
      <Link to="/forums" className="text-accent hover:underline text-sm">
        Go to Forums →
      </Link>
    </div>
  );
}

export default ForumCard;
