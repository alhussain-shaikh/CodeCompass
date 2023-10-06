import { Pie } from 'react-chartjs-2';
import { colorpallete } from "../../validation/colors.js";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { StyleOptions } from "./options.js"
import "./styles.css"
ChartJS.register(ArcElement, Tooltip, Legend);


function PiePlot(data){
  //console.log(StyleOptions);
  return (
    <div>
    <h4 className="title-text">{data.data.id}</h4>
    <Pie data={data.data} options={StyleOptions}/>
    </div>
  );
}

export default PiePlot;
