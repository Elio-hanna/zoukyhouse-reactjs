import { useState, useEffect } from "react";
import axios from "axios";

const useFetchCategories = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/categories`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return [data];
};

export default useFetchCategories;
