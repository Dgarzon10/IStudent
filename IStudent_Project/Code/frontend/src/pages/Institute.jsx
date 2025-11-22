import { Link } from "react-router-dom";

function Institute() {
  return (
    <div className="min-h-screen bg-background p-6 space-y-10">

      {/* 🏫 Header */}
      <div className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-primary mb-1">Technological University of Berlin</h1>
          <p className="text-sm text-gray-600">Community for international and local students to share, connect and thrive.</p>
        </div>
        <img src="https://source.unsplash.com/random/80x80?university" alt="logo" className="rounded-full shadow" />
      </div>

      {/* 📚 Recursos */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Student Resources</h2>
        <ul className="grid grid-cols-2 gap-4 text-sm text-accent">
          <li><Link to="#">📄 Visa Renewal Guide</Link></li>
          <li><Link to="#">🏘️ Local Housing Map</Link></li>
          <li><Link to="#">🍽️ Where to Eat on Budget</Link></li>
          <li><Link to="#">🎓 Academic Calendar</Link></li>
        </ul>
      </section>

      {/* 🧵 Foro interno */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Community Feed</h2>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-sm text-gray-800">"Any advice for registering my residence as a non-EU?"</p>
            <span className="text-xs text-gray-500">👤 JuliaB — 3 replies</span>
          </div>
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-sm text-gray-800">"Anyone interested in splitting a 3-bedroom near campus?"</p>
            <span className="text-xs text-gray-500">👤 AhmadE — 2 replies</span>
          </div>
          <Link to="#" className="text-sm text-accent hover:underline">View all posts →</Link>
        </div>
      </section>

      {/* 📅 Eventos */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Events</h2>
        <ul className="space-y-3 text-sm text-gray-800">
          <li>📅 10 May – Campus Tour & Meetup</li>
          <li>📅 15 May – Resume Workshop (Online)</li>
          <li>📅 25 May – International Potluck Night</li>
        </ul>
      </section>

      {/* 💡 Panel de ayuda */}
      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Need Help?</h2>
        <p className="text-sm text-gray-700 mb-2">
          Ask a quick question and another student or coordinator might help you out.
        </p>
        <Link to="#" className="inline-block px-4 py-2 bg-accent text-white rounded hover:bg-accent/80 text-sm">Ask a question</Link>
      </section>

    </div>
  );
}

export default Institute;
