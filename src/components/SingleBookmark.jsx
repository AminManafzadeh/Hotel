import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useBookmarks from "../Context/useBookmarks";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const { id } = useParams();
  const { getBookmark, currBookmark, isLoadingCurrBookmark } = useBookmarks();
  const navigate = useNavigate();

  useEffect(() => {
    getBookmark(id);
  }, [id, getBookmark]);

  if (isLoadingCurrBookmark) return <p>Loading ...</p>;

  return (
    <div>
      <button
        style={{ marginBottom: "1rem" }}
        onClick={() => navigate(-1)}
        className="btn btn--back"
      >
        &larr; Back
      </button>
      <h2 style={{ marginBottom: "1rem" }}>{currBookmark?.cityName}</h2>
      <div className="bookmarkItem">
        <ReactCountryFlag svg countryCode={currBookmark.countryCode} />
        &nbsp; <strong>{currBookmark.cityName}</strong> &nbsp;
        <span>{currBookmark.country}</span>
      </div>
    </div>
  );
}

export default SingleBookmark;
