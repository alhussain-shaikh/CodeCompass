import { Doughnut } from 'react-chartjs-2';
import { colorpallete } from "../../validation/colors.js";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { StyleOptions, plugin } from "./options.js"
import "./styles.css"
ChartJS.register(ArcElement, Tooltip, Legend, Title);



function DoughnutPlot(data){
  //console.log(data.data.id);
  return (
    <div>
      <h4 className="title-text">{data.data.id}</h4>
      <Doughnut data={data.data} options={StyleOptions} plugins={plugin}/>
    </div>
  );
}

export default DoughnutPlot;
