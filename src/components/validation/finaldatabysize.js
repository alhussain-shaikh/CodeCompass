//Function to return final data to be fed into doughnut plot by size
//FMust feed the output of sortbysize function

import {colorpallete} from "./colors.js";

function finaldatabysize(data) {
  const label = [];
  const dataset = [];
  const object = {};
  const sizes = [];

  for(let i=0;i<data.length;i++){
    label.push(data[i][1]);
    sizes.push(data[i][0]);
  }

  object.label = 'Top Repos By Size';
  object.data = sizes;
  object.borderColor = ['rgba(255,206,86,0.2)'];
  object.backgroundColor = colorpallete;
  object.pointBackgroundColor = 'rgba(255,206,86,0.2)';

  dataset.push(object);

  return {
    id: "Top Repositories By Size",
    labels: label.map(val => {return val;}),
    datasets: dataset
  }
}

export default finaldatabysize;
