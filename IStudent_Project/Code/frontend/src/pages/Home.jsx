import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">

        {/* Intro Section */}
        <div className="mb-12 flex flex-col items-center justify-center text-center p-6 bg-gray-100 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-primary mb-4">Welcome to IStudent Hub</h1>
          <p className="text-text text-lg max-w-2xl">
            This platform connects international students with housing, forums, and institutes.
            Explore the most discussed topics or find your next home.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Forums Card */}
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md">
            <h2 className="text-2xl font-semibold text-primary mb-4">Forums</h2>
            <ul className="mb-4">
              <li className="text-text">Most Discussed: Forum 1</li>
              <li className="text-text">Most Discussed: Forum 2</li>
            </ul>
            <Link className="text-accent hover:underline" to="/forums">Go to Forums</Link>
          </div>

          {/* Housing Card */}
          <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md">
            <h2 className="text-2xl font-semibold text-primary mb-4">Housing</h2>
            <p className="text-text mb-4">20 available apartments matching your filters.</p>
            <Link className="text-accent hover:underline" to="/housing">See Housing</Link>
          </div>
        </div>
      </div>
  );
}

export default Home;
