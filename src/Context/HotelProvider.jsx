import { createContext, useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = "http://localhost:5000/hotels";

export const HotelContext = createContext(null);

function HotelProvider({ children }) {
  const [searchParams] = useSearchParams();
  const [currHotel, setCurrHotel] = useState({});
  const [isLoadingCurrHotel, setIsLoadingCurrHotel] = useState(false);
  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;

  const { data: hotels, isLoading } = useFetch(
    `${BASE_URL}`,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  const getSingleHotelInfo = useCallback(async (id) => {
    setIsLoadingCurrHotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrHotel(data);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoadingCurrHotel(false);
    }
  }, []);

  return (
    <HotelContext.Provider
      value={{
        hotels,
        isLoading,
        getSingleHotelInfo,
        isLoadingCurrHotel,
        currHotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export default HotelProvider;
