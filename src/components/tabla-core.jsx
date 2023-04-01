import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ReactDataGrid from "react-data-grid";
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Button from "@material-ui/core/Button"
import {useLocalStorage} from "./localstorage"
import Grafico from "./grafico"
import GraficoIndice from "./graficoindice"
import Slider from '@material-ui/core/Slider';
import IndiceError from "./indiceerror"
import Chip from '@material-ui/core/Chip';
import AppBar from '@material-ui/core/AppBar';
import Informacion from './informacion'
import Conclusion from './conclusion'
import Pdf2 from './pdf2'
import Logo from './logo.png'
import Instrucciones from './instrucciones'

const columns = [
    { key: "muestra", name: "", editable: false, frozen: true, width: 35 },
    { key: "equipoX", name: "Equipo X", editable: true },
    { key: "equipoY", name: "Equipo Y", editable: true },
];

//Crea las filas con los datos de muestra, equipox y equipo Y por ahora son 20
const rows = Array.from(Array(20), (_, i) => ({ muestra: i + 1, equipoX: "", equipoY: "" }));

const Contenido = () => {
    const [eta, setEta] = useLocalStorage('eta', 50) // valor de error total permitido
    const [filas, setFilas] = useLocalStorage('datos', rows) // valores de las celdas, 'eta' y 'datos' son los nombres en el localstorage, no hacen nada en el codigo
    const [equipo1, setEquipo1] = useLocalStorage('equipo1', "")
    const [equipo2, setEquipo2] = useLocalStorage('equipo2', "")
    const [analito, setAnalito] = useLocalStorage('analito', "")
    const [umedida, setUmedida] = useLocalStorage('umedida', "")

    const data = filas.map(fila => ({ x: parseInt(fila.equipoX), y: parseInt(fila.equipoY) })); //aca paso los datos desde el grid tittle es X y complete es Y
      
    const indices = data.reduce((acc, datum, i) => { //genero los indices
        acc[`i${i+1}`] = parseFloat(((datum.y - datum.x)/((eta / 100) * datum.x)).toFixed(2));
        return acc;
    }, {});
  
    const indicesN = Object.values(indices);
  
    const errores = indicesN.filter(n => n > 1 || n < -1);
  
    const conclusion = err => err.length >= 2 ? "No" : "Si";

    const onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
        setFilas(() => {
          const rows = filas.slice();
          for (let i = fromRow; i <= toRow; i++) {
            rows[i] = { ...rows[i], ...updated };
          }
          return rows;
        });
    };

    const addRow = () => {
        // Create a new row object with the data for the new row
        const newRow = { muestra: filas.length + 1, equipoX: "", equipoY: "" };
      
        // Add the new row to the filas array
        setFilas((filas) => {
          return [...filas, newRow];
        });
    };
      
    const deleteRow = () => {
        // Check if the filas array has more than 21 elements
        if (filas.length > 20) {
          // Remove the last element from the filas array
          setFilas((filas) => {
            return filas.slice(0, filas.length - 1);
          });
        }
    };

    const resetState = () => {
      if (window.confirm("¿Estás seguro de querer borrar los datos?")){
      setFilas(rows)
    }};

    const handleEquipo1 = (e) =>{
        setEquipo1(e.target.value)
    }

    const handleEquipo2 = (e) =>{
        setEquipo2(e.target.value)
    }

    const handleAnalito = (e) =>{
        setAnalito(e.target.value)
    }

    const handleUmedida = (e) =>{
        setUmedida(e.target.value)
    }

    const handleEta = (e, v) => {
        setEta(v)
    }

    const onRowsRendered = ({ stopIndex }) => {
        // Scroll the grid to the last rendered row
        ReactDataGrid.scrollToRow(stopIndex);
    };

    return (
            <Grid   
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="stretch"
                spacing={2}
            >
                <Grid item xs={12}>
                    <AppBar 
                    
                        position="static"
                        className="p-3 rounded-top"
                    >
                        <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                            <Grid item md={1} xs={2} ><img className="ml-2" width="60%" src={Logo} alt="Logo Comparación de Instrumentos" /></Grid>
                            <Grid item md={9} xs={10}><h4><b>Comparación de instrumentos</b></h4></Grid>
                            <Grid item md={2} xs={12}><Instrucciones/></Grid>
                        </Grid>
                    </AppBar>
                </Grid>
                <Grid item md={4} xs={12}>
                    <Paper className="p-4">
                        <div>
                            <Informacion info={[equipo1, equipo2, analito, umedida]} 
                            handleAnalito={handleAnalito} handleUmedida={handleUmedida} handleEquipo1={handleEquipo1}
                            handleEquipo2={handleEquipo2}/>
                            <div className="card breadcrumb mt-4"><h6 className="text-center">Error Total Permitido:</h6>
                                <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
                                    <Grid item md={9} xs={9}>
                                        <Slider
                                            className="mt-2"
                                            defaultValue={eta}
                                            aria-labelledby="discrete-slider"
                                            valueLabelDisplay="auto"
                                            step={1}
                                            min={0}
                                            max={100}
                                            color="primary"
                                            onChangeCommitted={handleEta} // aca le paso el valor del Eta al state
                                        />
                                    </Grid>
                                    <Grid item md={3} xs={3}>
                                        <Chip className="chipETA" label={eta + "%"} color="primary"/>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </Paper>
                </Grid>
                <Grid item md={3} xs={12}>
                <Paper className="p-4">
                        <h5 style={{textAlign: "center"}}>Ingreso de Resultados</h5>
                        <hr/>
                        <div>
                            <ReactDataGrid
                            columns={columns}
                            rowGetter={i => filas[i]}
                            rowsCount={filas.length}
                            onGridRowsUpdated={onGridRowsUpdated}
                            onRowsRendered={onRowsRendered}
                            enableCellSelect={true}
                            rowSelection={false}
                            enableRowSelect={null}
                            minHeight={304}
                            />

                            <ButtonGroup
                            variant="contained"
                            color="primary"
                            fullWidth={true}
                            className="mt-2"
                            >
                                <Button onClick={resetState}>Borrar data</Button>
                                <Button onClick={addRow}>Añadir fila</Button>
                                <Button onClick={deleteRow}>Borrar fila</Button>
                            </ButtonGroup>
                        </div>
                    </Paper>
                </Grid>
                <Grid item md={5} xs={12}>
                    <Paper className="p-4">
                        <Grafico data={data} errortotal={eta} info={[equipo1, equipo2, analito, umedida]}/>
                    </Paper>
                </Grid>
                <Grid item md={3} xs={12}>
                    <IndiceError indices={indicesN} />
                </Grid>  
                <Grid item md={4} xs={12}>
                    <Paper className="p-4">
                        <Conclusion errores={errores} conclusion={conclusion} indices={indicesN} data={data}/>
                    </Paper>
                </Grid>  
                <Grid item md={5} xs={12}>
                    <Paper className="p-4">
                        <GraficoIndice data={filas} indices={indicesN} info={[equipo1, equipo2, analito, umedida]} />
                    </Paper>
                </Grid>
                <Pdf2 errores={errores} conclusion={conclusion} data={data} errortotal={eta} info={[equipo1, equipo2, analito, umedida,]} indices={indicesN} />
            </Grid>
         );
    }

export default Contenido;