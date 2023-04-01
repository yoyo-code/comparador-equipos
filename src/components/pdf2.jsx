import React, {Fragment, useRef} from "react";
import ReactToPrint from 'react-to-print';
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

class ComponentToPrint extends React.Component {
    render() {
      const data = this.props.data;
      const info = this.props.info;
      const eta = this.props.errortotal;
      const indices = this.props.indices;
      const conclusion = this.props.conclusion;
      const errores = this.props.errores;
      const data2 = data.map((datum, i) => ({ x: datum.x, y: indices[i] }));

      var dataX = []
      for (let i=0; i < 20; i++) { dataX.push(data[i].x) }
      for (let i=0; i < 20; i++) { if (isNaN(dataX[i])) dataX[i] = 0; }
      var valorMax = Math.max(...dataX)
      var maxUp = valorMax + (valorMax * (eta/100))
      var maxDown = valorMax - (valorMax * (eta/100))
      const pendienteUp = 1 + (1*(eta/100))
    
      var dataY = []
      for (let i=0; i < 20; i++) { dataY.push(data[i].y) }
      var valorMaxY = Math.max(...dataY)
    
      const central = [{x: 0, y: 0}, {x: valorMax, y: valorMax }]
    
      var lineaUp = []
      if (valorMaxY > valorMax) {
        lineaUp.push({x: 0, y: 0}, {x: valorMax, y: maxUp})
      } else {
        lineaUp.push({x: 0, y: 0}, {x: (valorMax / pendienteUp), y: valorMax})
      }
    
      const lineaDown = [{x: 0, y: 0}, {x: valorMax, y: maxDown}]

      const infografico = {
        type:'scatter',
        data:{
            datasets:[
              {
                label:'Puntos',
                showLine: false,
                fill: false,
                pointBackgroundColor: 'rgba(0, 0, 61, 0.8)',
                pointRadius: 2,
                data: data
               },
              {
               label:'Linea Up',
               showLine: true,
               fill: false,
               pointRadius: 0,
               data: lineaUp
              },
              {
               label:'Central',
               showLine: true,
               fill: '-1',
               backgroundColor: 'rgba(255, 227, 255, 0.5)',
               pointRadius: 0,
               data: central
              },
              {
               label:'Linea Down',
               showLine: true,
               fill: '-1',
               backgroundColor: 'rgba(255, 227, 255, 0.5)',
               pointRadius: 0,
               data:lineaDown
              }
            ]
        },
        options: {
          title: {
            display: true,
            text: 'Diagrama de Dispersión',
            fontColor: 'gray',
            fontSize: 15,
            fontStyle: 'normal'
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [{
              ticks: {
                max: valorMaxY
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                },
              scaleLabel: {
                display: true,
                labelString: info[1] + " " + info[3]
                  }
            }],
            xAxes: [{
              ticks: {
                max: valorMax
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                },
              scaleLabel: {
                display: true,
                labelString: info[0] + " " + info[3]
                }
            }]
          },
         }
      }

      const infografico2 = {
        type:'scatter',
        data:{
            datasets:[
              {
                label:'Puntos',
                showLine: false,
                fill: false,
                pointBackgroundColor: 'rgba(0, 0, 61, 0.8)',
                pointRadius: 2,
                data: data2
               },
              {
               label:'Linea Up',
               showLine: true,
               fill: false,
               pointRadius: 0,
               data: [{x:0,y:1},{x:valorMax,y:1}]
              },
              {
               label:'Central',
               showLine: true,
               fill: '-1',
               backgroundColor: 'rgba(255, 227, 255, 0.5)',
               pointRadius: 0,
               data: [{x:0,y:0},{x:valorMax,y:0}]
              },
              {
               label:'Linea Down',
               showLine: true,
               fill: '-1',
               backgroundColor: 'rgba(255, 227, 255, 0.5)',
               pointRadius: 0,
               data:[{x:0,y:-1},{x:valorMax,y:-1}]
              }
            ]
        },
        options: {
          title: {
            display: true,
            text: 'Diagrama de Bland-Altman',
            fontColor: 'gray',
            fontSize: 15,
            fontStyle: 'normal'
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [{
              ticks: {
                max: 2,
                min: -2,
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                },
              scaleLabel: {
                display: true,
                labelString: "Indice de Error"
                  }
            }],
            xAxes: [{
              ticks: {
                max: valorMax
              },
              gridLines: {
                color: "rgba(0, 0, 0, 0)",
                },
              scaleLabel: {
                display: true,
                labelString: info[0] + " " + info[3]
                }
            }]
          },
         }
      }

      return (
        <div className="mr-4 ml-4 mb-4">
          {/* Titulo */}
          <Grid  container direction="row" justifyContent="space-around" alignItems="flex-start" spacing={2}>
            <Grid item xs={12}>
              <hr/>
              <h2 className="text-center">Comparación de Instrumentos</h2>
              <hr/>
            </Grid>
            {/* Gráficos */}
            <Grid item xs={6}>
              <Grid item xs={6}>
                <img alt="grafico" src={"https://quickchart.io/chart?width=280&height=200&c=" + JSON.stringify(infografico)}/>
              </Grid>
            </Grid>
            <Grid item  xs={6}>
              <Grid item >
                <img alt="grafico" src={"https://quickchart.io/chart?width=280&height=200&c=" + JSON.stringify(infografico2)}/>
              </Grid>
            </Grid>
          </Grid>
          {/* Texto */}
          <Grid container direction="row" justifyContent="space-around" alignItems="flex-start" spacing={2}>
            <Grid item xs={12} >
              <hr/>
              <h2 className="text-center">Evaluación de Resultados</h2>
              <hr/>
            </Grid>
            <Grid item xs={12} >
              <p style={{fontSize: "25px", textAlign: "justify"}}>El analito {info[2]} fue analizado utilizando los   
                instrumentos {info[0]} y {info[1]} para determinar si los resultados de estos son equivalentes con un Error Total Permitido de {eta}%.
                Para realizar esto se compararon 20 muestras distintas con un rango de {Math.min(...dataX)} a {Math.max(...dataX)} {info[3]}. Con esto se concluye que los resultados de los 
                instrumentos <b>{conclusion(errores).toUpperCase()}</b> son equivalentes. El Índice de Error promedio fue de {(indices.reduce((a,b) => a + b, 0) / indices.length).toFixed(2)}, con un rango de {Math.min(...indices)} a {Math.max(...indices)}.</p>
            </Grid>
            <Grid item xs={12} >
              <hr/>
              <h2 className="text-center">Tabla de Resultados</h2>
            </Grid>
            <Grid item xs={6} >
              <table className="table" style={{fontSize: "25px", textAlign: "center"}}>
                <thead>
                  <tr>
                    <th scope="col">Muestra</th>
                    <th scope="col">{info[0]}</th>
                    <th scope="col">{info[1]}</th>
                    <th scope="col">IndErr</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>{dataX[0]}</td>
                    <td>{dataY[0]}</td>
                    <td>{indices[0]}</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>{dataX[1]}</td>
                    <td>{dataY[1]}</td>
                    <td>{indices[1]}</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>{dataX[2]}</td>
                    <td>{dataY[2]}</td>
                    <td>{indices[2]}</td>
                  </tr>
                  <tr>
                    <th scope="row">4</th>
                    <td>{dataX[3]}</td>
                    <td>{dataY[3]}</td>
                    <td>{indices[3]}</td>
                  </tr>
                  <tr>
                    <th scope="row">5</th>
                    <td>{dataX[4]}</td>
                    <td>{dataY[4]}</td>
                    <td>{indices[4]}</td>
                  </tr>
                  <tr>
                    <th scope="row">6</th>
                    <td>{dataX[5]}</td>
                    <td>{dataY[5]}</td>
                    <td>{indices[5]}</td>
                  </tr>
                  <tr>
                    <th scope="row">7</th>
                    <td>{dataX[6]}</td>
                    <td>{dataY[6]}</td>
                    <td>{indices[6]}</td>
                  </tr>
                  <tr>
                    <th scope="row">8</th>
                    <td>{dataX[7]}</td>
                    <td>{dataY[7]}</td>
                    <td>{indices[7]}</td>
                  </tr>
                  <tr>
                    <th scope="row">9</th>
                    <td>{dataX[8]}</td>
                    <td>{dataY[8]}</td>
                    <td>{indices[8]}</td>
                  </tr>
                  <tr>
                    <th scope="row">10</th>
                    <td>{dataX[9]}</td>
                    <td>{dataY[9]}</td>
                    <td>{indices[9]}</td>
                  </tr>
                </tbody>
              </table>
            </Grid>
            <Grid item xs={6} >
              <table className="table" style={{fontSize: "25px", textAlign: "center"}}>
                <thead>
                  <tr>
                    <th scope="col">Muestra</th>
                    <th scope="col">{info[0]}</th>
                    <th scope="col">{info[1]}</th>
                    <th scope="col">IndErr</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">11</th>
                    <td>{dataX[10]}</td>
                    <td>{dataY[10]}</td>
                    <td>{indices[10]}</td>
                  </tr>
                  <tr>
                    <th scope="row">12</th>
                    <td>{dataX[11]}</td>
                    <td>{dataY[11]}</td>
                    <td>{indices[11]}</td>
                  </tr>
                  <tr>
                    <th scope="row">13</th>
                    <td>{dataX[12]}</td>
                    <td>{dataY[12]}</td>
                    <td>{indices[12]}</td>
                  </tr>
                  <tr>
                    <th scope="row">14</th>
                    <td>{dataX[13]}</td>
                    <td>{dataY[13]}</td>
                    <td>{indices[13]}</td>
                  </tr>
                  <tr>
                    <th scope="row">15</th>
                    <td>{dataX[14]}</td>
                    <td>{dataY[14]}</td>
                    <td>{indices[14]}</td>
                  </tr>
                  <tr>
                    <th scope="row">16</th>
                    <td>{dataX[15]}</td>
                    <td>{dataY[15]}</td>
                    <td>{indices[15]}</td>
                  </tr>
                  <tr>
                    <th scope="row">17</th>
                    <td>{dataX[16]}</td>
                    <td>{dataY[16]}</td>
                    <td>{indices[16]}</td>
                  </tr>
                  <tr>
                    <th scope="row">18</th>
                    <td>{dataX[17]}</td>
                    <td>{dataY[17]}</td>
                    <td>{indices[17]}</td>
                  </tr>
                  <tr>
                    <th scope="row">19</th>
                    <td>{dataX[18]}</td>
                    <td>{dataY[18]}</td>
                    <td>{indices[18]}</td>
                  </tr>
                  <tr>
                    <th scope="row">20</th>
                    <td>{dataX[19]}</td>
                    <td>{dataY[19]}</td>
                    <td>{indices[19]}</td>
                  </tr>
                </tbody>
              </table>
            </Grid>
          </Grid>
        </div>  
      );
    }
}

const Pdf2 = (props) => {
    const data = props.data;
    const info = props.info;
    const eta = props.errortotal;
    const indices = props.indices;
    const conclusion = props.conclusion;
    const errores = props.errores;
    const componentRef = useRef();


    return (
      <Fragment >
        <ReactToPrint
          trigger={() => <Button color="primary" variant="contained">Imprimir Informe</Button>}
          content={() => componentRef.current}
        />
        <div style={{display: 'none'}}>
            <ComponentToPrint errores={errores} conclusion={conclusion} indices={indices} data={data} errortotal={eta} info={info} ref={componentRef} />
        </div>
      </Fragment>
    );
};


export default Pdf2;