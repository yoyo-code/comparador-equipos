import React, {Fragment} from "react";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import regression from 'regression';
import { variance, mean, square, sum, sqrt, divide } from 'mathjs'

const fondo = (c) => {
  return c === "Si" ? {background: "#A4F9CE", height: "100%"} : {background: "#F9A4A4", height: "100%"};
}

const Conclusion = (props) => {
  const errores = props.errores;
  const conclusion = props.conclusion;
  const color = fondo(conclusion(errores))
  const data = props.data;

  const datos = [];
  for (let i = 0; i < data.length; i++) {
    // Check if the x and y values are not NaN
    if (!isNaN(data[i].x) && !isNaN(data[i].y)) {
      datos.push([data[i].x, data[i].y]);
    }
  }

  const datosX = [1,2];
  const datosY = [1,2];
  if (datos.length > 1) {
    // Remove the first two elements from each array
    datosX.shift();
    datosX.shift();
    datosY.shift();
    datosY.shift();

    // Loop through the data and add the values to the arrays
    for (let i = 0; i < datos.length; i++) {
      datosX.push(datos[i][0]);
      datosY.push(datos[i][1]);
    }
  }
  
  // REGRESION LINEAL

  const result = regression.linear(datos);

  // REGRESION DE DEMING

  const varianceX = variance(datosX);
  const varianceY = variance(datosY);
  const meanX = mean(datosX);
  const meanY = mean(datosY);
  const lambda = varianceX / varianceY;

  const restaX = (w) => square(w - meanX);
  const restaY = (z) => square(z - meanY);
  const multi = (r, t) => (r - meanX) * (t - meanY);

  const dU = sum(datosX.map(restaX));
  const dQ = sum(datosY.map(restaY));
  const dP = sum(datosX.map((x, i) => multi(x, datosY[i])));

  const dPendiente = divide(((lambda * dQ) - dU) + (sqrt((square(dU - (lambda * dQ))) + (4 * lambda * square(dP)))), 2 * lambda * dP);
  const dIntercepto = meanY - (dPendiente * meanX);

  // FIN

  // Calculate the jackknife estimates of the slope and intercept
  const n = datosX.length;
  const jackknifeEstimates = [];
  for (let i = 0; i < n; i++) {
      // Remove the ith data point from the dataset
      const datosXWithoutI = datosX.slice(0, i).concat(datosX.slice(i + 1));
      const datosYWithoutI = datosY.slice(0, i).concat(datosY.slice(i + 1));
      
      // Calculate the slope and intercept for the remaining data points
      const varianceXWithoutI = variance(datosXWithoutI);
      const varianceYWithoutI = variance(datosYWithoutI);
      const meanXWithoutI = mean(datosXWithoutI);
      const meanYWithoutI = mean(datosYWithoutI);
      const lambdaWithoutI = varianceXWithoutI / varianceYWithoutI;
      const restaXWithoutI = (w) => square(w - meanXWithoutI);
      const restaYWithoutI = (z) => square(z - meanYWithoutI);
      const multiWithoutI = (r, t) => (r - meanXWithoutI) * (t - meanYWithoutI);
      const dUWithoutI = sum(datosXWithoutI.map(restaXWithoutI));
      const dQWithoutI = sum(datosYWithoutI.map(restaYWithoutI));
      const dPWithoutI = sum(datosXWithoutI.map((x, i) => multiWithoutI(x, datosYWithoutI[i])));
      const slopeWithoutI = divide(((lambdaWithoutI * dQWithoutI) - dUWithoutI) + (sqrt((square(dUWithoutI - (lambdaWithoutI * dQWithoutI))) + (4 * lambdaWithoutI * square(dPWithoutI)))), 2 * lambdaWithoutI * dPWithoutI);
      const interceptWithoutI = meanYWithoutI - (slopeWithoutI * meanXWithoutI);
      
      // Save the estimated slope and intercept
      jackknifeEstimates.push({slope: slopeWithoutI, intercept: interceptWithoutI});
  }

  // Calculate the jackknife estimate of the slope and intercept
  const jackknifeSlope = mean(jackknifeEstimates.map(estimate => estimate.slope));
  const jackknifeIntercept = mean(jackknifeEstimates.map(estimate => estimate.intercept));

  // Calculate the jackknife variance of the slope and intercept
  const jackknifeVarianceSlope = mean(jackknifeEstimates.map(estimate => square(estimate.slope - jackknifeSlope)));
  const jackknifeVarianceIntercept = mean(jackknifeEstimates.map(estimate => square(estimate.intercept - jackknifeIntercept)));

  // Calculate the 95% confidence interval N -2 for the slope and intercept
  const ciSlope = [jackknifeSlope - (1.96 * Math.sqrt(jackknifeVarianceSlope)), jackknifeSlope + (1.96 * Math.sqrt(jackknifeVarianceSlope))];
  const ciIntercept = [jackknifeIntercept - (1.96 * Math.sqrt(jackknifeVarianceIntercept)), jackknifeIntercept + (1.96 * Math.sqrt(jackknifeVarianceIntercept))];

  // Calculate the standard error of the slope and intercept
  const seSlope = Math.sqrt(jackknifeVarianceSlope);
  const seIntercept = Math.sqrt(jackknifeVarianceIntercept);

    return (
      <Fragment>
        <h5 style={{textAlign: "center"}}>Conclusión</h5>
        <hr/>
        <Grid container spacing={1} style={{textAlign: "center"}}>
            <Grid container direction="row" justifyContent="center" className="pb-1" alignItems="stretch">
              <Grid item xs={6} ><Paper className="p-3" >¿Aprueban?</Paper></Grid>
              <Divider orientation="vertical"/>
              <Grid item xs={5} ><Paper className="p-3" style={color}>{conclusion(errores)}</Paper></Grid>
            </Grid>
            <Grid container direction="row" justifyContent="center" className="pb-1" alignItems="stretch">
              <Grid item xs={6} ><Paper className="p-3">{">"}Eta</Paper></Grid>
              <Divider orientation="vertical"/>
              <Grid item xs={5} ><Paper className="p-3" style={{height: "100%"}}>{errores.length}</Paper></Grid>
            </Grid>
            <Grid item xs={12}><hr/><h6 style={{textAlign: "center"}}>Regresión Linear</h6><hr/></Grid>
            <Grid container direction="row" justifyContent="center" className="pb-1" alignItems="stretch">
              <Grid item xs={6} ><Paper className="p-3">Pendiente</Paper></Grid>
              <Divider orientation="vertical"/>
              <Grid item xs={5} ><Paper className="p-3" style={{height: "100%"}}>{result.equation[0]}</Paper></Grid>
            </Grid>
            <Grid container direction="row" justifyContent="center" className="pb-1" alignItems="stretch">
              <Grid item xs={6} ><Paper className="p-3">Intercepto</Paper></Grid>
              <Divider orientation="vertical"/>
              <Grid item xs={5} ><Paper className="p-3" style={{height: "100%"}}>{result.equation[1]}</Paper></Grid>
            </Grid>
            <Grid container direction="row" justifyContent="center" className="pb-1" alignItems="stretch">
              <Grid item xs={6} ><Paper className="p-3">R2</Paper></Grid>
              <Divider orientation="vertical"/>
              <Grid item xs={5} ><Paper className="p-3" style={{height: "100%"}}>{result.r2}</Paper></Grid>
            </Grid>
            <Grid item xs={12}><hr/><h6 style={{textAlign: "center"}}>Regresión de Deming</h6><hr/></Grid>
            <Grid container direction="row" justifyContent="center" className="pb-1" alignItems="stretch">
              <Grid item xs={3} ><Paper className="p-3">Parametros</Paper></Grid>
              <Divider orientation="vertical"/>
              <Grid item xs={2} ><Paper className="p-3" style={{height: "100%"}}>Valor</Paper></Grid>
              <Grid item xs={2} ><Paper className="p-3" style={{height: "100%"}}>StdError</Paper></Grid>
              <Grid item xs={4} ><Paper className="p-3" style={{height: "100%"}}>IC95%</Paper></Grid>
            </Grid>
            <Grid container direction="row" justifyContent="center" className="pb-1" alignItems="stretch">
              <Grid item xs={3} ><Paper className="p-3">Pendiente</Paper></Grid>
              <Divider orientation="vertical"/>
              <Grid item xs={2} ><Paper className="p-3" style={{height: "100%"}}>{dPendiente.toFixed(5)}</Paper></Grid>
              <Grid item xs={2} ><Paper className="p-3" style={{height: "100%"}}>{seSlope.toFixed(3)}</Paper></Grid>
              <Grid item xs={4} ><Paper className="p-3" style={{height: "100%"}}>{ciSlope[0].toFixed(5) + " a " + ciSlope[1].toFixed(5)}</Paper></Grid>
            </Grid>
            <Grid container direction="row" justifyContent="center" className="pb-1" alignItems="stretch">
              <Grid item xs={3} ><Paper className="p-3">Intercepto</Paper></Grid>
              <Divider orientation="vertical"/>
              <Grid item xs={2} ><Paper className="p-3" style={{height: "100%"}}>{dIntercepto.toFixed(2)}</Paper></Grid>
              <Grid item xs={2} ><Paper className="p-3" style={{height: "100%"}}>{seIntercept.toFixed(3)}</Paper></Grid>
              <Grid item xs={4} ><Paper className="p-3" style={{height: "100%"}}>{ciIntercept[0].toFixed(2) + " a " + ciIntercept[1].toFixed(2)}</Paper></Grid>
            </Grid>
          </Grid>
      </Fragment>
    );
};

export default Conclusion;