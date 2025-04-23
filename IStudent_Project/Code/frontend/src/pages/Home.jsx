import { Link } from 'react-router-dom';
import ForumCard from '../components/ForumCard';
import HousingFilterCard from '../components/HousingFilterCard';

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

          <ForumCard />


          {/* Housing Card */}
          <HousingFilterCard />
        </div>
      </div>
  );
}

export default Home;
