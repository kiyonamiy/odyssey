const button1 = document.getElementById("button1");
const button2 = document.getElementById("button2");

const promise = Promise.resolve();

button1.onClick = function() {
  promise = promise.then(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("button1");
        resolve();
      }, 3000);
    });
  });
};
