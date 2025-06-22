import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../hooks/useUrlLocation";
import axios from "axios";
import toast from "react-hot-toast";
import useBookmarks from "../Context/useBookmarks";

const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

function AddBookmark() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [lat, lng] = useUrlLocation();
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const { createBookmark } = useBookmarks();

  console.log(lat, lng);

  useEffect(() => {
    if (!lat || !lng) return;
    setIsLoadingGeoCoding(true);
    async function fetchLocationData() {
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );

        if (!data.countryCode)
          throw new Error(
            "This location is not a city !! please click somewhere else"
          );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        toast.error(error?.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }

    fetchLocationData();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.prevventDefault();
    if (!cityName || !country) return;

    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };

    await createBookmark(newBookmark);
    navigate("/bookmarks");
  };

  const handleBack = (e) => {
    e.prevventDefault();
    navigate(-1);
  };

  if (isLoadingGeoCoding) return <p>Loading ...</p>;
  return (
    <div>
      <h2 style={{ marginBottom: "1.5rem" }}>Bookmark new Location</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formControl">
          <label style={{ marginBottom: "1rem" }} htmlFor="cityName">
            CityName :
          </label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            id="cityName"
            name="cityName"
          />
        </div>

        <div className="formControl">
          <label style={{ marginBottom: "0.5rem" }} htmlFor="country">
            Country :
          </label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            id="country"
            name="country"
          />
        </div>

        <div className="buttons">
          <button onClick={handleBack} className="btn btn--back">
            &larr; Back
          </button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
}

export default AddBookmark;
