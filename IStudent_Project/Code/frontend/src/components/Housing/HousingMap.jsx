import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

const defaultIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [30, 30],
});

const selectedIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/535/535239.png",
  iconSize: [36, 36],
});

function FlyToMarker({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, { duration: 0.5 });
    }
  }, [position, map]);
  return null;
}

function HousingMap({ locations, selectedId }) {
  const defaultCenter = [-37.814305, 144.963138];
  const selectedItem = locations.find((item) => item.id === selectedId);
  const selectedPosition =
    selectedItem?.latitude && selectedItem?.longitude
      ? [selectedItem.latitude, selectedItem.longitude]
      : null;
  
  

  return (
    <MapContainer
      center={defaultCenter}
      zoom={13}
      scrollWheelZoom={false}
      className="w-full h-full rounded z-0"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {locations.map((item) => {
        if (!item.latitude || !item.longitude) return null;
        const position = [item.latitude, item.longitude];
        const isSelected = item.id === selectedId;

        return (
          <Marker
            key={item.id}
            position={position}
            icon={isSelected ? selectedIcon : defaultIcon}
          >
            <Popup>
              <strong>{item.propertyType || "Housing"}</strong><br />
              {item.location}<br />
              ${item.price}
            </Popup>
          </Marker>
        );
      })}
      {selectedPosition && <FlyToMarker position={selectedPosition} />}
    </MapContainer>
  );
}

export default HousingMap;
