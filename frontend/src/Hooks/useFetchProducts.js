import { useState, useEffect } from "react";
import axios from "axios";

const useFetchProducts = () => {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(`/products`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return [data];
};

export default useFetchProducts;
