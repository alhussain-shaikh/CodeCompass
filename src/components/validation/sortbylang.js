function sortbylang(resdata){
  let result = [];
  let dict = {};
  for(let i=0;i<resdata.length;i++){
    let arr = [];
    //console.log("hello");
    //console.log(resdata[i].forks);
    let obj = resdata[i];
    for(const key in obj){
      //console.log(obj[key]);
      if(key in dict){
        dict[key] += parseInt(obj[key]);
      }
      else{
        dict[key] = parseInt(obj[key]);
      }
    }
    //console.log(resdata[i][1]);
  }

  //console.log(dict);
  for(const key in dict){
    let arr = [];
    arr.push(dict[key]);
    arr.push(key);
    result.push(arr);
  }
  result.sort((a,b) => {
    return a[0]-b[0];
  });

  let res = [];
  for(let i=result.length - 1;i>=Math.max(result.length-15,0);i--){
    res.push(result[i]);
  }
  //console.log(res);
  return res;
}

export default sortbylang;
