import React, {Fragment, useState} from "react";
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

const Informacion = props => {
    const infor = props.info;
    const handleEquipo1 = props.handleEquipo1;
    const handleEquipo2 = props.handleEquipo2;
    const handleAnalito = props.handleAnalito;
    const handleUmedida = props.handleUmedida;
    
    const [equipo1, setEquipo1] = useState(infor[0]);
    const [equipo2, setEquipo2] = useState(infor[1]);
    const [analito, setAnalito] = useState(infor[2]);
    const [umedida, setUmedida] = useState(infor[3]);

    const hEquipo1 = (e) => {
      setEquipo1(e.target.value)
    }
    
    const hEquipo2 = (e) => {
      setEquipo2(e.target.value)
    }

    const hAnalito = (e) => {
      setAnalito(e.target.value)
    }

    const hUmedida = (e) => {
      setUmedida(e.target.value)
    }

    return (
      <Fragment>
        <h5 style={{textAlign:"center"}}>Información del Estudio</h5>
        <hr/>
        <Grid container spacing={1} style={{textAlign: "center"}}>
            <Grid container justifyContent="center" className="pb-1" alignItems="stretch">
              <Grid item xs={6} ><Paper className="p-3" >Equipo X</Paper></Grid>
              <Divider orientation="vertical"/>
              <Grid item xs={5} ><Paper className="inputFocus"><InputBase fullWidth={true} onChange={hEquipo1} onBlur={handleEquipo1} value={equipo1}/></Paper></Grid>
            </Grid>
            <Grid container justifyContent="center" className="pb-1">
              <Grid item xs={6} ><Paper className="p-3">Equipo Y</Paper></Grid>
              <Divider orientation="vertical"/>
              <Grid item xs={5} ><Paper><InputBase fullWidth={true} onChange={hEquipo2} onBlur={handleEquipo2} value={equipo2}/></Paper></Grid>
            </Grid>
            <Grid container justifyContent="center" className="pb-1">
              <Grid item xs={6} ><Paper className="p-3">Analito</Paper></Grid>
              <Divider orientation="vertical"/>
              <Grid item xs={5} ><Paper><InputBase fullWidth={true} onChange={hAnalito} onBlur={handleAnalito} value={analito}/></Paper></Grid>
            </Grid>
            <Grid container justifyContent="center" className="pb-1">
              <Grid item xs={6} ><Paper className="p-3">Unidad de Medida</Paper></Grid>
              <Divider orientation="vertical"/>
              <Grid item xs={5} ><Paper><InputBase fullWidth={true} onChange={hUmedida} onBlur={handleUmedida} value={umedida}/></Paper></Grid>
            </Grid>
          </Grid>
      </Fragment>
    );
};

export default Informacion;
