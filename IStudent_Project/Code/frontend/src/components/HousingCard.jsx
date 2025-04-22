import { Link } from "react-router-dom";

function HousingCard() {
  return (
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md">
    <h2 className="text-2xl font-semibold text-primary mb-4">Housing</h2>
    <p className="text-text mb-4">20 available apartments matching your filters.</p>
    <Link className="text-accent hover:underline" to="/housing">See Housing</Link>
  </div>
  );
}

export default HousingCard;
