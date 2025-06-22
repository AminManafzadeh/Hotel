import { Link } from "react-router-dom";
import useBookmarks from "../Context/useBookmarks";
import { HiTrash } from "react-icons/hi";

function BookmarkList() {
  const { bookmarks, isLoading, currBookmark, deleteBookmark } = useBookmarks();

  const handleDelete = async (e, id) => {
    e.preventDefault();

    await deleteBookmark(id);
  };
  if (isLoading) return <p>Loading ...</p>;
  if (!bookmarks.length) return <p>There is no bookmarked location</p>;

  return (
    <div>
      <h2>Bookmark List</h2>
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
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default BookmarkList;
