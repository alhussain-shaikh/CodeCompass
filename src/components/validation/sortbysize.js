//Data by name of repo and its size
//returns a 2d array with first element as size of repo and second no of repo
function sortbysize(resdata){
  let result = [];
  for(let i=0;i<resdata.length;i++){
    let arr = [];
    arr.push(resdata[i].size);
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

export default sortbysize; 
