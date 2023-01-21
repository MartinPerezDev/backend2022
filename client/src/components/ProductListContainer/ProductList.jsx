import { Grid } from "@mui/material";
import React from "react";
import { Product } from "./Product";

export const ProductList = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <Product key={product._id} {...product} />
      ))}
    </>
  );
};
