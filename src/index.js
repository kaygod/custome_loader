const { add } =  require("./other.js");

async function start(){
  console.log("Hello world");
  const total = await add(1,1);
  console.log("end world:"+total);
}

start();
