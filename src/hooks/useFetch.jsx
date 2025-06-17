import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function useFetch(url, query = "") {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${url}?${query}`);
        console.log(data);
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setData([]);
        toast.error(error?.message);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [query, url]);

  return { isLoading, data };
}

export default useFetch;
