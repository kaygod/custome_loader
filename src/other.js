async function add(a,b){
  const total =  await execuate(a,b);
  return total;
}

function execuate(a,b){
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(a+b);
    },0)
  })
}

exports.add = add;