import { useContext } from "react";
import { HotelContext } from "./HotelProvider";

function useHotels() {
  return useContext(HotelContext);
}

export default useHotels;
