import * as React from "react";
import { useEffect, useContext, useState } from "react";
import { CartContext } from "./../../context/CartContext";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";

export const ListProducts = () => {
  const { cart, deleteProductIncart } = useContext(CartContext);
  
  return (
    <>
      <Grid item xs={6}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Resumen de compra
            </Typography>
            <List>
              {cart.length !== 0 ? (
                cart.map((res) => {
                  return (
                    <ListItem
                      key={res._id}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => deleteProductIncart(res._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={res.image} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={res.name}
                        secondary={`$${res.price}`}
                      />
                    </ListItem>
                  );
                })
              ) : (
                <ListItem>
                  <ListItemText>No hay productos agregados al carrito</ListItemText>
                </ListItem>
              )}
            </List>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
