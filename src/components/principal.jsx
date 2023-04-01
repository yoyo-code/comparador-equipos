import React from "react";
import Grid from '@material-ui/core/Grid';
import Contenido from "./tabla-core";

// estilos de la pagina

// comienzo de la app
const MenuLateral = () => {
  return (
    <Grid style={{padding: 5}}>
      <Contenido padding={2}/>
    </Grid>
  );
};

export default MenuLateral;
