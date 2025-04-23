import HousingCard from "../components/HousingCard";
import { useState } from "react";

function Housing() {
  const [selectedHousing, setSelectedHousing] = useState(null);

  return (
    <div className="flex flex-col h-screen bg-background">

      {/* 🔼 Barra de filtros */}
      <div className="w-full p-4 bg-white border-b border-gray-200 flex gap-4 items-center">
        <button className="px-4 py-2 border rounded">Price</button>
        <button className="px-4 py-2 border rounded">Location</button>
        <button className="px-4 py-2 border rounded">Services</button>
        <button className="px-4 py-2 border rounded">Rooms</button>
      </div>

      {/* 🧱 Contenido dividido */}
      <div className="flex flex-1 overflow-hidden">

        {/* 🧱 Lista HousingCards */}
        <div className="w-[65%] overflow-y-auto p-4 space-y-4">
          {[1, 2, 3].map((id) => (
            <HousingCard
              key={id}
              onHover={() => setSelectedHousing(id)}
              isSelected={selectedHousing === id}
            />
          ))}
        </div>

        {/* 🗺️ Mapa derecho */}
        <div className="w-[35%] border-l border-gray-200 bg-gray-100 p-4">
          <div className="w-full h-full rounded bg-white flex items-center justify-center">
            <span className="text-gray-500">🗺️ Mapa interactivo (próximamente)</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Housing;
