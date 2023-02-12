import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function ProductList() {
  let keys = useRef([]);
  let [data, setData] = useState([]);
  let [filters, setFilters] = useState({});
  let [pageNumber, setPageNumber] = useState(1);
  let [numberOfItems, setNumberOfItems] = useState(12);
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = useParams();

  useEffect(() => {
    async function fetchData() {
      return await fetch(`http://localhost:5000/${product}`).then((result) =>
        result.status === 404 ? navigate("/404") : result.json()
      );
    }

    fetchData().then((res) => {
      keys.current = res;
      let aux = {}
      for (const prop in keys.current) 
        if (prop === "price")
          aux.price = keys.current[prop]
        else
          aux[prop] = []
      setFilters(aux)
    });

  }, [location, navigate, product]);

  useEffect(() => {
    async function fetchData() {
      return await fetch(`http://localhost:5000/${product}`, {
        body: JSON.stringify({ pageNumber, numberOfItems, filters }),
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }).then((result) =>
        result.status === 404 ? navigate("/404") : result.json()
      );
    }

    fetchData().then((res) => setData(res));
  }, [pageNumber, numberOfItems, filters, location, product, navigate]);

  console.log(keys.current, filters, data);
  return <>{product}</>;
}
