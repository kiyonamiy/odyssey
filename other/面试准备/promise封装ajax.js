function getJSON(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(this.responseText, this);
        } else {
          reject({ status: this.status, response: this.response });
        }
      }
    };
    xhr.send();
  });
}

function postJSON(url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve(JSON.parse(this.responseText));
        } else {
          reject({ status: this.status, response: this.response });
        }
      }
    };
    xhr.send(JSON.stringify(data));
  });
}

postJSON("/test/post", { name: "yqb" })
  .then(value => {
    console.log(value);
  })
  .catch(err => {
    console.log(err);
  });
