import { ListProducts } from "./ListProducts";
import Box from "@mui/material/Box";
import { User } from "./User";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import { useContext } from 'react';
import { CartContext } from './../../context/CartContext';

export const Cart = () => {
  const { cart, sendOrder } = useContext(CartContext)

  return (
    <div>
      <Grid container spacing={2}>
        <ListProducts />
        <User />
      </Grid>
      {
        cart.length !==0 && <Button variant="contained" onClick={sendOrder}>Comprar</Button>
      }
    </div>
  );
};
