import useBookmarks from "../Context/useBookmarks";
import { Link } from "react-router-dom";

function getFlagEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Bookmarks() {
  const { bookmarks, isLoading, currBookmark } = useBookmarks();

  if (isLoading) return <p>Loading ...</p>;

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Bookmarks List</h2>
      <div className="bookmarkList">
        {bookmarks?.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currBookmark?.id ? "current-bookmark" : ""
                }`}
              >
                <div>
                  {getFlagEmoji(item.countryCode)}
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmarks;
