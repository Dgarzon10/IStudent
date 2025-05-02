import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import HousingCard from "../components/Housing/HousingCard";
import HousingMap from "../components/Housing/HousingMap";
import HousingModal from "../components/Housing/HousingModal";

function Housing() {
  const [selectedHousing, setSelectedHousing] = useState(null);
  const [housingList, setHousingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState("");
  const { token } = useAuth();
  const navigate = useNavigate();
  
  
  useEffect(() => {
    const fetchHousing = async () => {
      try {
        const res = await axiosInstance.get("/housing");
        setHousingList(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load housing listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchHousing();
  }, []);

  const handleDeletePost = (id) => {
    setHousingList((prev) => {
      const updated = prev.filter((h) => h.id !== id);
      // Si el ítem eliminado era el seleccionado → lo reseteamos
      if (id === selectedHousing) {
        setSelectedHousing(null);
      }
      return updated;
    });
  };
  


  return (
    <div className="flex flex-col h-screen bg-background">
      {/* 🔼 Filtro + botón */}
      <div className="w-full p-4 bg-white border-b border-gray-200 flex gap-4 items-center">
        <button className="px-4 py-2 border rounded">Price</button>
        <button className="px-4 py-2 border rounded">Location</button>
        <button className="px-4 py-2 border rounded">Services</button>
        <button className="px-4 py-2 border rounded">Rooms</button>
        {token && (
          <div className="ml-auto">
            <button
              onClick={() => navigate("/housing/new")}
              className="bg-primary text-white px-4 py-2 rounded shadow hover:bg-primary/90 transition"
            >
              + Add New Housing
            </button>
          </div>
        )}
      </div>

      {/* 🔽 Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* 🧱 Listado */}
        <div className="w-[65%] overflow-y-auto p-4 space-y-4">
          {loading && <div className="text-center text-gray-600">Loading posts...</div>}
          {error && <div className="text-center text-red-500">{error}</div>}

          {housingList.map((item) => (
            <HousingCard
              key={item.id}
              data={item}
              onClick={() => {
                setSelectedData(item);
                setModalOpen(true);
              }}
              onHover={() => setSelectedHousing(item.id)}
              isSelected={selectedHousing === item.id}
              onDelete={handleDeletePost}
            />
          ))}
        </div>

        {/* 🗺️ Mapa */}
        <div className="w-[35%] border-l border-gray-200 bg-gray-100 p-4">
          <HousingMap locations={housingList} selectedId={selectedHousing} />
        </div> 
        {/* 🗺️ Mapa */}
        {/* <div className="w-[35%] bg-gray-100 p-4 flex items-center justify-center border-l">
          <p className="text-gray-500">Mapa deshabilitado temporalmente</p>
        </div> */}

      </div>

      {/* 🪟 Modal */}
      {modalOpen && (
        <HousingModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          data={selectedData || {}} // ⬅️ Garantiza que haya data
        />
      )}
    </div>
  );
}

export default Housing;
