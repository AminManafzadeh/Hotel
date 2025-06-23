import { createContext, useCallback, useEffect, useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = "http://localhost:5000";
export const BookmarksContext = createContext(null);

const initialState = {
  bookmarks: [],
  isLoading: false,
  currBookmark: {},
  error: null,
};

function bookmarkReducer(state, { type, payload }) {
  switch (type) {
    case "loading": {
      return { ...state, isLoading: true };
    }
    case "bookmarks/loaded": {
      return { ...state, bookmarks: payload, isLoading: false };
    }
    case "bookmark/loaded": {
      return { ...state, isLoading: false, currBookmark: payload };
    }
    case "bookmark/created": {
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, payload],
        currBookmark: payload,
      };
    }
    case "bookmark/deleted": {
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== payload),
        currBookmark: {},
      };
    }
    case "rejected": {
      return { ...state, isLoading: false, error: payload };
    }

    default:
      throw new Error("Unknown action");
  }
}

function BookmarksProvider({ children }) {
  const [{ bookmarks, isLoading, currBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );

  useEffect(() => {
    async function fetchBookmarks() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error?.message);
        dispatch({
          type: "rejected",
          payload: "an error occured in loading bookmarks",
        });
      }
    }

    fetchBookmarks();
  }, []);

  const getSingleBookmarkInfo = useCallback(
    async (id) => {
      if (Number(id) === currBookmark?.id) return;

      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
        dispatch({ type: "bookmark/loaded", payload: data });
      } catch (error) {
        toast.error(error?.message);
        dispatch({
          type: "rejected",
          payload: "an error occured in loading bookmark",
        });
      }
    },
    [currBookmark]
  );

  const deleteBookmark = useCallback(async (id) => {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (error) {
      toast.error(error?.message);
      dispatch({ type: "rejected", payload: "an error in deleting bookmark" });
    }
  }, []);

  const createBookmark = useCallback(async (newBookmark) => {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks`, newBookmark);
      console.log(data);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      toast.error(error?.message);
      dispatch({ type: "rejected", payload: "an error in creatting bookmark" });
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
