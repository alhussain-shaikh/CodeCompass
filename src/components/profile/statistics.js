//Imports
import "./statistics.css"
import Toprepo from "./charts/toprepo.js";
import filterdata from "../validation/filterdata.js"


function ProfileStatistics(statdata) {
  //console.log(statdata.statdata.langdata);
  let filtered_data = {
    langdata :statdata.statdata.langdata,
    statdata: filterdata(statdata.statdata.stat)
  }


  return (
    <div className="stats-section">
      <div className="stats-info-title">
        <h2>Profile Statistics</h2>
      </div>
      <Toprepo className="plot" data={filtered_data}/>
    </div>
  );
}

export default ProfileStatistics;
