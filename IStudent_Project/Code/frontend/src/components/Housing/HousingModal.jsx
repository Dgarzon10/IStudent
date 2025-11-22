import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { X } from "lucide-react";

function HousingModal({ isOpen, onClose, data }) {
  const [imageIndex, setImageIndex] = useState(0);
  
  const {
    propertyType = "",
    price = 0,
    location = "",
    body = "",
    bedrooms = 0,
    bathrooms = 0,
    services = [],
    imageUrls = [],
  } = data || {};
  

  const images = imageUrls.length > 0 ? imageUrls : [
    "https://source.unsplash.com/random/800x600?house",
  ];

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center bg-black/60 p-4">
        <Dialog.Panel className="w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-lg">
          
          {/* 🖼 Zona 1: Carrusel de imágenes */}
          <div className="relative h-96 w-full bg-gray-200">
            <img
              src={images[imageIndex]}
              alt="Housing"
              className="object-cover w-full h-full"
            />
            <div className="absolute top-4 right-4">
              <button onClick={onClose} className="bg-white/80 hover:bg-white p-2 rounded-full">
                <X />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 bg-white/70 text-primary px-4 py-2 rounded">
              <h2 className="text-xl font-bold">${price}/month</h2>
              <p className="text-sm">{location}</p>
            </div>
            {images.length > 1 && (
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => setImageIndex((i) => (i - 1 + images.length) % images.length)}
                  className="bg-white/70 px-3 py-1 rounded"
                >
                  ‹
                </button>
                <button
                  onClick={() => setImageIndex((i) => (i + 1) % images.length)}
                  className="bg-white/70 px-3 py-1 rounded"
                >
                  ›
                </button>
              </div>
            )}
          </div>

          {/* 📄 Zona 2: Info extendida */}
          <div className="p-6 space-y-4">
            <h3 className="text-2xl font-semibold text-primary">{propertyType}</h3>
            <p className="text-gray-600">{body}</p>

            <ul className="flex gap-6 text-sm text-gray-700 flex-wrap">
              <li>🛏 {bedrooms} Bedrooms</li>
              <li>🛁 {bathrooms} Bathrooms</li>
              <li>📐 Area: {data.area} m²</li>
            </ul>

            <div>
              <h4 className="text-sm font-medium text-gray-800 mb-2">Included Services</h4>
              <ul className="flex flex-wrap gap-3 text-sm text-gray-600">
                {services.map((s, i) => (
                  <li key={i} className="bg-gray-100 px-3 py-1 rounded-full">✔ {s}</li>
                ))}
              </ul>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default HousingModal;
