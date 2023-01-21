
import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import { useContext } from 'react';
import { CartContext } from './../../context/CartContext';

export const Product = ({_id, name, description, image, price}) => {

  const product = { _id, name, description, image, price }
  const { addProduct } = useContext(CartContext)  

  const addToCart =()=>{
    addProduct(product)
  }

  return (
    <Grid item key={_id} xs={12} sm={6} md={3}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardMedia
          component="img"
          image={image}
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h2">
            {name}
          </Typography>
          <Typography>
            {description}
          </Typography>
          <Typography my={1}>
            ${price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={addToCart} size="small" variant="outlined" startIcon={<AddShoppingCartIcon />}>Añadir</Button>
          <Button size="small" variant="outlined" startIcon={<InfoIcon />}>Info</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
