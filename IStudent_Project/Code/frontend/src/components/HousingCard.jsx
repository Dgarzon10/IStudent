import { useState } from "react";

function HousingCard({ onHover, isSelected }) {
  const [imageIndex, setImageIndex] = useState(0);
  const images = [
    "https://source.unsplash.com/random/400x300?house",
    "https://source.unsplash.com/random/400x300?room",
  ];

  return (
    <div
      onMouseEnter={onHover}
      className={`flex border rounded-lg overflow-hidden shadow-sm transition hover:shadow-md bg-white ${isSelected ? "ring-2 ring-accent" : ""}`}
    >
      {/* 📸 Carrusel de imágenes */}
      <div className="w-2/5 bg-gray-100 relative">
        <img
          src={images[imageIndex]}
          alt="housing"
          className="w-full h-full object-cover"
        />
        {/* Flechas (puedes mejorar luego) */}
        <div className="absolute bottom-2 right-2 flex gap-2">
          <button onClick={() => setImageIndex((i) => (i + 1) % images.length)} className="text-white text-sm bg-black/50 px-2 py-1 rounded">›</button>
        </div>
      </div>

      {/* 📝 Info propiedad */}
      <div className="w-3/5 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-primary">Beautiful shared apartment</h3>
          <p className="text-sm text-gray-600 mb-2">📍 Close to downtown, 10min walk from campus</p>
          <ul className="flex gap-3 text-sm text-gray-500 flex-wrap">
            <li>2 Rooms</li>
            <li>1 Bathroom</li>
            <li>WiFi</li>
            <li>Laundry</li>
          </ul>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-accent">$450/month</span>
          <button className="bg-primary text-white px-4 py-2 rounded">Contact</button>
        </div>
      </div>
    </div>
  );
}

export default HousingCard;
