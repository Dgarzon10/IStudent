import { Link } from "react-router-dom";

function HousingFilterCard() {
  return (
    <div className="max-w-2xl rounded-lg overflow-hidden shadow-md border border-gray-200">
      {/* 🏠 Parte superior (título + filtros) */}
      <div className="bg-gray-100 p-6">
        <h2 className="text-2xl font-bold text-primary mb-1">Housing</h2>
        <p className="text-sm text-gray-600 mb-4">
          Explore available housing options for international students near campus.
        </p>

        {/* Filtros básicos */}
        <div className="flex gap-4 mb-2">
          <select className="border rounded p-2 text-sm text-gray-700 w-1/2">
            <option>City</option>
            <option>Madrid</option>
            <option>Berlin</option>
            <option>Toronto</option>
          </select>
          <select className="border rounded p-2 text-sm text-gray-700 w-1/2">
            <option>Price Range</option>
            <option>$200 - $500</option>
            <option>$500 - $800</option>
            <option>$800+</option>
          </select>
        </div>
      </div>

      {/* 📊 Parte inferior (match + mini-card) */}
      <div className="bg-white p-6">
        {/* Total de resultados */}
        <p className="text-sm text-gray-600 mb-4">
          1,245 results match your filters.
        </p>

        {/* Mini-card resultado */}
        <div className="border border-gray-100 p-4 rounded hover:bg-gray-50 transition">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-700 font-medium">📍 Near University Station</span>
            <span className="text-accent font-bold">$530/mo</span>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            Cozy 1-bedroom apartment with private bathroom, shared kitchen, WiFi and laundry.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-4">
          <Link to="/housing" className="text-accent hover:underline text-sm">
            View all housing options →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HousingFilterCard;
