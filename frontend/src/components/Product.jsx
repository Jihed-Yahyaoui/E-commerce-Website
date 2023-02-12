import React from "react";
import { useParams } from "react-router-dom";

export default function Product() {
  const { product, id } = useParams();
  return (
    <>
      {product}
      {id}
    </>
  );
}
