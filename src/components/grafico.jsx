import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label
} from "recharts";

const Grafico = (props) => {
  const data = props.data;
  const eta = props.errortotal;
  const info = props.info;
  
  // create arrays for the x and y values
  var dataX = [], dataY = [];
  for (let i = 0; i < data.length; i++) {
    dataX.push(data[i].x);
    dataY.push(data[i].y);
  }

  // handle NaN values in the dataX array
  for (let i = 0; i < dataX.length; i++) {
    if (isNaN(dataX[i])) {
      dataX[i] = 0;
    }
  }

  // calculate the max value for the x and y arrays
  var valorMax = Math.max(...dataX);
  var valorMaxY = Math.max(...dataY);

  // calculate the maxUp and maxDown values
  var maxUp = valorMax + (valorMax * (eta / 100));
  var maxDown = valorMax - (valorMax * (eta / 100));

  // calculate the pendienteUp value
  const pendienteUp = 1 + (1 * (eta / 100));

  // create the central array
  const central = [{x: 0, y: 0}, {x: valorMax, y: valorMax}];

  // create the lineaUp array
  var lineaUp = [];
  if (valorMaxY > valorMax) {
    lineaUp.push({x: 0, y: 0}, {x: valorMax, y: maxUp});
  } else {
    lineaUp.push({x: 0, y: 0}, {x: (valorMax / pendienteUp), y: valorMax});
  }

  // create the lineaDown array
  const lineaDown = [{x: 0, y: 0}, {x: valorMax, y: maxDown}];

  return (
      <div>
        <h5 style={{textAlign: "center"}}>Diagrama de Dispersión</h5>
        <hr/>
        <ResponsiveContainer id="grafico-dispersion" width="100%" height={348} debounce={1}>
            <ScatterChart margin={{ top: 15, right: 5, bottom: 15, left: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name={info[0]} unit="" domain={[0, 'dataMax'] } >
                  <Label value={info[0] + " (" + info[3] + ")"} offset={-10} position="insideBottom" />
                </XAxis>
                <YAxis type="number" dataKey="y" name={info[1]} unit="" domain={[0, 'dataMax - 100']}>
                  <Label value={info[1] + " (" + info[3] + ")"} offset={5} position="insideLeft" angle={-90} />
                </YAxis>
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Valores" data={data} fill="#8884d8" />
                <Scatter name="Linea Central" data={central} fill="#8884d8" line={{stroke: 'blue', strokeWidth: 0.5}} />
                <Scatter name="Limite Superior" data={lineaUp} fill="#8884d8" line={{stroke: 'blue', strokeWidth: 2, isAnimationActive: 'true'}} />
                <Scatter name="Limite Inferior" data={lineaDown} fill="#8884d8" line={{stroke: 'blue', strokeWidth: 2}} />
            </ScatterChart>
        </ResponsiveContainer>
      </div>
  );
};

export default Grafico;

