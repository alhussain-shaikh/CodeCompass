import "./styles.css"

function finalizedata(finaldata){
  //console.log(finaldata.date.substring(10,8));
  let result_string = 'On ' + finaldata.date.substring(0,10) + ' at ' + finaldata.date.substring(11,19) + ' Hrs' ;
  result_string += " : This User made a ";
  let type = finaldata.type;
  type = type.replace('Event','') + ' Action';
  result_string += type;
  result_string += ' to Repo @ : ' + 'github.com/' + finaldata.repo_name;
  //console.log(result_string);
  return result_string;
}

function ProfileActions(data) {

  return data.data.map((val,index) => {
      if(index%2==0) return (
        <h4 className="rec even" key={val.date}>
        <img src="https://img.icons8.com/ios-filled/50/ffffff/clock--v1.png"/>
        {finalizedata(val)}
        </h4>);
      else return (
        <h4 className="rec odd" key={val.date}>
        <img src="https://img.icons8.com/ios-filled/50/000000/clock--v1.png"/>
        {finalizedata(val)}
        </h4>);
  });

}

export default ProfileActions;
