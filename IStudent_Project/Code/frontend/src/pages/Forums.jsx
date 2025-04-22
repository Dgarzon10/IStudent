import HousingCard from "../components/HousingCard";
import ForumCard from "../components/ForumCard";

function Forum() {
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
        <div className="grid  gap-6">
          {/* Forums Card */}
          <ForumCard />
          <ForumCard />
          <ForumCard />
          <ForumCard />

          {/* Housing Card */}
          <HousingCard />
        </div>
      </div>

    );
  
  }
  
  export default Forum;
  