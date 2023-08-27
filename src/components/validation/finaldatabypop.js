//Function to return final data to be fed into doughnut plot by size
//FMust feed the output of sortbysize function

import {colorpallete2} from "./colors.js";

function finaldatabypop(data) {
  const label = [];
  const dataset = [];
  const object = {};
  const sizes = [];

  for(let i=0;i<data.length;i++){
    label.push(data[i][1]);
    sizes.push(data[i][0]);
  }

  object.label = 'Top Repos By Popularity';
  object.data = sizes;
  object.borderColor = ['rgba(255,206,86,0.2)'];
  object.backgroundColor = colorpallete2;
  object.pointBackgroundColor = 'rgba(255,206,86,0.2)';

  dataset.push(object);

  return {
    id: "Most Popular Repositories",
    labels: label.map(val => {return val;}),
    datasets: dataset
  }
}

export default finaldatabypop;
