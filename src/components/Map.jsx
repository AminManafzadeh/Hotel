import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../hooks/useUrlLocation";

function Map({ markerLocations, isLoading }) {
  const [mapCenter, setMapCenter] = useState([51, -3]);
  const [lat, lng] = useUrlLocation();

  useEffect(() => {
    if (lat || lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  if (isLoading) return <p>Loading ...</p>;

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <DetectClick />
        <ChangeCenter position={mapCenter} />
        {markerLocations.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) =>
      navigate(`/bookmarks/add/?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
  return null;
}
