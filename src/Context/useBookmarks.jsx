import { useContext } from "react";
import { BookmarksContext } from "./BookmarksProvider";

function useBookmarks() {
  return useContext(BookmarksContext);
}

export default useBookmarks;
