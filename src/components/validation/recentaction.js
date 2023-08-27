function actiondata(data) {
  //console.log(data);
  let result = [];
  for(let i=0;i<Math.min(10,data.length);i++){
    let obj = {};
    if(data[i].actor.login!=data[i].repo.name.substring(0,data[i].actor.login.length)){
      continue;
    }
    obj.type = data[i].type;
    obj.repo_name = data[i].repo.name;
    obj.repo_url = data[i].repo.url;
    obj.date = data[i].created_at;
    result.push(obj);
  }
  return result;
}

export default actiondata;
