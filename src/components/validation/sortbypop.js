//Data by name of repo and its popularity i.e stars count + forks + watch
//returns a 2d array with first element as size of repo and second no of repo
function sortbypop(resdata){
  let result = [];
  for(let i=0;i<resdata.length;i++){
    let arr = [];
    //console.log(resdata[i].forks);
    let popular_score = parseInt(resdata[i].fork) + parseInt(resdata[i].stars) + parseInt(resdata[i].watch);
    arr.push((1 + popular_score));
    arr.push(resdata[i].name);
    result.push(arr);
  }
  result.sort((a,b) => {
    return a[0]-b[0];
  });

  let res = [];
  for(let i=result.length - 1;i>=Math.max(result.length-10,0);i--){
    res.push(result[i]);
  }
  return res;
}

export default sortbypop;
