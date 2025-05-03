import { toast } from "react-toastify";
import axiosInstance from "../../api/axiosInstance";
import { useState } from "react";
import { useAuth } from "../AuthContext";

function HousingCard({ data, onHover, isSelected, onClick, onDelete }) {
  const [imageIndex, setImageIndex] = useState(0);
  const { userId, userRole } = useAuth();
  const isAdmin = userRole === "admin";
  

  const {
    id,
    propertyType,
    price,
    location,
    body,
    bedrooms,
    bathrooms,
    services = [],
    imageUrls = [],
    user = {},
  } = data;

  const ownerId = user.id;
  const images =
    imageUrls.length > 0
      ? imageUrls
      : ["https://source.unsplash.com/random/400x300?housing"];

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/housing/${id}`);
      toast.success("Post deleted!");
      onDelete(id); 
    } catch (err) {
      toast.error("Error deleting post");
      console.error("Delete failed:", err);
    }
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={onHover}
      className={`flex border rounded-lg overflow-hidden shadow-sm transition hover:shadow-md bg-white ${
        isSelected ? "ring-2 ring-accent" : ""
      }`}
    >
      {/* Carrusel */}
      <div className="w-2/5 bg-gray-100 relative">
        <img
          src={images[imageIndex]}
          alt="housing"
          className="w-full h-full object-cover"
        />
        {images.length > 1 && (
          <div className="absolute bottom-2 right-2 flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setImageIndex((i) => (i + 1) % images.length);
              }}
              className="text-white text-sm bg-black/50 px-2 py-1 rounded"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="w-3/5 p-4 flex flex-col justify-between">
        {/* Título + Botón eliminar alineados */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-primary">
            {propertyType || "Shared Apartment"}
          </h3>
          {(parseInt(ownerId) === parseInt(userId) || isAdmin) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
              className="text-sm text-red-600 hover:bg-red-100 px-2 py-1 rounded transition-transform active:scale-95"
            >
              Delete
            </button>
          )}
        </div>

        <p className="text-sm text-gray-600 mb-2">📍 {location}</p>
        <p className="text-xs text-gray-500 mb-2">{body}</p>

        <ul className="flex gap-3 text-sm text-gray-500 flex-wrap">
          <li>{bedrooms} Rooms</li>
          <li>{bathrooms} Bath</li>
          {services.slice(0, 4).map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-accent">${price}/Week</span>
          <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-transform active:scale-95">
            Contact
          </button>
        </div>
      </div>

    </div>
  );
}

export default HousingCard;
