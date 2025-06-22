import { Outlet } from "react-router-dom";
import Map from "./Map";
import useBookmarks from "../Context/useBookmarks";

function BookmarkLayout() {
  const { bookmarks, isLoading } = useBookmarks();
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <div className="mapContainer">
        <Map markerLocations={bookmarks} isLoading={isLoading} />
      </div>
    </div>
  );
}

export default BookmarkLayout;
