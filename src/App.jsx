import { Toaster } from "react-hot-toast";
import "./App.css";
import LocationsList from "./components/LocationsList";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import AppLayout from "./components/AppLayout";
import Hotels from "./components/Hotels";
import HotelProvider from "./Context/HotelProvider";
import SingleHotel from "./components/SingleHotel";
import BookmarkLayout from "./components/BookmarksLayout";
import BookmarksProvider from "./Context/BookmarksProvider";
import Bookmarks from "./components/Bookmarks";
import SingleBookmark from "./components/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark";

function App() {
  return (
    <BookmarksProvider>
      <HotelProvider>
        <Toaster />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LocationsList />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route path="/bookmarks" element={<BookmarkLayout />}>
              <Route index element={<Bookmarks />} />
              <Route path=":id" element={<SingleBookmark />} />
              <Route path="add" element={<AddNewBookmark />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </HotelProvider>
    </BookmarksProvider>
  );
}

export default App;
