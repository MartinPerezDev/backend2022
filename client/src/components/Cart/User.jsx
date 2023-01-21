import React, { useContext } from "react";
import { Grid } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import { AuthContext } from "./../../context/AuthContext";
import Avatar from '@mui/material/Avatar';

export const User = () => {
  const { user } = useContext(AuthContext);

  return (
    <Grid item xs={6}>
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Datos del comprador
        </Typography>
        <List>
          <ListItem>
            <Avatar
              alt="Remy Sharp"
              src={user.image}
              sx={{ width: 56, height: 56 }}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary={`nombre: ${user.name}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`email: ${user.email}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`direccion de envio: ${user.address}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`telefono de contacto: ${user.telephone}`} />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
};
