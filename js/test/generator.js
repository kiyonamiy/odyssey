var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}

var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
    console.log(data.bio);
  g.next(data);
});

console.log("hehe");

// fetch('https://api.github.com/users/github').then((data)=>{
//     return data.json();
// }).then((data)=>{
//     console.log(data.bio);
// })