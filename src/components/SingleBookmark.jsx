import { useNavigate, useParams } from "react-router-dom";
import useBookmarks from "../Context/useBookmarks";
import { useEffect } from "react";
import { HiTrash } from "react-icons/hi";

function SingleBookmark() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getSingleBookmarkInfo, currBookmark, isLoading } = useBookmarks();

  useEffect(() => {
    getSingleBookmarkInfo(id);
  }, [id, getSingleBookmarkInfo]);

  if (isLoading) return <p>Loading ...</p>;

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        style={{ marginBottom: "1rem" }}
        className="btn btn--back"
      >
        &larr; Back
      </button>
      <h2>{currBookmark?.cityName}</h2>
      <div style={{ marginTop: "1rem" }} className="bookmarkItem">
        <div>
          &nbsp; <strong>{currBookmark.cityName}</strong> &nbsp;
          <span>{currBookmark.country}</span>
        </div>
        <button>
          <HiTrash className="trash" />
        </button>
      </div>
    </div>
  );
}

export default SingleBookmark;
