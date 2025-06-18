import { Outlet } from "react-router-dom";
import Map from "./Map";
import useHotels from "../Context/useHotels";

function AppLayout() {
  const { hotels, isLoading } = useHotels();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <div className="mapContainer">
        <Map markerLocations={hotels} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default AppLayout;
