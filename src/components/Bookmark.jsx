import Map from "./Map";

function Bookmark() {
  return (
    <div className="appLayout">
      <div className="sidebar">
        <div>bookmark list</div>
      </div>
      <div className="mapContainer">
        <Map markerLocations={[]} />
      </div>
    </div>
  );
}

export default Bookmark;
