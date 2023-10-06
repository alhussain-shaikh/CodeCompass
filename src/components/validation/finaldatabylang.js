//Function to return final data to be fed into doughnut plot by lang
//FMust feed the output of sortbysize function

import {colorpallete3} from "./colors.js";

function finaldatabylang(data) {
  const label = [];
  const dataset = [];
  const object = {};
  const sizes = [];

  for(let i=0;i<data.length;i++){
    label.push(data[i][1]);
    sizes.push(data[i][0]);
  }

  object.label = 'Top Repos By Lang';
  object.data = sizes;
  object.borderColor = ['rgba(255,206,86,0.2)'];
  object.backgroundColor = colorpallete3;
  object.pointBackgroundColor = 'rgba(255,206,86,0.2)';

  dataset.push(object);

  return {
    id: "Top Languages",
    labels: label.map(val => {return val;}),
    datasets: dataset
  }
}

export default finaldatabylang;
