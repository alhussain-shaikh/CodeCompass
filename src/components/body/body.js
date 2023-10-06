//Import Statements
import React, {useState, useEffect} from 'react';
import "./body-style.css";
import axios from 'axios'
import Profile from "../profile/profile.js";
import validateusername from "../validation/validateusername.js";
import ProfileStatistics from "../profile/statistics.js";
import filterdata from "../validation/filterdata.js";
import apilimit from "../validation/apilimit.js";
import actiondata from "../validation/recentaction.js";
import RecentAction from "../profile/recentaction.js";
import Recommendation from '../profile/recommendation.js';
//Function & StateHooks Defintions

function Body() {
    const [username,setusername] = useState("");
    let [data,setData]= useState(null);
    let [prof,setProf] = useState(
      <div className="Initial"><h2>Please Enter a Valid Github Username to Continue</h2></div>
    );
    let [profstat,setProfstat] = useState(
      <div><h2></h2></div>
    );
    let [profaction,setProfaction] = useState(
      <div><h2></h2></div>
    );
    let [proRecommed,setRecommed] = useState(
      <div><h2></h2></div>
    );

    const namechange = (e) => {
      setusername(e.target.value);
    }
    const SubmitUsername = async (e) => {
      //Prevents from Page reloading on clicking the search button
      e.preventDefault();

      //console.log(process.env.REACT_APP_CREDENTIALS);
      let credentials = btoa(process.env.REACT_APP_CREDENTIALS);
      let auth = {"Authorization" : `basic ${credentials}`};


      let user_name = validateusername(username);
      let [profile,stat] = await Promise.all([fetch(user_name, {headers : auth}),fetch(user_name +'/repos',{headers : auth})]);
      let profileJson = await profile.json();
      let statJson = await stat.json();

      if(profileJson.message === "Not Found") {
        let errmsg = "Invalid Username !!";
        setProf(<div className="ErrState">
          <h2>Invalid Username !</h2>
          <h2>Please Enter a Valid Github Username to Continue</h2>
        </div>);
        setProfstat(<div></div>);
        setProfaction(<div></div>);
        return;
      }

      let eventdata = await axios.get(user_name + "/events", {headers : auth}).then(
        (data) => {return data;},
      );
      let event_data = eventdata.data;
      //console.log(eventdata[0]);
      let final_eventdata = actiondata(event_data);
      //console.log(final_eventdata);

      let pre_data = apilimit(filterdata(statJson));
      //console.log(pre_data);
      let endpoints = pre_data.map((e) => {
        return e[1];
      });
      //console.log(endpoints);
      var languages = [];

      let axdata = await axios.all(endpoints.map((endpoint) => axios.get(endpoint,{headers : auth}))).then(
        (data) => {
          return data;},
      );

      for(let i=0;i<axdata.length;i++){
        languages.push(axdata[i].data);
      }

      let statsJson = {
        stat : statJson,
        langdata : languages
      };

      if(profileJson){
        //console.log(profileJson);
        setData(profileJson);
        if(profileJson.message === "Not Found") {
          let errmsg = "Invalid Username !!";
          setProf(<div className="ErrState">
            <h2>Invalid Username !</h2>
            <h2>Please Enter a Valid Github Username to Continue</h2>
          </div>);
          setProfstat(<div></div>);
          setProfaction(<div></div>);
        }
        else {
          setProf(<Profile data={profileJson}/>);
          setProfstat(<ProfileStatistics statdata={statsJson}/>)
          setProfaction(<RecentAction eventdata={final_eventdata}/>);
          setRecommed(<Recommendation statdata={statsJson}/>);
        }
      }
    }

  return (
    <div>
      <div className="parent-div" id='analysis'>
        <h2 id="su-title">Search Github User</h2>
        <form>
        <input id="su-input" placeholder="Enter Github Username" type="text" value={username} onChange={namechange}></input>
        <button className="search" onClick={SubmitUsername}>Search
        </button>
        </form>
      </div>
      {prof}
      {profstat}
      {profaction}
      {proRecommed}
    </div>
  );
}

export default Body;
