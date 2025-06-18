import { Link } from "react-router-dom";
import useHotels from "../Context/useHotels";

function Hotels() {
  const { isLoading, hotels, currHotel } = useHotels();
  if (isLoading) return <p>Loading ...</p>;

  return (
    <div>
      <h2>Search Results ({hotels?.length})</h2>
      {hotels?.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
          >
            <div
              className={`searchItem ${
                item.id === currHotel?.id ? "current-hotel" : ""
              }`}
            >
              <img id="hotelsImg" src={item.xl_picture_url} alt={item.name} />
              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  €&nbsp;{item.price} &nbsp;
                  <span>night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;
