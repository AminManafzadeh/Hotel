import { useNavigate } from "react-router-dom";
import useUrlLocation from "../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useBookmarks from "../Context/useBookmarks";

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_GEOCODING_URL =
  "https://us1.api-bdc.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const navigate = useNavigate();
  const { createBookmark } = useBookmarks();

  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchData() {
      setIsLoadingGeoCoding(true);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );

        if (!data.countryCode)
          throw new Error(
            "This location is not a city! please click somewhere else on map"
          );

        setCityName(data?.city || "");
        setCountry(data?.countryName || "");
        setCountryCode(getFlagEmoji(data?.countryCode));
        console.log(data);
      } catch (error) {
        toast.error(error?.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }

    fetchData();
  }, [lat, lng]);

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
  };

  if (isLoadingGeoCoding) return <p>Loading ...</p>;

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Bookmark New Location</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formControl">
          <label htmlFor="cityName">CityName :</label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            name="cityName"
            id="cityName"
          />
        </div>

        <div className="formControl">
          <label htmlFor="country">CityName :</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            name="country"
            id="country"
          />
          <span className=" flag">{countryCode}</span>
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

export default AddNewBookmark;
