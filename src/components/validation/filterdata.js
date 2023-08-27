//Function
//To filter out the Orignal raw data and store only necessary parameters
//Returns an Array of Objects And reach object represents a repo owned by user
//with several values
function filterdata(data) {
  let res = [];

  for(let i=0;i<data.length;i++){
    if(data[i].fork==false) {
      //console.log("Yes");
      let obj = {};
      obj.name = data[i].name;
      obj.langurl = data[i].languages_url;
      //obj.commiturl = data[i].commits_url;
      obj.size = data[i].size;
      obj.fork = data[i].forks_count;
      obj.stars = data[i].stargazers_count;
      obj.watch = data[i].watchers_count;

      //console.log(obj);
      res.push(obj);
    }
  }
  return res;
}

export default filterdata;
