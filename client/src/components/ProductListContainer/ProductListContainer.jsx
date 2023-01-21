import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { ProductList } from "./ProductList";
import "./ProductListContainer.scss";
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

export const ProductListContainer = () => {

  const [products, setProducts] = useState([])

  const getProducts = async()=>{
    try {
      const res = await axios.get("http://localhost:8080/api/product")
      setProducts(res.data)
    } catch (error) {
      console.log("Error to get products")
    }
  }

  useEffect(() => {
    getProducts()
  }, [])
  

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Grid container spacing={8}>
        <ProductList products={products} />
      </Grid>
    </Container>
  );
};
