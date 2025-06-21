import { useContext } from "react";
import { BookmarksContext } from "./BookmarksProvider";

export default function useBookmarks() {
  return useContext(BookmarksContext);
}
