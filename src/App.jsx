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
import BookmarkLayout from "./components/BookmarkLayout";
import BookmarkList from "./components/BookmarkList";
import BookmarksProvider from "./Context/BookmarksProvider";
import SingleBookmark from "./components/SingleBookmark";
import AddBookmark from "./components/AddBookmark";
import AuthProvider from "./Context/AuthProvider";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
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
              <Route
                path="/bookmarks"
                element={
                  <ProtectedRoute>
                    <BookmarkLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<BookmarkList />} />
                <Route path="add" element={<AddBookmark />} />
                <Route path=":id" element={<SingleBookmark />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </HotelProvider>
      </BookmarksProvider>
    </AuthProvider>
  );
}

export default App;
