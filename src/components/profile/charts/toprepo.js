import DoughnutPlot from "./doughnutplot.js";
import PiePlot from "./pieplot.js"
import "./styles.css"
import React, {useState, useEffect} from 'react';
import sortbysize from "../../validation/sortbysize.js";
import finaldatabysize from "../../validation/finaldatabysize.js";
import sortbypop from "../../validation/sortbypop.js";
import finaldatabypop from "../../validation/finaldatabypop.js";
import sortbylang from "../../validation/sortbylang.js";
import finaldatabylang from "../../validation/finaldatabylang.js";

function Toprepo(data) {

  if(data.data.langdata.length==0 || data.data.statdata.length==0){
    return (
      <h4 className="errrepo">This User does not have any Personal Repositories</h4>
    );
  }
  let finaldata_size = finaldatabysize(sortbysize(data.data.statdata));
  //console.log(data.data.langdata[0]);

  let finaldata_pop = finaldatabypop(sortbypop(data.data.statdata));
  //console.log(finaldata_pop);

  let finaldata_lang = finaldatabylang(sortbylang(data.data.langdata));
  //console.log(sortbylang(data.data.langdata));

  if(data.data.length==0){
    return <h2 className="errrepo">This user has no Public Repositories</h2>;
  }
  return (
    <div>
    <div className="plot">
      <DoughnutPlot data={finaldata_size} />
    </div>
    <div className="plot">
      <PiePlot data={finaldata_pop}/>
    </div>
    <div className="plot">
      <DoughnutPlot data={finaldata_lang} />
    </div>
    </div>
  );
}

export default Toprepo;
