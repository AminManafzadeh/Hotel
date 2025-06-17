import { Toaster } from "react-hot-toast";
import "./App.css";
import LocationsList from "./components/LocationsList";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import NotFound from "./components/NotFound";
import AppLayout from "./components/AppLayout";
import Hotels from "./components/Hotels";

function App() {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LocationsList />} />
          <Route path="/hotels" element={<AppLayout />}>
            <Route index element={<Hotels />} />
            <Route path=":id" element={<div>single hotel</div>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
