import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000";

export const BookmarksContext = createContext(null);

function BookmarksProvider({ children }) {
  const [currBookmark, setCurrBookmark] = useState({});
  const [bookmarks, setBookmarks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchBookmarks() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        setBookmarks(data);
      } catch (error) {
        toast.error(error?.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchBookmarks();
  }, []);

  const getSingleBookmarkInfo = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrBookmark(data);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteBookmark = useCallback(async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      setBookmarks((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createBookmark = useCallback(async (newBookmark) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookmark);
      console.log(data);
      setBookmarks((prev) => [...prev, data]);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        isLoading,
        currBookmark,
        getSingleBookmarkInfo,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export default BookmarksProvider;
