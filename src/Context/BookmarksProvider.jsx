import { createContext, useCallback, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000";
export const BookmarksContext = createContext(null);

function BookmarksProvider({ children }) {
  const [currBookmark, setCurrBookmark] = useState({});
  const [isLoadingCurrBookmark, setIsLoadingCurrBookmark] = useState(false);

  const { data: bookmarks, isLoading } = useFetch(`${BASE_URL}/bookmarks`, "");

  const getBookmark = useCallback(async (id) => {
    setIsLoadingCurrBookmark(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrBookmark(data);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoadingCurrBookmark(false);
    }
  }, []);

  const createBookmark = useCallback(async (newBookmark) => {
    setIsLoadingCurrBookmark(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookmark);
      console.log(data);
      setCurrBookmark(data);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoadingCurrBookmark(false);
    }
  }, []);

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        isLoading,
        getBookmark,
        currBookmark,
        isLoadingCurrBookmark,
        createBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export default BookmarksProvider;
