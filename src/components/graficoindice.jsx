import React, {Fragment} from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Label
} from "recharts";

const GraficoIndice = props => {
    const data = props.data;
    const indices = props.indices;
    const info = props.info;

    const dataGrafico = data.map((item, index) => ({
      x: parseInt(item.equipoX),
      y: indices[index]
    }));

  return (
    <Fragment>
      <h5 style={{textAlign: "center"}}>Diagrama de Bland-Altman</h5>
      <hr/>
      <ResponsiveContainer width="100%" height={305}>
          <ScatterChart margin={{ top: 1, right: -5, bottom: 15, left: 1 }}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis type="number" dataKey="x" name={info[0]} unit="" >
              <Label value={info[0] + " (" + info[3] + ")"} offset={-10} position="insideBottom" />
            </XAxis>
            <YAxis type="number" dataKey="y" name="Indice de Error" unit="" ticks={[-1, 0, 1]} >
              <Label value="Indice de Error" offset={25} position="insideBottomLeft" angle={-90} />
            </YAxis>
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter name="A school" data={dataGrafico} fill="#8884d8" />
            <ReferenceLine y={1} stroke="blue" strokeWidth={2} alwaysShow={true}/>
            <ReferenceLine y={0} stroke="blue" strokeWidth={0.5} alwaysShow={true}/>
            <ReferenceLine y={-1} stroke="blue" strokeWidth={2} alwaysShow={true}/>
          </ScatterChart>
      </ResponsiveContainer>
    </Fragment>
  );
};

export default GraficoIndice;
