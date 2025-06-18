import { useParams } from "react-router-dom";
import useHotels from "../Context/useHotels";
import { useEffect } from "react";

function SingleHotel() {
  const { id } = useParams();
  const { getSingleHotelInfo, isLoadingCurrHotel, currHotel } = useHotels();

  useEffect(() => {
    getSingleHotelInfo(id);
  }, [id, getSingleHotelInfo]);

  if (isLoadingCurrHotel) return <p>Loading ...</p>;

  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currHotel?.name}</h2>
        <div>
          {currHotel?.number_of_reviews} reviews &bull;{" "}
          {currHotel?.smart_location}
        </div>
        <img src={currHotel?.xl_picture_url} alt={currHotel?.name} />
      </div>
    </div>
  );
}

export default SingleHotel;
