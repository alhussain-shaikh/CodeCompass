import ProfileActions from "./charts/profileaction.js";
import "./recentaction.css";

function RecentAction(eventdata){
  //console.log(eventdata.eventdata);
  if(eventdata.eventdata.length==0){
    return (
      <div className="action-section">
        <div className="action-info-title">
          <h2>Recent Actions</h2>
        </div>
        <h4 className="erraction">This User has not performed any Recent Actions</h4>;
      </div>
    );
  }
  return (
    <div className="action-section">
      <div className="action-info-title">
        <h2>Recent Actions</h2>
      </div>
      <div className="text-area">
        <ProfileActions data={eventdata.eventdata}/>
      </div>
    </div>
  );
}

export default RecentAction;
