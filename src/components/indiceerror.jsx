import React, {Fragment} from "react";
import Paper from '@material-ui/core/Paper';
import ImageList from '@material-ui/core/ImageList';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider'

const colorIndice = (x) => {
  return (isNaN(x) ? "default" : (Math.abs(x) > 1 ? "secondary" : "primary"));
}; //si el indice es mayor a 1 se coloca color secondary que es rojo si es menor se coloca primary que es azul

const variantIndice = (x) => {
  return (isNaN(x) ? "default" : (Math.abs(x) > 1 ? "default" : "outlined"));
}; //lo mismo de arriba

const IndiceError = props => {
    const indices = props.indices.map((value) => (isNaN(value) ? "-" : value));
    const arrPromedio = (arr) => arr.reduce((a,b) => a + b, 0) / arr.length

    // remove the NaN values from the indices array using the filter() method
    const filteredIndices = indices.filter((value) => !isNaN(value));

    // find the minimum and maximum values in the filteredIndices array
    const minIndex = filteredIndices.length ? Math.min(...filteredIndices) : "-";
    const maxIndex = filteredIndices.length ? Math.max(...filteredIndices) : "-";

      // calculate the average of the filteredIndices array, and provide a default value of "-" if the result is NaN
    const average = arrPromedio(filteredIndices);
    const averageIndex = Number.isNaN(average) ? "-" : average.toFixed(2);
    
    return (
      <Fragment >
        <Paper className="p-4">
          <h5 style={{textAlign: "center"}}>Indices de Error </h5>
          <hr/>
          {/* Aca comienza la lista de indices de error */}
          <ImageList style={{ textAlign: "center" }} rowHeight={34.67}>
            {indices.map((index, i) => (
              <div className="p" key={i}>
                <Chip
                  avatar={<Avatar>{i + 1}</Avatar>}
                  label={index}
                  color={colorIndice(index)}
                  variant={variantIndice(index)}
                />
              </div>
            ))}
          </ImageList>
          {/* Aca termina la lista de indices de error */}
          <Grid className="mt-2" container spacing={1} style={{textAlign: "center"}}>
            <Grid container direction="row" justifyContent="center" className="pb-1" alignItems="stretch">
              <Grid item xs={6} ><Paper className="p-2" >Rango</Paper></Grid>
              <Divider orientation="vertical"/>
              <Grid item xs={5} ><Paper className="p-2" style={{height: "100%"}}>{minIndex} a {maxIndex}</Paper></Grid>
            </Grid>
            <Grid container direction="row" justifyContent="center" className="pb-1" alignItems="stretch">
              <Grid item xs={6} ><Paper className="p-2">Promedio</Paper></Grid>
              <Divider orientation="vertical"/>
              <Grid item xs={5} ><Paper className="p-2" style={{height: "100%"}}>{averageIndex}</Paper></Grid>
            </Grid>
          </Grid>
        </Paper>
      </Fragment>
    )};

export default IndiceError;