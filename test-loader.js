module.exports = function (content){
  //console.log(this.query); // { name: 'hello' }
  //return content;
  const callback = this.async();
  setTimeout(()=>{
     callback(null,content);  
  })
}